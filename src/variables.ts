import type ModuleInstance from './main.js'

export type VariablesSchema = {
	wb_mode: string | undefined
	exposure_mode: string | undefined
	focus_mode: string | undefined
	brightness: number | undefined
	sharpness: number | undefined
	contrast: number | undefined
	saturation: number | undefined
	gamma: number | undefined
	wdr_level: number | undefined
	color_temp: number | undefined
}

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions({
		wb_mode: { name: 'White Balance Mode' },
		exposure_mode: { name: 'Exposure Mode' },
		focus_mode: { name: 'Focus Mode' },
		brightness: { name: 'Current Brightness Value' },
		sharpness: { name: 'Current Sharpness Value' },
		contrast: { name: 'Current Contrast Value' },
		saturation: { name: 'Current Saturation Value' },
		gamma: { name: 'Current Gamma Value' },
		wdr_level: { name: 'Current WDR Level' },
		color_temp: { name: 'Current Color Temperature' },
	})
}
