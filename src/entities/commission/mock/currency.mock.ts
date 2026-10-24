import { ENUM_CURRENCY_BACKEND } from "../types";
import type { TOperatorCurrencyRateBackend } from "../types/operator-currency-rate-backend.interface";

export const CURRENCY_MOCK: TOperatorCurrencyRateBackend[] = [
	{
		from_currency: ENUM_CURRENCY_BACKEND.EUR,
		to_currency: ENUM_CURRENCY_BACKEND.USD,
		rate: "1.08",
		rate_with_margin: "1.1016",
		rate_date: "2026-01-01"
	},
	{
		from_currency: ENUM_CURRENCY_BACKEND.UZS,
		to_currency: ENUM_CURRENCY_BACKEND.USD,
		rate: "0.000079",
		rate_with_margin: "0.00008058",
		rate_date: null
	}
];
