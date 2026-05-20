export const ENUM_CURRENCY_OPTIONS = {
	UZS: "UZS",
	USD: "USD",
	EUR: "EUR",
	RUB: "RUB",
	GBP: "GBP"
} as const;

export type ENUM_CURRENCY_OPTIONS_TYPE =
	(typeof ENUM_CURRENCY_OPTIONS)[keyof typeof ENUM_CURRENCY_OPTIONS];
