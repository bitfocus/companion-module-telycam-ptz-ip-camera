/**
 * Actions 桶文件
 * 所有动作定义已拆分到 src/actions/ 目录下的子模块中
 */
import type ModuleInstance from './main.js'
import { createAllActions, type ActionsSchema } from './actions/index.js'

export type { ActionsSchema }

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions(createAllActions(self) as any)
}
