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
	 * Send VISCA hex commands
	 */
	public sendViscaCommand(hexString: string): void {
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
			} else {
				this.log('info', `[VISCA] Sent: ${cleanHex} → ${host}:${port}`)
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
					})

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
