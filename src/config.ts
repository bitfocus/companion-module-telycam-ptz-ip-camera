import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface CameraConfig {
	host?: string
	viscaPort?: string
	httpPort?: string
	poll_interval?: number

	[key: string]: any
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'Enter the camera IP and network parameters. Motion uses VISCA, status uses HTTP.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Camera IP Address (Target IP)',
			width: 6,
			regex: Regex.IP,
			default: '',
		},
		{
			type: 'textinput',
			id: 'viscaPort',
			label: 'VISCA UDP Port (for Motion Control)',
			width: 3,
			regex: Regex.PORT,
			default: '52381',
		},
		{
			type: 'textinput',
			id: 'httpPort',
			label: 'HTTP Port (for Status Acquisition)',
			width: 3,
			regex: Regex.PORT,
			default: '80',
		},
		{
			type: 'number',
			id: 'poll_interval',
			label: 'Polling Interval (ms, 0 to disable)',
			width: 6,
			default: 5000,
			min: 0,
			max: 60000,
			step: 1,
		},
	]
}

export type ModuleConfig = CameraConfig
