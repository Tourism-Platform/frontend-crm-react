export const toTimezoneOffset = (
	timezone?: string | null
): number | undefined => (timezone ? Number(timezone) : undefined);
