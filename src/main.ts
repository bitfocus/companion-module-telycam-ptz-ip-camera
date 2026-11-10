import { InstanceBase, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions, type VariablesSchema } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions, type ActionsSchema } from './actions.js'
import { UpdateFeedbacks, type FeedbacksSchema } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import dgram from 'node:dgram'

export type ModuleSchema = {
	config: ModuleConfig
	secrets: undefined
	actions: ActionsSchema
	feedbacks: FeedbacksSchema
	variables: VariablesSchema
}

export { UpgradeScripts }

export default class ModuleInstance extends InstanceBase<ModuleSchema> {
	config!: ModuleConfig // Setup in init()
	private udpSocket: dgram.Socket | undefined
	private pollInterval: NodeJS.Timeout | undefined

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.log('info', 'Module initialized: v1.0.0')

		// Initialize connection and polling
		this.initUdp()
		this.startHttpPolling()

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updatePresets() // export Presets
		this.updateVariableDefinitions() // export variable definitions
	}

	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
		this.stopHttpPolling()
		this.closeUdp()
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config

		this.closeUdp()
		// Restart UDP Socket
		this.initUdp()

		// Restart HTTP Polling
		this.stopHttpPolling()
		this.startHttpPolling()
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	private initUdp(): void {
		if (!this.config.host) {
			this.updateStatus(InstanceStatus.BadConfig, 'Please enter IP address')
			return
		}

		try {
			this.udpSocket = dgram.createSocket('udp4')

			this.udpSocket.on('error', (err) => {
				this.log('error', `UDP Error: ${err.message}`)
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
			})

			this.udpSocket.on('message', (msg) => {
				this.handleViscaResponse(msg)
			})

			this.updateStatus(InstanceStatus.Ok)
		} catch (e: any) {
			this.log('error', `Could not create UDP Socket: ${e.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure, e.message)
		}
	}

	private closeUdp(): void {
		if (this.udpSocket) {
			try {
				this.udpSocket.close()
			} catch {
				this.log('debug', 'UDP close error (ignored)')
			}
			this.udpSocket = undefined
		}
	}

	/**
	 * Parse VISCA inquiry responses (e.g. CAM_AT_OnOff_Inq: 8x 09 04 C8 FF -> y0 50 0p FF)
	 */
	private handleViscaResponse(msg: Buffer): void {
		for (let i = 0; i <= msg.length - 4; i++) {
			const b0 = msg[i]
			const b1 = msg[i + 1]
			const b2 = msg[i + 2]
			const b3 = msg[i + 3]
			const isFrameStart = i === 0 || i === 8 || msg[i - 1] === 0xff

			if (
				isFrameStart &&
				(b0 & 0x8f) === 0x80 &&
				b0 !== 0x80 &&
				b1 === 0x50 &&
				(b2 === 0x00 || b2 === 0x01) &&
				b3 === 0xff
			) {
				const trackingState = b2 === 0x01 ? 'on' : 'off'
				this.setVariableValues({ auto_tracking: trackingState })
				this.checkFeedbacks('auto_tracking_feedback')
				this.log('debug', `[VISCA] Auto-tracking inquiry reply: ${trackingState}`)
			}
		}
	}

	/**
	 * Query Auto-Tracking On/Off state via VISCA (CAM_AT_OnOff_Inq: 81 09 04 C8 FF)
	 */
	public queryAutoTrackingStatus(): void {
		this.sendViscaCommand('810904C8FF', false)
	}

	/**
	 * Send VISCA hex commands
	 */
	public sendViscaCommand(hexString: string, logInfo = true): void {
		if (!this.udpSocket) {
			this.log('warn', 'UDP socket not initialized')
			return
		}

		const host = this.config.host
		const port = parseInt(this.config.viscaPort || '52381', 10)

		if (!host || isNaN(port)) {
			this.log('warn', 'Invalid IP address or port')
			return
		}

		const cleanHex = hexString.replace(/\s+/g, '') // Strip spaces and convert to Buffer byte stream
		if (cleanHex.length % 2 !== 0) {
			this.log('error', `Invalid hex command: ${cleanHex}`)
			return
		}

		const buffer = Buffer.from(cleanHex, 'hex')

		this.udpSocket.send(buffer, port, host, (err) => {
			if (err) {
				this.log('error', `Failed to send VISCA: ${err.message}`)
			} else if (logInfo) {
				this.log('info', `[VISCA] Sent: ${cleanHex} → ${host}:${port}`)
			} else {
				this.log('debug', `[VISCA] Sent inquiry: ${cleanHex} → ${host}:${port}`)
			}
		})
	}

	// Cache of the camera's current image states (for relative UP/DOWN operations)
	public currentState: Record<string, number> = {
		brightness: 8,
		sharpness: 8,
		contrast: 8,
		saturation: 8,
		gamma: 10,
		wdr_level: 0,
		color_temp: 5600,
	}

	private startHttpPolling(): void {
		this.stopHttpPolling() // Clean up old timer before restart

		const interval = Number(this.config.poll_interval ?? 5000)
		if (interval <= 0) {
			this.log('info', 'HTTP status polling is disabled.')
			return
		}

		this.pollInterval = setInterval(() => {
			void this.pollCameraStatus()
		}, interval)

		void this.pollCameraStatus()
	}

	private stopHttpPolling(): void {
		if (this.pollInterval) {
			clearInterval(this.pollInterval)
			this.pollInterval = undefined
		}
	}

	private async pollCameraStatus(): Promise<void> {
		if (!this.config.host) return

		// Query Auto-Tracking state over VISCA UDP
		this.queryAutoTrackingStatus()

		const port = this.config.httpPort || '80'

		const jsonPayload = JSON.stringify({
			image: {
				WB_mode: true,
				exposure_mode: true,
				focus_mode: true,
				brightness: true,
				sharpness: true,
				contrast: true,
				saturation: true,
				gamma: true,
				WDR_level: true,
				color_temperature: true,
			},
		})
		const url = `http://${this.config.host}:${port}/cgi-bin/web.fcgi?func=get${encodeURIComponent(jsonPayload)}`

		try {
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 3000)

			const response = await fetch(url, {
				method: 'GET',
				signal: controller.signal,
			})
			clearTimeout(timeoutId)

			if (response.ok) {
				let json: any
				try {
					json = await response.json()
				} catch (_e: any) {
					this.log('error', 'Failed to parse camera JSON data, response might not be JSON format')
					return
				}

				const isStatusOk =
					json && (json.status === true || json.status === 'ok' || json.status === 1 || !('status' in json))

				if (json && json.image) {
					const wbMode = json.image?.WB_mode || 'unknown'
					const expMode = json.image?.exposure_mode || 'unknown'
					const focusMode = json.image?.focus_mode || 'unknown'

					if (json.image) {
						if (typeof json.image.brightness === 'number') this.currentState.brightness = json.image.brightness
						if (typeof json.image.sharpness === 'number') this.currentState.sharpness = json.image.sharpness
						if (typeof json.image.contrast === 'number') this.currentState.contrast = json.image.contrast
						if (typeof json.image.saturation === 'number') this.currentState.saturation = json.image.saturation
						if (typeof json.image.gamma === 'number') this.currentState.gamma = json.image.gamma
						if (typeof json.image.WDR_level === 'number') this.currentState.wdr_level = json.image.WDR_level
						if (typeof json.image.color_temperature === 'number')
							this.currentState.color_temp = json.image.color_temperature
					}

					this.setVariableValues({
						wb_mode: wbMode,
						exposure_mode: expMode,
						focus_mode: focusMode,
						brightness: json.image.brightness ?? undefined,
						sharpness: json.image.sharpness ?? undefined,
						contrast: json.image.contrast ?? undefined,
						saturation: json.image.saturation ?? undefined,
						gamma: json.image.gamma ?? undefined,
						wdr_level: json.image.WDR_level ?? undefined,
						color_temp: json.image.color_temperature ?? undefined,
					})
					this.checkFeedbacks('wb_mode_feedback', 'exposure_mode_feedback', 'focus_mode_feedback')

					if (!isStatusOk) {
						this.log('debug', `HTTP polling data available, but status is false: ${JSON.stringify(json)}`)
					}
					this.updateStatus(InstanceStatus.Ok)
				} else {
					this.log('debug', `Polling successful but image properties are incomplete. Response: ${JSON.stringify(json)}`)
				}
			} else {
				this.log('warn', `HTTP polling failed, status code: ${response.status}`)
			}
		} catch (e: any) {
			this.log('debug', `HTTP polling network exception: ${e.message}`)
		}
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updatePresets(): void {
		UpdatePresets(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}
}
