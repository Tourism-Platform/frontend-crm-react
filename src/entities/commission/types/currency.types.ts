export const ENUM_CURRENCY_OPTIONS = {
	USD: "USD",
	EUR: "EUR"
} as const;

export type ENUM_CURRENCY_OPTIONS_TYPE =
	(typeof ENUM_CURRENCY_OPTIONS)[keyof typeof ENUM_CURRENCY_OPTIONS];
