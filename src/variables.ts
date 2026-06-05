import type ModuleInstance from './main.js'

export type VariablesSchema = {
	wb_mode: string | undefined
	exposure_mode: string | undefined
	focus_mode: string | undefined
	device_name: string | undefined
}

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions({
		wb_mode: {
			name: 'Current WB Mode',
		},
		exposure_mode: {
			name: 'Current Exposure Mode',
		},
		focus_mode: {
			name: 'Current Focus Mode',
		},
		device_name: {
			name: 'Device Name',
		},
	})
}
