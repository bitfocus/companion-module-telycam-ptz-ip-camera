import type ModuleInstance from './main.js'

export type FeedbacksSchema = {
	wb_mode_feedback: {
		type: 'boolean'
		options: {
			mode: string
		}
	}
	exposure_mode_feedback: {
		type: 'boolean'
		options: {
			mode: string
		}
	}
	focus_mode_feedback: {
		type: 'boolean'
		options: {
			mode: string
		}
	}
}

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		wb_mode_feedback: {
			name: 'WB Mode Indicator',
			type: 'boolean',
			defaultStyle: {
				bgcolor: 0x006400,
				color: 0xffffff,
			},
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
			callback: (feedback) => {
				const currentMode = self.getVariableValue('wb_mode')
				return currentMode === feedback.options.mode
			},
		},

		exposure_mode_feedback: {
			name: 'Exposure Mode Indicator',
			type: 'boolean',
			defaultStyle: {
				bgcolor: 0x4682b4,
				color: 0xffffff,
			},
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
			callback: (feedback) => {
				const currentMode = self.getVariableValue('exposure_mode')
				return currentMode === feedback.options.mode
			},
		},

		focus_mode_feedback: {
			name: 'Focus Mode Indicator',
			type: 'boolean',
			defaultStyle: {
				bgcolor: 0x2e8b57,
				color: 0xffffff,
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Focus Mode',
					choices: [
						{ id: 'auto', label: 'Auto' },
						{ id: 'manual', label: 'Manual' },
					],
					default: 'auto',
				},
			],
			callback: (feedback) => {
				const currentMode = self.getVariableValue('focus_mode')
				return currentMode === feedback.options.mode
			},
		},
	})
}
