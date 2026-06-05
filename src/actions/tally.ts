import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'

export function createTallyActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		tally_brightness: {
			name: 'Tally: Brightness',
			options: [
				{
					id: 'brightness',
					type: 'dropdown',
					label: 'Tally Brightness',
					choices: [
						{ id: '0', label: 'OFF' },
						{ id: '1', label: 'Low' },
						{ id: '2', label: 'Middle' },
						{ id: '3', label: 'High' },
					],
					default: '2',
				},
			],
			callback: async (event) => {
				const brightness = event.options.brightness as string
				self.sendViscaCommand(`81017E010A010${brightness}FF`)
			},
		},

		tally_control: {
			name: 'Tally: On/Off',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Tally Light',
					choices: [
						{ id: '0', label: 'Off (LED Off)' },
						{ id: '1', label: 'Red On' },
						{ id: '2', label: 'Red On (alt)' },
						{ id: '3', label: 'Green On' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`81017E010A000${mode}FF`)
			},
		},
	}
}
