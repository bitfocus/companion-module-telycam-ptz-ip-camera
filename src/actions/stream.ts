import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'
import { toHex } from './utils.js'

export function createStreamActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		mainstream_encode: {
			name: 'Stream: Main Encode Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Encode Mode',
					choices: [
						{ id: '0', label: 'H.264' },
						{ id: '1', label: 'H.265' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104C20200${mode}FF`)
			},
		},

		mainstream_framerate: {
			name: 'Stream: Main Frame Rate',
			options: [
				{
					id: 'fps',
					type: 'number',
					label: 'Frame Rate (15-60)',
					default: 60,
					min: 15,
					max: 60,
				},
			],
			callback: async (event) => {
				const fps = Number(event.options.fps ?? 60)
				self.sendViscaCommand(`810104C2030${toHex(fps >> 4)}0${toHex(fps & 0x0f)}FF`)
			},
		},

		mainstream_bitrate_control: {
			name: 'Stream: Main Bitrate Control',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Bitrate Control',
					choices: [
						{ id: '0', label: 'CBR' },
						{ id: '1', label: 'VBR' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104C2050${mode}0FF`)
			},
		},

		substream_encode: {
			name: 'Stream: Sub Encode Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Encode Mode',
					choices: [
						{ id: '0', label: 'H.264' },
						{ id: '1', label: 'H.265' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104C30200${mode}FF`)
			},
		},

		substream_framerate: {
			name: 'Stream: Sub Frame Rate',
			options: [
				{
					id: 'fps',
					type: 'number',
					label: 'Frame Rate (15-60)',
					default: 60,
					min: 15,
					max: 60,
				},
			],
			callback: async (event) => {
				const fps = Number(event.options.fps ?? 60)
				self.sendViscaCommand(`810104C3030${toHex(fps >> 4)}0${toHex(fps & 0x0f)}FF`)
			},
		},

		substream_bitrate_control: {
			name: 'Stream: Sub Bitrate Control',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Bitrate Control',
					choices: [
						{ id: '0', label: 'CBR' },
						{ id: '1', label: 'VBR' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const mode = event.options.mode as string
				self.sendViscaCommand(`810104C3050${mode}0FF`)
			},
		},
	}
}
