/**
 * UTC offset of the device as a string matching UTC_OPTIONS values
 * (e.g. "5" for UTC+5). Clamped to [-12, 12].
 */
export const getDeviceUtcOffset = (): string => {
	const offset = Math.round(-new Date().getTimezoneOffset() / 60);
	return String(Math.min(12, Math.max(-12, offset)));
};

export const useDeviceUtcOffset = (): string => getDeviceUtcOffset();
