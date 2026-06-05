import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { toViscaByte } from './utils.js'

export function createSystemActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		sleep: {
			name: 'System: Sleep Switch',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Sleep State',
					choices: [
						{ id: 'awake', label: 'Awake' },
						{ id: 'sleep', label: 'Sleep' },
					],
					default: 'awake',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'awake' ? '8101040002FF' : '8101040003FF')
			},
		},
		web_reset: {
			name: 'System: Reset/Reboot',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Reset Mode',
					choices: [
						{ id: '1', label: 'Reset Image Settings' },
						{ id: '2', label: 'Factory Reset (keep network)' },
						{ id: '3', label: 'Reboot Only' },
						{ id: '5', label: 'Factory Reset (keep network config)' },
					],
					default: '3',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104A00${mode}FF`)
			},
		},
		tracking_mode: {
			name: 'System: Auto Tracking Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Tracking Mode',
					choices: [
						{ id: '0', label: 'Only Tracking' },
						{ id: '1', label: 'Head Framing' },
						{ id: '2', label: 'Body Framing' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104C8010${mode}FF`)
			},
		},
		tracking_onoff: {
			name: 'System: Auto Tracking On/Off',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Tracking',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810104C801FF' : '810104C800FF')
			},
		},
		tracking_tilt_lock: {
			name: 'Tracking: Tilt Lock',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Tilt Lock',
					choices: [
						{ id: 'on', label: 'Enable' },
						{ id: 'off', label: 'Disable' },
					],
					default: 'off',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810104D60101FF' : '810104D60100FF')
			},
		},
		tracking_lock_scaling: {
			name: 'Tracking: Lock Scaling Ratio',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Lock Scaling',
					choices: [
						{ id: 'on', label: 'Enable' },
						{ id: 'off', label: 'Disable' },
					],
					default: 'off',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810104D60001FF' : '810104D60000FF')
			},
		},
		tracking_blackboard: {
			name: 'Tracking: Blackboard Area Detect',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Blackboard Detect',
					choices: [
						{ id: 'on', label: 'Enable' },
						{ id: 'off', label: 'Disable' },
					],
					default: 'off',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810104CE01FF' : '810104CE00FF')
			},
		},
		tracking_limit_settings: {
			name: 'Tracking: Pan&Tilt Limit Settings',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'PT Limit',
					choices: [
						{ id: 'on', label: 'Enable' },
						{ id: 'off', label: 'Disable' },
					],
					default: 'off',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810104D701FF' : '810104D700FF')
			},
		},
		tracking_target_position: {
			name: 'Tracking: Target Position',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Target Position',
					choices: [
						{ id: '0', label: 'Center' },
						{ id: '1', label: 'Left' },
						{ id: '2', label: 'Right' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104CB0${mode}FF`)
			},
		},
		tracking_target_scaling: {
			name: 'Tracking: Target Scaling',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Target Scaling',
					choices: [
						{ id: '1', label: 'Full Body' },
						{ id: '2', label: 'Above Knee' },
						{ id: '3', label: 'Above Waist' },
						{ id: '4', label: 'Above Chest' },
					],
					default: '1',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104CC000${mode}FF`)
			},
		},
		tracking_lost_timeout: {
			name: 'Tracking: Target Lost Timeout',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Timeout',
					choices: [
						{ id: '1', label: '1s' },
						{ id: '2', label: '3s' },
						{ id: '3', label: '5s' },
						{ id: '4', label: '10s' },
					],
					default: '2',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				// Mapping TO steps to ms (t*100ms)
				const timeMap: Record<string, number> = { '1': 10, '2': 30, '3': 50, '4': 100 }
				const val = timeMap[mode] || 30
				self.sendViscaCommand(`810104CD${toViscaByte(val)}FF`)
			},
		},
		tracking_switch_target: {
			name: 'Tracking: Switch Target',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Switch To',
					choices: [
						{ id: 'left', label: 'Left' },
						{ id: 'right', label: 'Right' },
					],
					default: 'left',
				},
			],
			callback: async (event) => {
				const direction = event.options.direction as string
				self.sendViscaCommand(direction === 'left' ? '810104CA03FF' : '810104CA02FF')
			},
		},
		tracking_initial_position: {
			name: 'Tracking: Call Initial Position',
			options: [
				{
					id: 'pos',
					type: 'dropdown',
					label: 'Position',
					choices: [
						{ id: '0', label: 'Initial Position 0 (#255)' },
						{ id: '1', label: 'Initial Position 1 (#254)' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const pos = event.options.pos as string
				const presetHex = pos === '0' ? '0F' : '0E'
				self.sendViscaCommand(`8101043F020F${presetHex}FF`)
			},
		},
		tracking_set_initial_position: {
			name: 'Tracking: Set Initial Position',
			options: [
				{
					id: 'pos',
					type: 'dropdown',
					label: 'Position',
					choices: [
						{ id: '0', label: 'Initial Position 0 (#255)' },
						{ id: '1', label: 'Initial Position 1 (#254)' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const pos = event.options.pos as string
				const presetHex = pos === '0' ? '0F' : '0E'
				self.sendViscaCommand(`8101043F010F${presetHex}FF`)
			},
		},
		tracking_delete_initial_position: {
			name: 'Tracking: Delete Initial Position',
			options: [
				{
					id: 'pos',
					type: 'dropdown',
					label: 'Position',
					choices: [
						{ id: '0', label: 'Initial Position 0 (#255)' },
						{ id: '1', label: 'Initial Position 1 (#254)' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const pos = event.options.pos as string
				const presetHex = pos === '0' ? '0F' : '0E'
				self.sendViscaCommand(`8101043F030F${presetHex}FF`)
			},
		},
		tracking_board_position: {
			name: 'Tracking: Call Board Position',
			options: [
				{
					id: 'position',
					type: 'dropdown',
					label: 'Position',
					choices: [
						{ id: '1', label: 'Board Pos 1' },
						{ id: '2', label: 'Board Pos 2' },
					],
					default: '1',
				},
			],
			callback: async (event) => {
				const pos = event.options.position as string
				const cmd = pos === '1' ? '8101043F020F0CFF' : '8101043F020F0AFF'
				self.sendViscaCommand(cmd)
			},
		},
		tracking_set_board_position: {
			name: 'Tracking: Set Board Position',
			options: [
				{
					id: 'position',
					type: 'dropdown',
					label: 'Position',
					choices: [
						{ id: '1', label: 'Board Pos 1' },
						{ id: '2', label: 'Board Pos 2' },
					],
					default: '1',
				},
			],
			callback: async (event) => {
				const pos = event.options.position as string
				const cmd = pos === '1' ? '8101043F010F0CFF' : '8101043F010F0AFF'
				self.sendViscaCommand(cmd)
			},
		},
		tracking_delete_board_position: {
			name: 'Tracking: Delete Board Position',
			options: [
				{
					id: 'position',
					type: 'dropdown',
					label: 'Position',
					choices: [
						{ id: '1', label: 'Board Pos 1' },
						{ id: '2', label: 'Board Pos 2' },
					],
					default: '1',
				},
			],
			callback: async (event) => {
				const pos = event.options.position as string
				const cmd = pos === '1' ? '8101043F030F0CFF' : '8101043F030F0AFF'
				self.sendViscaCommand(cmd)
			},
		},
		tracking_limit_preset: {
			name: 'Tracking: P/T Limit (LeftUp/RightDown)',
			options: [
				{
					id: 'type',
					type: 'dropdown',
					label: 'Limit Type',
					choices: [
						{ id: 'leftup', label: 'Left Up (#251)' },
						{ id: 'rightdown', label: 'Right Down (#253)' },
					],
					default: 'leftup',
				},
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: '1', label: 'Set' },
						{ id: '2', label: 'Call' },
						{ id: '3', label: 'Clear' },
					],
					default: '2',
				},
			],
			callback: async (event) => {
				const type = event.options.type as string
				const action = event.options.action as string
				const presetHex = (type === 'leftup' ? '0B' : '0D').toUpperCase()
				self.sendViscaCommand(`8101043F0${action}0F${presetHex}FF`)
			},
		},
		nd_filter: {
			name: 'System: ND Filter',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'ND Filter',
					choices: [
						{ id: '0', label: 'OFF' },
						{ id: '1', label: 'ND4' },
						{ id: '2', label: 'ND16' },
						{ id: '3', label: 'ND64' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104D90${mode}FF`)
			},
		},
		ir_cutter: {
			name: 'System: Day/Night Mode (IR Cut)',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Day/Night',
					choices: [
						{ id: 'day', label: 'Day Mode' },
						{ id: 'night', label: 'Night Mode' },
					],
					default: 'day',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(mode === 'night' ? '8101040102FF' : '8101040103FF')
			},
		},
		speed_by_zoom: {
			name: 'System: Speed-by-Zoom On/Off',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Speed-by-Zoom',
					choices: [
						{ id: 'on', label: 'ON' },
						{ id: 'off', label: 'OFF' },
					],
					default: 'on',
				},
			],
			callback: async (event) => {
				const action = event.options.action as string
				self.sendViscaCommand(action === 'on' ? '810106A002FF' : '810106A003FF')
			},
		},
	}
}
