import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

// 1. 定义摄像机配置项的 TypeScript 接口（添加了 [key: string]: any 索引签名）
export interface CameraConfig {
	host?: string
	viscaPort?: string
	httpPort?: string

	// 关键：添加这行索引签名，以满足 Companion 框架的 JsonObject 约束
	[key: string]: any
}

// 2. 定义在 Companion Connections 页面上展示给用户的输入表单
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
	]
}

export type ModuleConfig = CameraConfig
