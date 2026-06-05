import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { createPtzActions } from './ptz.js'
import { createZoomActions } from './zoom.js'
import { createFocusActions } from './focus.js'
import { createPresetActions } from './preset.js'
import { createImageActions } from './image.js'
import { createSystemActions } from './system.js'
import { createHttpActions } from './http.js'
import { createTallyActions } from './tally.js'

/**
 * 汇总所有子模块的动作定义
 */
export function createAllActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		...createPtzActions(self),
		...createZoomActions(self),
		...createFocusActions(self),
		...createPresetActions(self),
		...createImageActions(self),
		...createSystemActions(self),
		...createHttpActions(self),
		...createTallyActions(self),
	}
}

/**
 * ActionsSchema — 满足 InstanceTypes.actions 的 Record<string, CompanionActionSchema> 约束
 * 每个 action 的 options 类型需手动声明，以便框架在 preset/feedback 中提供 actionId 类型提示
 */
export type ActionsSchema = {
	// PTZ
	ptz_move: { options: { direction: string; pan_speed: number; tilt_speed: number } }
	ptz_stop: { options: Record<string, never> }
	ptz_home: { options: Record<string, never> }
	ptz_reset: { options: Record<string, never> }
	ptz_absolute_position: { options: { pan_speed: number; tilt_speed: number; pan_pos: number; tilt_pos: number } }
	ptz_relative_position: { options: { pan_speed: number; tilt_speed: number; pan_offset: number; tilt_offset: number } }
	ptz_speed: { options: { pt_speed: number } }
	// Zoom
	zoom: { options: { action: string; speed: number } }
	zoom_direct: { options: { position: number } }
	zoom_direct_with_speed: { options: { speed: number; position: number } }
	dzoom: { options: { action: string } }
	dzoom_stop: { options: Record<string, never> }
	zoom_speed: { options: { speed: number } }
	// Focus
	focus_mode: { options: { mode: string } }
	focus_one_push: { options: Record<string, never> }
	focus_far_near: { options: { action: string; speed: number } }
	focus_direct: { options: { position: number } }
	zoom_focus_direct: { options: { zoom_pos: number; focus_pos: number } }
	// Preset
	preset: { options: { action: string; preset_num: number } }
	preset_high: { options: { action: string; preset_num: number } }
	preset_speed: { options: { speed: number } }
	preset_zoom_speed: { options: { speed: number } }
	preset_speed_adj: { options: { direction: string } }
	freeze: { options: { action: string } }
	preset_freeze: { options: { action: string } }
	// Image
	set_white_balance: { options: { mode: string } }
	wb_onepush_trigger: { options: Record<string, never> }
	wb_r_gain: { options: { action: string; value: number } }
	wb_g_gain: { options: { action: string; value: number } }
	wb_b_gain: { options: { action: string; value: number } }
	set_exposure_mode: { options: { mode: string } }
	shutter: { options: { action: string; value: number } }
	iris: { options: { action: string; value: number } }
	gain: { options: { action: string; value: number } }
	ae_bright: { options: { action: string; value: number } }
	image_bright: { options: { action: string; value: number } }
	sharpness: { options: { action: string; value: number } }
	saturation: { options: { action: string; value: number } }
	contrast: { options: { action: string; value: number } }
	gamma: { options: { action: string; value: number } }
	wdr: { options: { action: string } }
	wdr_level: { options: { action: string; value: number } }
	backlight: { options: { action: string } }
	flip: { options: { action: string } }
	mirror: { options: { action: string } }
	nr_2d: { options: { action: string } }
	nr_3d: { options: { mode: string } }
	color_temp_direct: { options: { action: string; value: number } }
	flicker_mode: { options: { mode: string } }
	// System
	sleep: { options: { action: string } }
	web_reset: { options: { mode: string } }
	tracking_mode: { options: { mode: string } }
	tracking_onoff: { options: { action: string } }
	tracking_tilt_lock: { options: { action: string } }
	tracking_lock_scaling: { options: { action: string } }
	tracking_blackboard: { options: { action: string } }
	tracking_limit_settings: { options: { action: string } }
	tracking_target_position: { options: { mode: string } }
	tracking_target_scaling: { options: { mode: string } }
	tracking_lost_timeout: { options: { mode: string } }
	tracking_switch_target: { options: { direction: string } }
	tracking_initial_position: { options: { pos: string } }
	tracking_set_initial_position: { options: { pos: string } }
	tracking_delete_initial_position: { options: { pos: string } }
	tracking_board_position: { options: { position: string } }
	tracking_set_board_position: { options: { position: string } }
	tracking_delete_board_position: { options: { position: string } }
	tracking_limit_preset: { options: { type: string; action: string } }
	nd_filter: { options: { mode: string } }
	ir_cutter: { options: { mode: string } }
	speed_by_zoom: { options: { action: string } }
	// HTTP
	custom_http_cgi: { options: { path: string } }
	// Tally
	tally_brightness: { options: { brightness: string } }
	tally_control: { options: { mode: string } }
}
