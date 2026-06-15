export function toHex(val: number): string {
	const hex = val.toString(16)
	return hex.padStart(2, '0')
}

export function toHexN(val: number, digits: number): string {
	return val.toString(16).padStart(digits, '0')
}

export function uint16ToViscaNibbles(val: number): string {
	const hex = val.toString(16).padStart(4, '0').toUpperCase()
	return `0${hex[0]} 0${hex[1]} 0${hex[2]} 0${hex[3]}`
}

export function toViscaByte(val: number): string {
	const high = (val >> 4) & 0x0f
	const low = val & 0x0f
	return `0${toHex(high).slice(-1)}0${toHex(low).slice(-1)}`
}
