import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { toHex } from './utils.js'

export function createPresetActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		preset: {
			name: 'Preset: Recall/Save/Reset (0-127)',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'recall', label: 'Recall' },
						{ id: 'save', label: 'Save' },
						{ id: 'reset', label: 'Reset' },
					],
					default: 'recall',
				},
				{ id: 'preset_num', type: 'number', label: 'Preset Number (0-127)', default: 1, min: 0, max: 127 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const num = toHex(Number(event.options.preset_num ?? 1))
				const actionMap: Record<string, string> = { recall: '02', save: '01', reset: '00' }
				const actionCode = actionMap[action]
				if (actionCode) self.sendViscaCommand(`8101043F${actionCode}${num}FF`)
			},
		},
		preset_high: {
			name: 'Preset: Recall/Save/Reset (0-255 Extended)',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'recall', label: 'Recall' },
						{ id: 'save', label: 'Save' },
						{ id: 'reset', label: 'Reset' },
					],
					default: 'recall',
				},
				{ id: 'preset_num', type: 'number', label: 'Preset Number (0-255)', default: 1, min: 0, max: 255 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const num = Number(event.options.preset_num ?? 1)
				const highNibble = toHex((num >> 4) & 0x0f)
				const lowNibble = toHex(num & 0x0f)
				const actionMap: Record<string, string> = { recall: '02', save: '01', reset: '00' }
				const actionCode = actionMap[action]
				if (actionCode) self.sendViscaCommand(`8101043F${actionCode}0${highNibble}0${lowNibble}FF`)
			},
		},
		preset_speed: {
			name: 'Preset: Set Recall Speed',
			options: [{ id: 'speed', type: 'number', label: 'Speed (2-24)', default: 18, min: 2, max: 24 }],
			callback: async (event) => {
				const speed = toHex(Number(event.options.speed ?? 18))
				self.sendViscaCommand(`81017E010B00${speed}FF`)
			},
		},
		preset_zoom_speed: {
			name: 'Preset: Set Recall Zoom Speed',
			options: [{ id: 'speed', type: 'number', label: 'Zoom Speed (0-7)', default: 5, min: 0, max: 7 }],
			callback: async (event) => {
				const speed = toHex(Number(event.options.speed ?? 5))
				self.sendViscaCommand(`81017E012B000${speed}FF`)
			},
		},
		preset_speed_adj: {
			name: 'Preset: Adjust Speed',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					choices: [
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
					],
					default: 'up',
				},
			],
			callback: async (event) => {
				const dir = event.options.direction as string
				self.sendViscaCommand(dir === 'up' ? '81017E011B02FF' : '81017E011B03FF')
			},
		},
		freeze: {
			name: 'Freeze: On/Off',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Freeze',
					choices: [
						{ id: 'on', label: 'Freeze ON' },
						{ id: 'off', label: 'Freeze OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '8101046202FF' : '8101046203FF')
			},
		},
		preset_freeze: {
			name: 'Preset Freeze: On/Off',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Preset Freeze',
					choices: [
						{ id: 'on', label: 'Freeze ON' },
						{ id: 'off', label: 'Freeze OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '8101047602FF' : '8101047603FF')
			},
		},
	}
}
