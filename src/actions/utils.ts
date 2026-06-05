import type ModuleInstance from '../main.js'

/**
 * 鏁板瓧杞?2 浣嶅崄鍏�繘鍒讹紙灏忕�搴忓崟瀛楄妭锛?
 */
export function toHex(val: number): string {
	const hex = val.toString(16)
	return hex.padStart(2, '0')
}

/**
 * 鏁板瓧杞?N 浣嶅崄鍏�繘鍒跺瓧绗︿覆锛堟瘡涓�瓧鑺傚崰 2 瀛楃�锛?
 * 渚嬪�: toHexN(0x1234, 4) => '1234'
 */
export function toHexN(val: number, digits: number): string {
	return val.toString(16).padStart(digits, '0')
}

/**
 * 灏?16 浣嶆湁绗﹀彿鏁存暟鎷嗕负 4 涓�崐瀛楄妭 hex 瀛楃� (VISCA pqrs 鏍煎紡)
 * 渚嬪�: -100 鈫?0xFF9C 鈫?'FF9C' 鈫?'0F 0F 09 0C'
 */
export function int16ToVisca(val: number): string {
	const unsigned = val & 0xffff
	const hex = unsigned.toString(16).padStart(4, '0').toUpperCase()
	return `${hex[0]}${hex[1]} ${hex[2]}${hex[3]}`
}

/**
 * 灏?16 浣嶆棤绗﹀彿鏁存暟鎷嗕负 VISCA 4-nibble 鏍煎紡: 0p 0q 0r 0s
 */
export function uint16ToViscaNibbles(val: number): string {
	const hex = val.toString(16).padStart(4, '0').toUpperCase()
	return `0${hex[0]} 0${hex[1]} 0${hex[2]} 0${hex[3]}`
}

/**
 * 将 0-255 值转换为 VISCA 双字节格式: 0p0q (4个hex字符)
 * 例如: 8 → "0008", 15 → "000F", 128 → "0800"
 */
export function toViscaByte(val: number): string {
	const high = (val >> 4) & 0x0f
	const low = val & 0x0f
	return `0${toHex(high).slice(-1)}0${toHex(low).slice(-1)}`
}

/**
 * 鍙戦€?VISCA 鍗佸叚杩涘埗鎸囦护锛堣嚜鍔ㄨ繃婊ょ┖鏍硷級
 */
export function sendVisca(self: ModuleInstance, hexString: string): void {
	self.sendViscaCommand(hexString)
}

/**
 * 銆怘TTP CGI GET銆戝彂閫?HTTP 鎺у埗鎸囦护
 */
export async function sendHttpJson(self: ModuleInstance, payload: Record<string, unknown>): Promise<void> {
	const host = self.config.host
	const port = self.config.httpPort || '80'
	if (!host) return

	const path = `/cgi-bin/web.fcgi?func=set${JSON.stringify(payload)}`
	const url = `http://${host}:${port}${encodeURI(path)}`

	self.log('info', `[HTTP] 鍙戦€佹寚浠? ${url}`)

	try {
		const response = await fetch(url, { method: 'GET' })
		const responseText = await response.text()
		self.log('debug', `[HTTP] 鍝嶅簲: ${responseText}`)

		if (!response.ok) {
			self.log('warn', `[HTTP] 澶辫触锛岀姸鎬佺爜: ${response.status}`)
		}
	} catch (e: any) {
		self.log('error', `[HTTP] 寮傚父: ${e.message}`)
	}
}
