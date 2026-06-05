import type { CompanionActionDefinitions } from '@companion-module/base'
import type ModuleInstance from '../main.js'

export function createHttpActions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		custom_http_cgi: {
			name: 'HTTP: Send Custom CGI Command',
			options: [
				{
					id: 'path',
					type: 'textinput',
					label: 'CGI Path (e.g. /cgi-bin/reboot)',
					default: '',
				},
			],
			callback: async (event) => {
				const path = event.options.path as string
				if (!path) return

				const host = self.config.host
				const port = self.config.httpPort || '80'
				if (!host) return

				const url = `http://${host}:${port}${path.startsWith('/') ? '' : '/'}${path}`

				try {
					const headers: Record<string, string> = {}
					if (self.config.authType === 'basic' && self.config.username && self.config.password) {
						const auth = Buffer.from(`${self.config.username}:${self.config.password}`).toString('base64')
						headers['Authorization'] = `Basic ${auth}`
					}

					const response = await fetch(url, { headers })
					if (response.ok) {
						self.log('info', `HTTP CGI success: ${path}`)
					} else {
						self.log('warn', `HTTP CGI failed, status: ${response.status}`)
					}
				} catch (e: any) {
					self.log('error', `HTTP CGI exception: ${e.message}`)
				}
			},
		},
	}
}
