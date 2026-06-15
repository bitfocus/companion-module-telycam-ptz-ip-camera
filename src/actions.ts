import type ModuleInstance from './main.js'
import { createAllActions, type ActionsSchema } from './actions/index.js'

export type { ActionsSchema }

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions(createAllActions(self) as any)
}
