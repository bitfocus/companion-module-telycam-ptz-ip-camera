import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { toHex, uint16ToViscaNibbles, toViscaByte } from './utils.js'

export function createImageActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		set_white_balance: {
			name: 'Image: White Balance Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'WB Mode',
					choices: [
						{ id: 'auto', label: 'Auto' },
						{ id: 'indoor', label: 'Indoor' },
						{ id: 'outdoor', label: 'Outdoor' },
						{ id: 'onepush', label: 'OnePush' },
						{ id: 'atw', label: 'ATW' },
						{ id: 'manual', label: 'Manual' },
						{ id: 'temperature', label: 'Temperature' },
					],
					default: 'auto',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				const modeMap: Record<string, string> = {
					auto: '8101043500FF',
					indoor: '8101043501FF',
					outdoor: '8101043502FF',
					onepush: '8101043503FF',
					atw: '8101043504FF',
					manual: '8101043505FF',
					temperature: '8101043506FF',
				}
				const cmd = modeMap[mode]
				if (cmd) self.sendViscaCommand(cmd)
			},
		},
		wb_onepush_trigger: {
			name: 'Image: WB OnePush Trigger',
			options: [],
			callback: async () => {
				self.sendViscaCommand('8101041005FF')
			},
		},
		wb_r_gain: {
			name: 'Wb R Gain',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-255, Direct only)', default: 128, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 128)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040300FF')
						break
					case 'up':
						self.sendViscaCommand('8101040302FF')
						break
					case 'down':
						self.sendViscaCommand('8101040303FF')
						break
					case 'direct':
						self.sendViscaCommand(`810104430000${toViscaByte(val)}FF`)
						break
				}
			},
		},
		wb_g_gain: {
			name: 'Wb G Gain',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-255, Direct only)', default: 128, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 128)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040500FF')
						break
					case 'up':
						self.sendViscaCommand('8101040502FF')
						break
					case 'down':
						self.sendViscaCommand('8101040503FF')
						break
					case 'direct':
						self.sendViscaCommand(`810104450000${toViscaByte(val)}FF`)
						break
				}
			},
		},
		wb_b_gain: {
			name: 'Wb B Gain',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-255, Direct only)', default: 128, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 128)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040400FF')
						break
					case 'up':
						self.sendViscaCommand('8101040402FF')
						break
					case 'down':
						self.sendViscaCommand('8101040403FF')
						break
					case 'direct':
						self.sendViscaCommand(`810104440000${toViscaByte(val)}FF`)
						break
				}
			},
		},
		set_exposure_mode: {
			name: 'Image: Exposure Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Exposure Mode',
					choices: [
						{ id: 'full_auto', label: 'Full Auto' },
						{ id: 'manual', label: 'Manual' },
						{ id: 'shutter_priority', label: 'Shutter Priority' },
						{ id: 'iris_priority', label: 'Iris Priority' },
						{ id: 'bright', label: 'Bright' },
					],
					default: 'full_auto',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				const modeMap: Record<string, string> = {
					full_auto: '8101043900FF',
					manual: '8101043903FF',
					shutter_priority: '810104390AFF',
					iris_priority: '810104390BFF',
					bright: '810104390DFF',
				}
				const cmd = modeMap[mode]
				if (cmd) self.sendViscaCommand(cmd)
			},
		},
		shutter: {
			name: 'Shutter',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-255, Direct only)', default: 128, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 128)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040A00FF')
						break
					case 'up':
						self.sendViscaCommand('8101040A02FF')
						break
					case 'down':
						self.sendViscaCommand('8101040A03FF')
						break
					case 'direct':
						self.sendViscaCommand(`8101044A0000${toViscaByte(val)}FF`)
						break
				}
			},
		},
		iris: {
			name: 'Iris',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-255, Direct only)', default: 128, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 128)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040B00FF')
						break
					case 'up':
						self.sendViscaCommand('8101040B02FF')
						break
					case 'down':
						self.sendViscaCommand('8101040B03FF')
						break
					case 'direct':
						self.sendViscaCommand(`8101044B0000${toViscaByte(val)}FF`)
						break
				}
			},
		},
		gain: {
			name: 'Image: Gain Control',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
						{ id: 'limit', label: 'Gain Limit' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-14 / Limit 4-15)', default: 0, min: 0, max: 15 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 0)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040C00FF')
						break
					case 'up':
						self.sendViscaCommand('8101040C02FF')
						break
					case 'down':
						self.sendViscaCommand('8101040C03FF')
						break
					case 'direct':
						self.sendViscaCommand(`8101044C0000${toViscaByte(val)}FF`)
						break
					case 'limit':
						self.sendViscaCommand(`8101042C0${toHex(val)}FF`)
						break
				}
			},
		},
		ae_bright: {
			name: 'Ae Bright',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'reset', label: 'Reset' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-255, Direct only)', default: 128, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const val = Number(event.options.value ?? 128)
				switch (action) {
					case 'reset':
						self.sendViscaCommand('8101040D00FF')
						break
					case 'up':
						self.sendViscaCommand('8101040D02FF')
						break
					case 'down':
						self.sendViscaCommand('8101040D03FF')
						break
					case 'direct':
						self.sendViscaCommand(`8101044D0000${toViscaByte(val)}FF`)
						break
				}
			},
		},
		image_bright: {
			name: 'Image: Brightness Adjust (AE mode)',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+1)' },
						{ id: 'down', label: 'Down (-1)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-15, Direct only)', default: 8, min: 0, max: 15 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(15, self.currentState.brightness + 1)
				} else if (action === 'down') {
					val = Math.max(0, self.currentState.brightness - 1)
				} else {
					val = Number(event.options.value ?? 8)
				}
				self.currentState.brightness = val // 立即更新缓存
				self.sendViscaCommand(`810104A40000${toViscaByte(val)}FF`)
			},
		},
		sharpness: {
			name: 'Sharpness',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+1)' },
						{ id: 'down', label: 'Down (-1)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-15, Direct only)', default: 8, min: 0, max: 15 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(15, self.currentState.sharpness + 1)
				} else if (action === 'down') {
					val = Math.max(0, self.currentState.sharpness - 1)
				} else {
					val = Number(event.options.value ?? 8)
				}
				self.currentState.sharpness = val // 立即更新缓存
				self.sendViscaCommand(`810104420000${toViscaByte(val)}FF`)
			},
		},
		saturation: {
			name: 'Image: Saturation',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+1)' },
						{ id: 'down', label: 'Down (-1)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-15, Direct only)', default: 8, min: 0, max: 15 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(15, self.currentState.saturation + 1)
				} else if (action === 'down') {
					val = Math.max(0, self.currentState.saturation - 1)
				} else {
					val = Number(event.options.value ?? 8)
				}
				self.currentState.saturation = val
				self.sendViscaCommand(`810104A10000${toViscaByte(val)}FF`)
			},
		},
		contrast: {
			name: 'Image: Contrast',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+1)' },
						{ id: 'down', label: 'Down (-1)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-15, Direct only)', default: 8, min: 0, max: 15 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(15, self.currentState.contrast + 1)
				} else if (action === 'down') {
					val = Math.max(0, self.currentState.contrast - 1)
				} else {
					val = Number(event.options.value ?? 8)
				}
				self.currentState.contrast = val
				self.sendViscaCommand(`810104A20000${toViscaByte(val)}FF`)
			},
		},
		gamma: {
			name: 'Image: Gamma',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+1)' },
						{ id: 'down', label: 'Down (-1)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-15, Direct only)', default: 10, min: 0, max: 15 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(15, self.currentState.gamma + 1)
				} else if (action === 'down') {
					val = Math.max(0, self.currentState.gamma - 1)
				} else {
					val = Number(event.options.value ?? 10)
				}
				self.currentState.gamma = val
				self.sendViscaCommand(`8101045B0${val.toString(16)}FF`)
			},
		},
		wdr: {
			name: 'Image: WDR On/Off',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'WDR',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '8101043D02FF' : '8101043D03FF')
			},
		},
		wdr_level: {
			name: 'Image: WDR Level',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+1)' },
						{ id: 'down', label: 'Down (-1)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Value (0-6, Direct only)', default: 0, min: 0, max: 6 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(6, self.currentState.wdr_level + 1)
				} else if (action === 'down') {
					val = Math.max(0, self.currentState.wdr_level - 1)
				} else {
					val = Number(event.options.value ?? 0)
				}
				self.currentState.wdr_level = val
				self.sendViscaCommand(`810104D30${val.toString(16)}FF`)
			},
		},
		backlight: {
			name: 'Image: Backlight (BLC) On/Off',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'BLC',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '8101043302FF' : '8101043303FF')
			},
		},
		flip: {
			name: 'Image: Vertical Flip',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Flip',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '8101046602FF' : '8101046603FF')
			},
		},
		mirror: {
			name: 'Image: Horizontal Mirror',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Mirror',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '8101046102FF' : '8101046103FF')
			},
		},
		nr_2d: {
			name: 'Image: 2D Noise Reduction',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: '2D NR',
					choices: [
						{ id: 'off', label: 'OFF' },
						{ id: 'on', label: 'ON' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810104A501FF' : '810104A500FF')
			},
		},
		nr_3d: {
			name: 'Image: 3D Noise Reduction',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: '3D NR',
					choices: [
						{ id: '0', label: 'Auto' },
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
						{ id: '4', label: '4' },
						{ id: '5', label: 'Off' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104530${mode}FF`)
			},
		},
		color_temp_direct: {
			name: 'Image: Color Temperature',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'up', label: 'Up (+100)' },
						{ id: 'down', label: 'Down (-100)' },
						{ id: 'direct', label: 'Direct' },
					],
					default: 'up',
				},
				{ id: 'value', type: 'number', label: 'Color Temp (K, Direct only)', default: 5600, min: 1800, max: 10000 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				let val: number
				if (action === 'up') {
					val = Math.min(10000, self.currentState.color_temp + 100)
				} else if (action === 'down') {
					val = Math.max(1800, self.currentState.color_temp - 100)
				} else {
					val = Number(event.options.value ?? 5600)
				}
				self.currentState.color_temp = val
				const pos = uint16ToViscaNibbles(val)
				self.sendViscaCommand(`8101042A${pos}FF`)
			},
		},
		flicker_mode: {
			name: 'Image: Flicker Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Flicker',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: '50Hz' },
						{ id: '2', label: '60Hz' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104230${mode}FF`)
			},
		},
	}
}
