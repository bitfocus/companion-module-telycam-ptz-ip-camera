import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { uint16ToViscaNibbles } from './utils.js'

export function createFocusActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		focus_mode: {
			name: 'Focus: Auto/Manual',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Focus Mode',
					choices: [
						{ id: 'auto', label: 'Auto Focus' },
						{ id: 'manual', label: 'Manual Focus' },
					],
					default: 'auto',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(mode === 'auto' ? '8101043802FF' : '8101043803FF')
			},
		},
		focus_one_push: {
			name: 'Focus: One Push AF',
			options: [],
			callback: async () => {
				self.sendViscaCommand('8101041801FF')
			},
		},
		focus_far_near: {
			name: 'Focus: Far/Near Control',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Focus Direction',
					choices: [
						{ id: 'far_standard', label: 'Far (Standard)' },
						{ id: 'near_standard', label: 'Near (Standard)' },
						{ id: 'far_variable', label: 'Far (Variable)' },
						{ id: 'near_variable', label: 'Near (Variable)' },
						{ id: 'stop', label: 'Stop' },
					],
					default: 'far_variable',
				},
				{ id: 'speed', type: 'number', label: 'Focus Speed (0-7)', default: 3, min: 0, max: 7 },
			],
			callback: async (event) => {
				const action = event.options.action as string
				const speed = event.options.speed ?? 3
				let cmd = ''
				switch (action) {
					case 'far_standard':
						cmd = '8101040802FF'
						break
					case 'near_standard':
						cmd = '8101040803FF'
						break
					case 'far_variable':
						cmd = `810104082${Number(speed)}FF`
						break
					case 'near_variable':
						cmd = `810104083${Number(speed)}FF`
						break
					case 'stop':
						cmd = '8101040800FF'
						break
				}
				if (cmd) self.sendViscaCommand(cmd)
			},
		},
		focus_direct: {
			name: 'Focus: Direct Position',
			options: [{ id: 'position', type: 'number', label: 'Focus Position (0-65535)', default: 0, min: 0, max: 65535 }],
			callback: async (event) => {
				const pos = uint16ToViscaNibbles(Number(event.options.position ?? 0))
				self.sendViscaCommand(`81010448${pos}FF`)
			},
		},
		zoom_focus_direct: {
			name: 'Focus: Zoom+Focus Direct',
			options: [
				{ id: 'zoom_pos', type: 'number', label: 'Zoom Position (0~16384)', default: 0, min: 0, max: 16384 },
				{ id: 'focus_pos', type: 'number', label: 'Focus Position (0-65535)', default: 0, min: 0, max: 65535 },
			],
			callback: async (event) => {
				const zoomPos = uint16ToViscaNibbles(Number(event.options.zoom_pos ?? 0))
				const focusPos = uint16ToViscaNibbles(Number(event.options.focus_pos ?? 0))
				self.sendViscaCommand(`81010447${zoomPos}${focusPos}FF`)
			},
		},
	}
}
