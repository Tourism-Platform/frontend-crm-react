import { Currency } from "@/shared/api";

import type { TOperatorCurrencyRateBackend } from "../types/operator-currency-rate-backend.interface";

/**
 * Совпадает с OPERATOR_FINANCIAL_MOCK: default_currency USD, accepted [USD, EUR, UZS],
 * fx_margin 0.02 — по строке на каждую принятую валюту, кроме default_currency
 */
export const CURRENCY_MOCK: TOperatorCurrencyRateBackend[] = [
	{
		from_currency: Currency.EUR,
		to_currency: Currency.USD,
		rate: "1.08",
		rate_with_margin: "1.1016",
		rate_date: "2026-01-01"
	},
	{
		from_currency: Currency.UZS,
		to_currency: Currency.USD,
		rate: "0.000079",
		rate_with_margin: "0.00008058",
		rate_date: null
	}
];
