import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { toHex, uint16ToViscaNibbles } from './utils.js'

export function createPtzActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		ptz_move: {
			name: 'PTZ: Direction Move',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					choices: [
						{ id: 'left', label: 'Left' },
						{ id: 'right', label: 'Right' },
						{ id: 'up', label: 'Up' },
						{ id: 'down', label: 'Down' },
						{ id: 'up_left', label: 'Up-Left' },
						{ id: 'up_right', label: 'Up-Right' },
						{ id: 'down_left', label: 'Down-Left' },
						{ id: 'down_right', label: 'Down-Right' },
					],
					default: 'left',
				},
				{ id: 'pan_speed', type: 'number', label: 'Pan Speed (1-24)', default: 18, min: 1, max: 24 },
				{ id: 'tilt_speed', type: 'number', label: 'Tilt Speed (1-20)', default: 18, min: 1, max: 20 },
			],
			callback: async (event) => {
				const dir = event.options.direction as string
				const pSpeed = toHex(Number(event.options.pan_speed ?? 18))
				const tSpeed = toHex(Number(event.options.tilt_speed ?? 18))
				const dirMap: Record<string, string> = {
					left: '0103',
					right: '0203',
					up: '0301',
					down: '0302',
					up_left: '0101',
					up_right: '0201',
					down_left: '0102',
					down_right: '0202',
				}
				const dirCode = dirMap[dir]
				if (dirCode) self.sendViscaCommand(`81010601${pSpeed}${tSpeed}${dirCode}FF`)
			},
		},
		ptz_stop: {
			name: 'PTZ: Stop',
			options: [],
			callback: async () => {
				self.sendViscaCommand('8101060103030303FF')
			},
		},
		ptz_home: {
			name: 'PTZ: Home',
			options: [],
			callback: async () => {
				self.sendViscaCommand('81010604FF')
			},
		},
		ptz_reset: {
			name: 'PTZ: Reset',
			options: [],
			callback: async () => {
				self.sendViscaCommand('81010605FF')
			},
		},
		ptz_absolute_position: {
			name: 'PTZ: Absolute Position',
			options: [
				{ id: 'pan_speed', type: 'number', label: 'Pan Speed (1-24)', default: 18, min: 1, max: 24 },
				{ id: 'tilt_speed', type: 'number', label: 'Tilt Speed (1-20)', default: 18, min: 1, max: 20 },
				{ id: 'pan_pos', type: 'number', label: 'Pan Position (-32768~32767)', default: 0, min: -32768, max: 32767 },
				{ id: 'tilt_pos', type: 'number', label: 'Tilt Position (-32768~32767)', default: 0, min: -32768, max: 32767 },
			],
			callback: async (event) => {
				const pSpeed = toHex(Number(event.options.pan_speed ?? 18))
				const tSpeed = toHex(Number(event.options.tilt_speed ?? 18))
				const panPos = uint16ToViscaNibbles(Number(event.options.pan_pos ?? 0) & 0xffff)
				const tiltPos = uint16ToViscaNibbles(Number(event.options.tilt_pos ?? 0) & 0xffff)
				self.sendViscaCommand(`81010602${pSpeed}${tSpeed}${panPos}${tiltPos}FF`)
			},
		},
		ptz_relative_position: {
			name: 'PTZ: Relative Position',
			options: [
				{ id: 'pan_speed', type: 'number', label: 'Pan Speed (1-24)', default: 18, min: 1, max: 24 },
				{ id: 'tilt_speed', type: 'number', label: 'Tilt Speed (1-20)', default: 18, min: 1, max: 20 },
				{ id: 'pan_offset', type: 'number', label: 'Pan Offset (-32768~32767)', default: 0, min: -32768, max: 32767 },
				{ id: 'tilt_offset', type: 'number', label: 'Tilt Offset (-32768~32767)', default: 0, min: -32768, max: 32767 },
			],
			callback: async (event) => {
				const pSpeed = toHex(Number(event.options.pan_speed ?? 18))
				const tSpeed = toHex(Number(event.options.tilt_speed ?? 18))
				const panPos = uint16ToViscaNibbles(Number(event.options.pan_offset ?? 0) & 0xffff)
				const tiltPos = uint16ToViscaNibbles(Number(event.options.tilt_offset ?? 0) & 0xffff)
				self.sendViscaCommand(`81010603${pSpeed}${tSpeed}${panPos}${tiltPos}FF`)
			},
		},
		ptz_speed: {
			name: 'PTZ: Set Default Speed',
			options: [{ id: 'pt_speed', type: 'number', label: 'PT Speed (5-24)', default: 18, min: 5, max: 24 }],
			callback: async (event) => {
				const speed = toHex(Number(event.options.pt_speed ?? 18))
				self.sendViscaCommand(`810104C10000${speed}FF`)
			},
		},
	}
}
