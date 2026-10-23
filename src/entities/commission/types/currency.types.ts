import type { Currency } from "@/shared/api";
import type { TAssertNever } from "@/shared/types";

export const ENUM_CURRENCY_OPTIONS = {
	UZS: "UZS",
	USD: "USD",
	EUR: "EUR",
	RUB: "RUB",
	GBP: "GBP",
	CNY: "CNY"
} as const;

export type ENUM_CURRENCY_OPTIONS_TYPE =
	(typeof ENUM_CURRENCY_OPTIONS)[keyof typeof ENUM_CURRENCY_OPTIONS];

// Бэк добавил валюту, а фронт о ней не знает — ошибка компиляции
export type TCurrencyCoverage = TAssertNever<
	Exclude<`${Currency}`, ENUM_CURRENCY_OPTIONS_TYPE>
>;

export const DEFAULT_EVENT_CURRENCY = ENUM_CURRENCY_OPTIONS.USD;
