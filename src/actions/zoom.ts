import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { toHex, uint16ToViscaNibbles } from './utils.js'

export function createZoomActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		zoom: {
			name: 'Lens: Zoom Control',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Zoom Action',
					choices: [
						{ id: 'tele_standard', label: 'Tele (Standard)' },
						{ id: 'wide_standard', label: 'Wide (Standard)' },
						{ id: 'tele_variable', label: 'Tele (Variable)' },
						{ id: 'wide_variable', label: 'Wide (Variable)' },
						{ id: 'stop', label: 'Stop' },
					],
					default: 'tele_variable',
				},
				{ id: 'speed', type: 'number', label: 'Zoom Speed (0-7)', default: 5, min: 0, max: 7, step: 1 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const speed = event.options.speed ?? 5
				let cmd = ''
				switch (action) {
					case 'tele_standard':
						cmd = '8101040702FF'
						break
					case 'wide_standard':
						cmd = '8101040703FF'
						break
					case 'tele_variable':
						cmd = `810104072${Math.round(Number(speed))}FF`
						break
					case 'wide_variable':
						cmd = `810104073${Math.round(Number(speed))}FF`
						break
					case 'stop':
						cmd = '8101040700FF'
						break
				}
				if (cmd) self.sendViscaCommand(cmd)
			},
		},
		zoom_direct: {
			name: 'Lens: Zoom Direct',
			options: [
				{
					id: 'position',
					type: 'number',
					label: 'Zoom Position (0=wide ~ 16384=tele)',
					default: 0,
					min: 0,
					max: 16384,
					step: 1,
				},
			],
			callback: async (event) => {
				const pos = uint16ToViscaNibbles(Math.round(Number(event.options.position ?? 0)))
				self.sendViscaCommand(`81010447${pos}FF`)
			},
		},
		zoom_direct_with_speed: {
			name: 'Lens: Zoom Direct with Speed',
			options: [
				{ id: 'speed', type: 'number', label: 'Zoom Speed (0-7)', default: 5, min: 0, max: 7, step: 1 },
				{
					id: 'position',
					type: 'number',
					label: 'Zoom Position (0=wide ~ 16384=tele)',
					default: 0,
					min: 0,
					max: 16384,
					step: 1,
				},
			],
			callback: async (event) => {
				const speed = toHex(Math.round(Number(event.options.speed ?? 5)))
				const pos = uint16ToViscaNibbles(Math.round(Number(event.options.position ?? 0)))
				self.sendViscaCommand(`810A04470${speed}${pos}FF`)
			},
		},
		dzoom: {
			name: 'Lens: Digital Zoom (2X)',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Digital Zoom',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
						{ id: 'combine', label: 'Combine Mode' },
						{ id: 'separate', label: 'Separate Mode' },
					],
					default: 'combine',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				const cmdMap: Record<string, string> = {
					on: '8101040602FF',
					off: '8101040603FF',
					combine: '8101043600FF',
					separate: '8101043601FF',
				}
				const cmd = cmdMap[action]
				if (cmd) self.sendViscaCommand(cmd)
			},
		},
		dzoom_stop: {
			name: 'Lens: Digital Zoom Stop (Separate Mode)',
			options: [],
			callback: async () => {
				self.sendViscaCommand('8101040600FF')
			},
		},
		zoom_speed: {
			name: 'Lens: Set Default Zoom Speed',
			options: [{ id: 'speed', type: 'number', label: 'Zoom Speed (1-7)', default: 5, min: 1, max: 7, step: 1 }],
			callback: async (event) => {
				const speed = toHex(Math.round(Number(event.options.speed ?? 5)))
				self.sendViscaCommand(`810104D10000${speed}FF`)
			},
		},
	}
}
