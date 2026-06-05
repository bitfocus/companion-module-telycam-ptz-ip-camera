import { type CompanionPresetDefinitions, type CompanionPresetSection } from '@companion-module/base'
import type ModuleInstance from './main.js'

/** Style constants — purple background (RGB 83,18,228), white text */
const BG_PURPLE = 0x5312e4
const BG_RED = 0xcc0000
const BG_ORANGE = 0xcc7a00
const CLR_WHITE = 16777215
const SZ = '14'

export function UpdatePresets(self: ModuleInstance): void {
	const structure: CompanionPresetSection[] = [
		{
			id: 'pan_tilt',
			name: 'Pan/Tilt',
			definitions: [
				{
					id: 'ptz_dirs',
					type: 'simple',
					name: 'Direction',
					presets: [
						'ptz_up',
						'ptz_down',
						'ptz_left',
						'ptz_right',
						'ptz_up_left',
						'ptz_up_right',
						'ptz_down_left',
						'ptz_down_right',
						'ptz_home',
					],
				},
			],
		},
		{
			id: 'lens',
			name: 'Lens',
			definitions: [
				{
					id: 'lens_zoom',
					type: 'simple',
					name: 'Zoom',
					presets: ['zoom_in', 'zoom_out'],
				},
				{
					id: 'lens_focus',
					type: 'simple',
					name: 'Focus',
					presets: ['focus_far', 'focus_near', 'auto_focus', 'one_push_af'],
				},
			],
		},
		{
			id: 'recall_preset',
			name: 'Recall Preset',
			definitions: [
				{
					id: 'recall_1_50',
					type: 'simple',
					name: 'PSET 1-50',
					presets: Array.from({ length: 50 }, (_, i) => `recall_pset_${i + 1}`),
				},
			],
		},
		{
			id: 'save_preset',
			name: 'Save Preset',
			definitions: [
				{
					id: 'save_1_50',
					type: 'simple',
					name: 'PSET 1-50',
					presets: Array.from({ length: 50 }, (_, i) => `save_pset_${i + 1}`),
				},
			],
		},
		{
			id: 'del_preset',
			name: 'Delete Preset',
			definitions: [
				{
					id: 'del_1_50',
					type: 'simple',
					name: 'PSET 1-50',
					presets: Array.from({ length: 50 }, (_, i) => `del_pset_${i + 1}`),
				},
			],
		},
		{
			id: 'image',
			name: 'Image',
			definitions: [
				{
					id: 'img_ctrl',
					type: 'simple',
					name: 'Image Control',
					presets: [
						'default_image',
						'brightness_up',
						'brightness_down',
						'sharpness_up',
						'sharpness_down',
						'saturation_up',
						'saturation_down',
						'contrast_up',
						'contrast_down',
						'gamma_up',
						'gamma_down',
						'wdr_level_up',
						'wdr_level_down',
						'blc_on',
						'blc_off',
						'wdr_on',
						'wdr_off',
						'nr_2d_on',
						'nr_2d_off',
						'nr_3d_off',
						'nr_3d_l1',
						'nr_3d_l2',
						'nr_3d_l3',
						'nr_3d_l4',
						'nr_3d_auto',
						'flicker_off',
						'flicker_50hz',
						'flicker_60hz',
					],
				},
			],
		},
		{
			id: 'exposure',
			name: 'Exposure',
			definitions: [
				{
					id: 'exp_mode_status',
					type: 'simple',
					name: 'Exposure Mode Status',
					presets: ['exposure_mode_status'],
				},
				{
					id: 'exp_mode',
					type: 'simple',
					name: 'Exposure Mode',
					presets: ['expos_auto', 'expos_manual', 'shutter_pri', 'iris_pri', 'expos_bright'],
				},
				{
					id: 'exp_adj',
					type: 'simple',
					name: 'Exposure Adjust',
					presets: [
						'shutter_up',
						'shutter_down',
						'iris_up',
						'iris_down',
						'gain_up',
						'gain_down',
						'ae_bright_up',
						'ae_bright_down',
					],
				},
			],
		},
		{
			id: 'white_balance',
			name: 'White Balance',
			definitions: [
				{
					id: 'wb_status',
					type: 'simple',
					name: 'WB Mode Status',
					presets: ['wb_mode_status'],
				},
				{
					id: 'wb_mode',
					type: 'simple',
					name: 'WB Mode',
					presets: ['wb_auto', 'wb_indoor', 'wb_outdoor', 'wb_onepush', 'wb_atw', 'wb_manual', 'wb_temperature'],
				},
				{
					id: 'wb_ctrl',
					type: 'simple',
					name: 'WB Control',
					presets: [
						'one_push_wb',
						'r_gain_up',
						'r_gain_down',
						'g_gain_up',
						'g_gain_down',
						'b_gain_up',
						'b_gain_down',
						'color_temp_up',
						'color_temp_down',
					],
				},
			],
		},
		{
			id: 'dig_effect',
			name: 'Dig-Effect',
			definitions: [
				{
					id: 'effect',
					type: 'simple',
					name: 'Mirror/Flip',
					presets: ['mirror_on', 'mirror_off', 'flip_on', 'flip_off', 'mirror_flip_on', 'mirror_flip_off'],
				},
			],
		},
		{
			id: 'auto_tracking',
			name: 'Auto Tracking',
			definitions: [
				{
					id: 'tracking',
					type: 'simple',
					name: 'Tracking',
					presets: ['tracking_on', 'tracking_off'],
				},
				{
					id: 'tracking_mode',
					type: 'simple',
					name: 'Tracking Mode',
					presets: ['track_mode_only', 'track_mode_head', 'track_mode_body'],
				},
				{
					id: 'tracking_target_pos',
					type: 'simple',
					name: 'Target Position',
					presets: ['track_pos_center', 'track_pos_left', 'track_pos_right'],
				},
				{
					id: 'tracking_target_scale',
					type: 'simple',
					name: 'Target Scaling',
					presets: ['track_scale_full', 'track_scale_knee', 'track_scale_waist', 'track_scale_chest'],
				},
				{
					id: 'tracking_tilt',
					type: 'simple',
					name: 'Tracking Tilt Lock',
					presets: ['tracking_tilt_on', 'tracking_tilt_off'],
				},
				{
					id: 'tracking_timeout',
					type: 'simple',
					name: 'Target Lost Timeout',
					presets: ['track_timeout_1s', 'track_timeout_3s', 'track_timeout_5s', 'track_timeout_10s'],
				},
				{
					id: 'tracking_lock_scaling',
					type: 'simple',
					name: 'Tracking Lock Scaling',
					presets: ['track_lock_scaling_on', 'track_lock_scaling_off'],
				},
				{
					id: 'tracking_switch',
					type: 'simple',
					name: 'Switch Target',
					presets: ['track_switch_left', 'track_switch_right'],
				},
				{
					id: 'tracking_blackboard',
					type: 'simple',
					name: 'Blackboard Area Detect',
					presets: ['track_blackboard_on', 'track_blackboard_off'],
				},
				{
					id: 'tracking_limit',
					type: 'simple',
					name: 'Pan/Tilt Limit Settings',
					presets: ['track_limit_on', 'track_limit_off'],
				},
				{
					id: 'tracking_init_pos',
					type: 'simple',
					name: 'Initial Position 0',
					presets: ['track_init0_call', 'track_init0_set', 'track_init0_del'],
				},
				{
					id: 'tracking_init_pos1',
					type: 'simple',
					name: 'Initial Position 1',
					presets: ['track_init1_call', 'track_init1_set', 'track_init1_del'],
				},
				{
					id: 'tracking_limit_presets',
					type: 'simple',
					name: 'P/T Limit Presets',
					presets: [
						'track_lim_lu_call',
						'track_lim_lu_set',
						'track_lim_lu_del',
						'track_lim_rd_call',
						'track_lim_rd_set',
						'track_lim_rd_del',
					],
				},
				{
					id: 'tracking_board_control',
					type: 'simple',
					name: 'Board Position Control',
					presets: [
						'track_board_pos1',
						'track_set_board1',
						'track_del_board1',
						'track_board_pos2',
						'track_set_board2',
						'track_del_board2',
					],
				},
			],
		},
		{
			id: 'system',
			name: 'System',
			definitions: [
				{
					id: 'sys_ctrl',
					type: 'simple',
					name: 'System Control',
					presets: [
						'wake_up',
						'enter_sleep',
						'tally_off',
						'tally_red_on',
						'tally_green_on',
						'ir_cut_day',
						'ir_cut_night',
					],
				},
			],
		},
	]

	const presets: CompanionPresetDefinitions = {
		// ── Pan/Tilt ──────────────────────────────────────────────
		ptz_up: makePtzPreset('▲', 'up'),
		ptz_down: makePtzPreset('▼', 'down'),
		ptz_left: makePtzPreset('◀', 'left'),
		ptz_right: makePtzPreset('▶', 'right'),
		ptz_up_left: makePtzPreset('◤', 'up_left'),
		ptz_up_right: makePtzPreset('◥', 'up_right'),
		ptz_down_left: makePtzPreset('◣', 'down_left'),
		ptz_down_right: makePtzPreset('◢', 'down_right'),
		ptz_home: {
			type: 'simple',
			name: 'Home',
			style: { text: 'HOME', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'ptz_home', options: {} }], up: [] }],
			feedbacks: [],
		},

		// ── Lens ──────────────────────────────────────────────────
		zoom_in: {
			type: 'simple',
			name: 'Zoom In',
			style: { text: 'ZOOM IN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [
				{
					down: [{ actionId: 'zoom', options: { action: 'tele_variable', speed: 5 } }],
					up: [{ actionId: 'zoom', options: { action: 'stop', speed: 5 } }],
				},
			],
			feedbacks: [],
		},
		zoom_out: {
			type: 'simple',
			name: 'Zoom Out',
			style: { text: 'ZOOM OUT', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [
				{
					down: [{ actionId: 'zoom', options: { action: 'wide_variable', speed: 5 } }],
					up: [{ actionId: 'zoom', options: { action: 'stop', speed: 5 } }],
				},
			],
			feedbacks: [],
		},
		focus_far: {
			type: 'simple',
			name: 'Focus Far',
			style: { text: 'FOCUS FAR', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [
				{
					down: [{ actionId: 'focus_far_near', options: { action: 'far_variable', speed: 3 } }],
					up: [{ actionId: 'focus_far_near', options: { action: 'stop', speed: 3 } }],
				},
			],
			feedbacks: [],
		},
		focus_near: {
			type: 'simple',
			name: 'Focus Near',
			style: { text: 'FOCUS NEAR', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [
				{
					down: [{ actionId: 'focus_far_near', options: { action: 'near_variable', speed: 3 } }],
					up: [{ actionId: 'focus_far_near', options: { action: 'stop', speed: 3 } }],
				},
			],
			feedbacks: [],
		},
		auto_focus: {
			type: 'simple',
			name: 'Auto Focus',
			style: { text: 'AUTO FOCUS', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'focus_mode', options: { mode: 'auto' } }], up: [] }],
			feedbacks: [],
		},
		one_push_af: {
			type: 'simple',
			name: 'One Push AF',
			style: { text: 'One Push AF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'focus_one_push', options: {} }], up: [] }],
			feedbacks: [],
		},

		// ── Recall Preset 1-50 ────────────────────────────────────
		...Object.fromEntries(
			Array.from({ length: 50 }, (_, i) => {
				const n = i + 1
				return [
					`recall_pset_${n}`,
					{
						type: 'simple' as const,
						name: `Recall PSET ${n}`,
						style: { text: `PSET ${n}`, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
						steps: [{ down: [{ actionId: 'preset', options: { action: 'recall', preset_num: n } }], up: [] }],
						feedbacks: [],
					},
				]
			}),
		),

		// ── Save Preset 1-50 ──────────────────────────────────────
		...Object.fromEntries(
			Array.from({ length: 50 }, (_, i) => {
				const n = i + 1
				return [
					`save_pset_${n}`,
					{
						type: 'simple' as const,
						name: `SAVE PSET ${n}`,
						style: { text: `SAVE ${n}`, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
						steps: [{ down: [{ actionId: 'preset', options: { action: 'save', preset_num: n } }], up: [] }],
						feedbacks: [],
					},
				]
			}),
		),

		// ── Delete Preset 1-50 ────────────────────────────────────────
		...Object.fromEntries(
			Array.from({ length: 50 }, (_, i) => {
				const n = i + 1
				return [
					`del_pset_${n}`,
					{
						type: 'simple' as const,
						name: `DEL PSET ${n}`,
						style: { text: `DEL ${n}`, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
						steps: [{ down: [{ actionId: 'preset', options: { action: 'reset', preset_num: n } }], up: [] }],
						feedbacks: [],
					},
				]
			}),
		),

		// ── Image ─────────────────────────────────────────────────
		default_image: {
			type: 'simple',
			name: 'Default Image',
			style: { text: 'Default\nImage', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'web_reset', options: { mode: '1' } }], up: [] }],
			feedbacks: [],
		},
		brightness_up: {
			type: 'simple',
			name: 'Brightness UP',
			style: { text: 'Brightness\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'image_bright', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		brightness_down: {
			type: 'simple',
			name: 'Brightness DOWN',
			style: { text: 'Brightness\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'image_bright', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		sharpness_up: {
			type: 'simple',
			name: 'Sharpness UP',
			style: { text: 'Sharpness\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'sharpness', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		sharpness_down: {
			type: 'simple',
			name: 'Sharpness DOWN',
			style: { text: 'Sharpness\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'sharpness', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		saturation_up: {
			type: 'simple',
			name: 'Saturation UP',
			style: { text: 'Saturation\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'saturation', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		saturation_down: {
			type: 'simple',
			name: 'Saturation DOWN',
			style: { text: 'Saturation\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'saturation', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		contrast_up: {
			type: 'simple',
			name: 'Contrast UP',
			style: { text: 'Contrast\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'contrast', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		contrast_down: {
			type: 'simple',
			name: 'Contrast DOWN',
			style: { text: 'Contrast\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'contrast', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		gamma_up: {
			type: 'simple',
			name: 'Gamma UP',
			style: { text: 'Gamma\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'gamma', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		gamma_down: {
			type: 'simple',
			name: 'Gamma DOWN',
			style: { text: 'Gamma\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'gamma', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		wdr_level_up: {
			type: 'simple',
			name: 'WDR Level UP',
			style: { text: 'WDR\nLevel UP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wdr_level', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		wdr_level_down: {
			type: 'simple',
			name: 'WDR Level DOWN',
			style: { text: 'WDR\nLevel DN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wdr_level', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		blc_on: {
			type: 'simple',
			name: 'BLC ON',
			style: { text: 'BLC\nON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'backlight', options: { action: 'on' } }], up: [] }],
			feedbacks: [],
		},
		blc_off: {
			type: 'simple',
			name: 'BLC OFF',
			style: { text: 'BLC\nOFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'backlight', options: { action: 'off' } }], up: [] }],
			feedbacks: [],
		},
		wdr_on: {
			type: 'simple',
			name: 'D-WDR ON',
			style: { text: 'D-WDR\nON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wdr', options: { action: 'on' } }], up: [] }],
			feedbacks: [],
		},
		wdr_off: {
			type: 'simple',
			name: 'D-WDR OFF',
			style: { text: 'D-WDR\nOFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wdr', options: { action: 'off' } }], up: [] }],
			feedbacks: [],
		},
		nr_2d_on: {
			type: 'simple',
			name: '2DNR ON',
			style: { text: '2DNR\nON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_2d', options: { action: 'on' } }], up: [] }],
			feedbacks: [],
		},
		nr_2d_off: {
			type: 'simple',
			name: '2DNR OFF',
			style: { text: '2DNR\nOFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_2d', options: { action: 'off' } }], up: [] }],
			feedbacks: [],
		},
		nr_3d_auto: {
			type: 'simple',
			name: '3DNR AUTO',
			style: { text: '3DNR\nAUTO', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_3d', options: { mode: '1' } }], up: [] }],
			feedbacks: [],
		},
		nr_3d_l1: {
			type: 'simple',
			name: '3DNR L1',
			style: { text: '3DNR\nL1', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_3d', options: { mode: '2' } }], up: [] }],
			feedbacks: [],
		},
		nr_3d_l2: {
			type: 'simple',
			name: '3DNR L2',
			style: { text: '3DNR\nL2', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_3d', options: { mode: '3' } }], up: [] }],
			feedbacks: [],
		},
		nr_3d_l3: {
			type: 'simple',
			name: '3DNR L3',
			style: { text: '3DNR\nL3', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_3d', options: { mode: '4' } }], up: [] }],
			feedbacks: [],
		},
		nr_3d_l4: {
			type: 'simple',
			name: '3DNR L4',
			style: { text: '3DNR\nL4', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_3d', options: { mode: '5' } }], up: [] }],
			feedbacks: [],
		},
		nr_3d_off: {
			type: 'simple',
			name: '3DNR OFF',
			style: { text: '3DNR\nOFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'nr_3d', options: { mode: '0' } }], up: [] }],
			feedbacks: [],
		},

		// ── Anti-Flicker ───────────────────────────────────────────
		flicker_off: {
			type: 'simple',
			name: 'Anti-Flicker OFF',
			style: { text: 'Anti-Flicker\nOFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'flicker_mode', options: { mode: '0' } }], up: [] }],
			feedbacks: [],
		},
		flicker_50hz: {
			type: 'simple',
			name: 'Anti-Flicker 50Hz',
			style: { text: 'Anti-Flicker\n50Hz', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'flicker_mode', options: { mode: '1' } }], up: [] }],
			feedbacks: [],
		},
		flicker_60hz: {
			type: 'simple',
			name: 'Anti-Flicker 60Hz',
			style: { text: 'Anti-Flicker\n60Hz', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'flicker_mode', options: { mode: '2' } }], up: [] }],
			feedbacks: [],
		},

		// ── Exposure Mode Status ────────────────────────────────────
		exposure_mode_status: {
			type: 'simple',
			name: 'Exposure Mode Status',
			style: {
				text: 'Exposure\n$(telycam-ptz-ip-camera:exposure_mode)',
				size: SZ,
				color: CLR_WHITE,
				bgcolor: BG_PURPLE,
			},
			steps: [],
			feedbacks: [],
		},

		// ── Exposure Mode ─────────────────────────────────────────
		expos_auto: makeExpPreset('Expos. Auto', 'full_auto'),
		expos_manual: makeExpPreset('Expos. Manual', 'manual'),
		shutter_pri: makeExpPreset('Shutter Pri.', 'shutter_priority'),
		iris_pri: makeExpPreset('Iris Pri.', 'iris_priority'),
		expos_bright: makeExpPreset('Bright', 'bright'),

		// ── Exposure Adjust ───────────────────────────────────────
		shutter_up: {
			type: 'simple',
			name: 'Shutter UP',
			style: { text: 'Shutter\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'shutter', options: { action: 'up', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		shutter_down: {
			type: 'simple',
			name: 'Shutter DOWN',
			style: { text: 'Shutter\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'shutter', options: { action: 'down', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		iris_up: {
			type: 'simple',
			name: 'Iris UP',
			style: { text: 'IRIS\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'iris', options: { action: 'up', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		iris_down: {
			type: 'simple',
			name: 'Iris DOWN',
			style: { text: 'IRIS\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'iris', options: { action: 'down', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		gain_up: {
			type: 'simple',
			name: 'Gain UP',
			style: { text: 'GAIN\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'gain', options: { action: 'up', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		gain_down: {
			type: 'simple',
			name: 'Gain DOWN',
			style: { text: 'GAIN\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'gain', options: { action: 'down', value: 0 } }], up: [] }],
			feedbacks: [],
		},
		ae_bright_up: {
			type: 'simple',
			name: 'AE Bright UP',
			style: { text: 'AE Bright\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'ae_bright', options: { action: 'up', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		ae_bright_down: {
			type: 'simple',
			name: 'AE Bright DOWN',
			style: { text: 'AE Bright\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'ae_bright', options: { action: 'down', value: 128 } }], up: [] }],
			feedbacks: [],
		},

		// ── White Balance ─────────────────────────────────────────

		// WB mode status display — shows current mode via variable
		wb_mode_status: {
			type: 'simple',
			name: 'WB Mode Status',
			style: { text: 'WB\n$(telycam-ptz-ip-camera:wb_mode)', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [],
			feedbacks: [],
		},

		// WB mode buttons with feedback — highlighted when active
		wb_auto: makeWbModePreset('WB Auto', 'auto'),
		wb_indoor: makeWbModePreset('WB Indoor', 'indoor'),
		wb_outdoor: makeWbModePreset('WB Outdoor', 'outdoor'),
		wb_onepush: makeWbModePreset('WB OnePush', 'onepush'),
		wb_atw: makeWbModePreset('WB ATW', 'atw'),
		wb_manual: makeWbModePreset('WB Manual', 'manual'),
		wb_temperature: makeWbModePreset('WB Temp', 'temperature'),

		one_push_wb: {
			type: 'simple',
			name: 'One Push WB',
			style: { text: 'One Push\nWB', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_onepush_trigger', options: {} }], up: [] }],
			feedbacks: [],
		},
		r_gain_up: {
			type: 'simple',
			name: 'R Gain UP',
			style: { text: 'R Gain\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_r_gain', options: { action: 'up', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		r_gain_down: {
			type: 'simple',
			name: 'R Gain DOWN',
			style: { text: 'R Gain\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_r_gain', options: { action: 'down', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		g_gain_up: {
			type: 'simple',
			name: 'G Gain UP',
			style: { text: 'G Gain\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_g_gain', options: { action: 'up', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		g_gain_down: {
			type: 'simple',
			name: 'G Gain DOWN',
			style: { text: 'G Gain\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_g_gain', options: { action: 'down', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		color_temp_up: {
			type: 'simple',
			name: 'Color Temp UP',
			style: { text: 'Color\nTemp UP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'color_temp_direct', options: { action: 'up', value: 5600 } }], up: [] }],
			feedbacks: [],
		},
		color_temp_down: {
			type: 'simple',
			name: 'Color Temp DOWN',
			style: { text: 'Color\nTemp DN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'color_temp_direct', options: { action: 'down', value: 5600 } }], up: [] }],
			feedbacks: [],
		},
		b_gain_up: {
			type: 'simple',
			name: 'B Gain UP',
			style: { text: 'B Gain\nUP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_b_gain', options: { action: 'up', value: 128 } }], up: [] }],
			feedbacks: [],
		},
		b_gain_down: {
			type: 'simple',
			name: 'B Gain DOWN',
			style: { text: 'B Gain\nDN', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'wb_b_gain', options: { action: 'down', value: 128 } }], up: [] }],
			feedbacks: [],
		},

		// ── Dig-Effect ────────────────────────────────────────────
		mirror_on: {
			type: 'simple',
			name: 'Mirror On',
			style: { text: 'MIRROR ON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'mirror', options: { action: 'on' } }], up: [] }],
			feedbacks: [],
		},
		mirror_off: {
			type: 'simple',
			name: 'Mirror Off',
			style: { text: 'MIRROR OFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'mirror', options: { action: 'off' } }], up: [] }],
			feedbacks: [],
		},
		flip_on: {
			type: 'simple',
			name: 'Flip On',
			style: { text: 'FLIP ON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'flip', options: { action: 'on' } }], up: [] }],
			feedbacks: [],
		},
		flip_off: {
			type: 'simple',
			name: 'Flip Off',
			style: { text: 'FLIP OFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'flip', options: { action: 'off' } }], up: [] }],
			feedbacks: [],
		},
		mirror_flip_on: {
			type: 'simple',
			name: 'Mirror+Flip On',
			style: { text: 'MIRROR+FLIP\nON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [
				{
					down: [
						{ actionId: 'mirror', options: { action: 'on' } },
						{ actionId: 'flip', options: { action: 'on' } },
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		mirror_flip_off: {
			type: 'simple',
			name: 'Mirror+Flip Off',
			style: { text: 'MIRROR+FLIP\nOFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [
				{
					down: [
						{ actionId: 'mirror', options: { action: 'off' } },
						{ actionId: 'flip', options: { action: 'off' } },
					],
					up: [],
				},
			],
			feedbacks: [],
		},

		// ── Auto Tracking ─────────────────────────────────────────
		tracking_on: {
			type: 'simple',
			name: 'Tracking ON',
			style: { text: 'Tracking ON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'tracking_onoff', options: { action: 'on' } }], up: [] }],
			feedbacks: [],
		},
		tracking_off: {
			type: 'simple',
			name: 'Tracking OFF',
			style: { text: 'Tracking OFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'tracking_onoff', options: { action: 'off' } }], up: [] }],
			feedbacks: [],
		},

		track_mode_only: makeTrackingModePreset('Tracking', '0'),
		track_mode_head: makeTrackingModePreset('Head\nFraming', '1'),
		track_mode_body: makeTrackingModePreset('Body\nFraming', '2'),

		track_pos_center: makeTrackingTargetPosPreset('Center', '0'),
		track_pos_left: makeTrackingTargetPosPreset('Left', '1'),
		track_pos_right: makeTrackingTargetPosPreset('Right', '2'),

		track_scale_full: makeTrackingTargetScalePreset('Full\nBody', '1'),
		track_scale_knee: makeTrackingTargetScalePreset('Above\nKnee', '2'),
		track_scale_waist: makeTrackingTargetScalePreset('Above\nWaist', '3'),
		track_scale_chest: makeTrackingTargetScalePreset('Above\nChest', '4'),

		tracking_tilt_on: makeTrackingTiltPreset('Enable\nTilt Lock', 'on'),
		tracking_tilt_off: makeTrackingTiltPreset('Disable\nTilt Lock', 'off'),

		track_lock_scaling_on: makeTrackingLockScalingPreset('Enable\nLock Scale', 'on'),
		track_lock_scaling_off: makeTrackingLockScalingPreset('Disable\nLock Scale', 'off'),

		track_switch_left: makeTrackingSwitchPreset('Switch\nLeft', 'left'),
		track_switch_right: makeTrackingSwitchPreset('Switch\nRight', 'right'),

		track_blackboard_on: makeTrackingBlackboardPreset('Enable\nBlackboard', 'on'),
		track_blackboard_off: makeTrackingBlackboardPreset('Disable\nBlackboard', 'off'),

		track_limit_on: makeTrackingLimitPreset('Enable\nPT Limit', 'on'),
		track_limit_off: makeTrackingLimitPreset('Disable\nPT Limit', 'off'),

		track_init0_call: makeTrackingInitPosPreset('Call\nInit 0', '2', '0'),
		track_init0_set: makeTrackingInitPosPreset('Set\nInit 0', '1', '0'),
		track_init0_del: makeTrackingInitPosPreset('Del\nInit 0', '3', '0'),

		track_init1_call: makeTrackingInitPosPreset('Call\nInit 1', '2', '1'),
		track_init1_set: makeTrackingInitPosPreset('Set\nInit 1', '1', '1'),
		track_init1_del: makeTrackingInitPosPreset('Del\nInit 1', '3', '1'),

		track_lim_lu_set: makeTrackingLimitPsetPreset('Set\nLU Lim', 'leftup', '1'),
		track_lim_lu_call: makeTrackingLimitPsetPreset('Call\nLU Lim', 'leftup', '2'),
		track_lim_lu_del: makeTrackingLimitPsetPreset('Del\nLU Lim', 'leftup', '3'),
		track_lim_rd_set: makeTrackingLimitPsetPreset('Set\nRD Lim', 'rightdown', '1'),
		track_lim_rd_call: makeTrackingLimitPsetPreset('Call\nRD Lim', 'rightdown', '2'),
		track_lim_rd_del: makeTrackingLimitPsetPreset('Del\nRD Lim', 'rightdown', '3'),

		track_board_pos1: makeTrackingBoardPosPreset('Call\nBoard 1', '1'),
		track_board_pos2: makeTrackingBoardPosPreset('Call\nBoard 2', '2'),

		track_set_board1: makeTrackingSetBoardPosPreset('Set\nBoard 1', '1'),
		track_set_board2: makeTrackingSetBoardPosPreset('Set\nBoard 2', '2'),

		track_del_board1: makeTrackingDelBoardPosPreset('Del\nBoard 1', '1'),
		track_del_board2: makeTrackingDelBoardPosPreset('Del\nBoard 2', '2'),

		track_timeout_1s: makeTrackingTimeoutPreset('TO 1s', '1'),
		track_timeout_3s: makeTrackingTimeoutPreset('TO 3s', '2'),
		track_timeout_5s: makeTrackingTimeoutPreset('TO 5s', '3'),
		track_timeout_10s: makeTrackingTimeoutPreset('TO 10s', '4'),

		// ── System ────────────────────────────────────────────────
		wake_up: {
			type: 'simple',
			name: 'Wake Up',
			style: { text: 'WAKE', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'sleep', options: { action: 'awake' } }], up: [] }],
			feedbacks: [],
		},
		enter_sleep: {
			type: 'simple',
			name: 'Enter Sleep',
			style: { text: 'SLEEP', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'sleep', options: { action: 'sleep' } }], up: [] }],
			feedbacks: [],
		},
		tally_off: {
			type: 'simple',
			name: 'Tally OFF',
			style: { text: 'Tally OFF', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'tally_control', options: { mode: '0' } }], up: [] }],
			feedbacks: [],
		},
		tally_red_on: {
			type: 'simple',
			name: 'Tally Red',
			style: { text: 'Tally\nRed ON', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'tally_control', options: { mode: '1' } }], up: [] }],
			feedbacks: [],
		},
		tally_green_on: {
			type: 'simple',
			name: 'Tally Green',
			style: { text: 'Tally\nGreen', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'tally_control', options: { mode: '3' } }], up: [] }],
			feedbacks: [],
		},

		// ── Day/Night (IR Cut) ─────────────────────────────────────
		ir_cut_day: {
			type: 'simple',
			name: 'Day Mode',
			style: { text: 'Day', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'ir_cutter', options: { mode: 'day' } }], up: [] }],
			feedbacks: [],
		},
		ir_cut_night: {
			type: 'simple',
			name: 'Night Mode',
			style: { text: 'Night', size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
			steps: [{ down: [{ actionId: 'ir_cutter', options: { mode: 'night' } }], up: [] }],
			feedbacks: [],
		},
	}

	self.setPresetDefinitions(structure, presets as any)
}

/** PTZ direction button — arrow label, purple background */
function makePtzPreset(text: string, direction: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'PTZ ' + direction,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [
			{
				down: [{ actionId: 'ptz_move', options: { direction, pan_speed: 18, tilt_speed: 18 } }],
				up: [{ actionId: 'ptz_stop', options: {} }],
			},
		],
		feedbacks: [],
	}
}

/** Tracking pan/tilt limit settings button */
function makeTrackingLimitPreset(text: string, action: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Tracking PT Limit: ' + (action === 'on' ? 'Enable' : 'Disable'),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_limit_settings', options: { action } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking initial position button */
function makeTrackingInitPosPreset(text: string, action: string, pos: string): CompanionPresetDefinitions[string] {
	let bgcolor = BG_PURPLE
	if (action === '1') bgcolor = BG_ORANGE
	if (action === '3') bgcolor = BG_RED

	return {
		type: 'simple',
		name: 'Tracking Initial Position: ' + text,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor },
		steps: [
			{
				down: [
					{
						actionId:
							action === '1'
								? 'tracking_set_initial_position'
								: action === '2'
									? 'tracking_initial_position'
									: 'tracking_delete_initial_position',
						options: { pos },
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
}

/** Tracking board position button */
function makeTrackingBoardPosPreset(text: string, position: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Call Board Position: ' + position,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_board_position', options: { position } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking P/T limit preset button */
function makeTrackingLimitPsetPreset(text: string, type: string, action: string): CompanionPresetDefinitions[string] {
	let bgcolor = BG_PURPLE
	if (action === '1') bgcolor = BG_ORANGE
	if (action === '3') bgcolor = BG_RED

	return {
		type: 'simple',
		name: 'Tracking Limit: ' + text,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor },
		steps: [{ down: [{ actionId: 'tracking_limit_preset', options: { type, action } }], up: [] }],
		feedbacks: [],
	}
}

function makeTrackingSetBoardPosPreset(text: string, position: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Set Board Position: ' + position,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_ORANGE },
		steps: [{ down: [{ actionId: 'tracking_set_board_position', options: { position } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking delete board position button */
function makeTrackingDelBoardPosPreset(text: string, position: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Delete Board Position: ' + position,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_RED },
		steps: [{ down: [{ actionId: 'tracking_delete_board_position', options: { position } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking blackboard area detect button */
function makeTrackingBlackboardPreset(text: string, action: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Tracking Blackboard: ' + (action === 'on' ? 'Enable' : 'Disable'),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_blackboard', options: { action } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking switch target button */
function makeTrackingSwitchPreset(text: string, direction: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Tracking Switch: ' + direction.toUpperCase(),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_switch_target', options: { direction } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking lock scaling ratio button */
function makeTrackingLockScalingPreset(text: string, action: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Tracking Lock Scaling: ' + (action === 'on' ? 'Enable' : 'Disable'),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_lock_scaling', options: { action } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking tilt lock button */
function makeTrackingTiltPreset(text: string, action: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Tracking Tilt Lock: ' + (action === 'on' ? 'Enable' : 'Disable'),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_tilt_lock', options: { action } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking target lost timeout button */
function makeTrackingTimeoutPreset(text: string, mode: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Target Lost Timeout: ' + text,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_lost_timeout', options: { mode } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking target position button */
function makeTrackingTargetPosPreset(text: string, mode: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Target Position: ' + text,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_target_position', options: { mode } }], up: [] }],
		feedbacks: [],
	}
}

/** Tracking target scaling button */
function makeTrackingTargetScalePreset(text: string, mode: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Target Scaling: ' + text.replace('\n', ' '),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_target_scaling', options: { mode } }], up: [] }],
		feedbacks: [],
	}
}

/** Exposure mode button — short label, purple background */
function makeExpPreset(text: string, mode: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'EXP ' + mode,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'set_exposure_mode', options: { mode } }], up: [] }],
		feedbacks: [],
	}
}

/** WB mode button — with feedback highlight when active */
function makeWbModePreset(text: string, mode: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'WB ' + mode,
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'set_white_balance', options: { mode } }], up: [] }],
		feedbacks: [
			{
				feedbackId: 'wb_mode_feedback',
				options: { mode },
				style: { bgcolor: BG_PURPLE, color: 0xffffff },
			},
		],
	}
}

/** Tracking mode button — short label, purple background */
function makeTrackingModePreset(text: string, mode: string): CompanionPresetDefinitions[string] {
	return {
		type: 'simple',
		name: 'Tracking Mode: ' + text.replace('\n', ' '),
		style: { text, size: SZ, color: CLR_WHITE, bgcolor: BG_PURPLE },
		steps: [{ down: [{ actionId: 'tracking_mode', options: { mode } }], up: [] }],
		feedbacks: [],
	}
}
