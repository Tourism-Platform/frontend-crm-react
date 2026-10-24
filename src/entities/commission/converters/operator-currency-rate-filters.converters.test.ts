import { describe, expect, it } from "vitest";

import { ENUM_CURRENCY_BACKEND, ENUM_CURRENCY_OPTIONS } from "../types";

import {
	filterOperatorCurrencyRates,
	mapOperatorCurrencyRateListToFrontend
} from "./operator-currency-rate.converters";

const RATES = mapOperatorCurrencyRateListToFrontend([
	{
		from_currency: ENUM_CURRENCY_BACKEND.USD,
		to_currency: ENUM_CURRENCY_BACKEND.UZS,
		rate: "12650",
		rate_with_margin: "12900",
		rate_date: "2026-10-01"
	},
	{
		from_currency: ENUM_CURRENCY_BACKEND.EUR,
		to_currency: ENUM_CURRENCY_BACKEND.UZS,
		rate: "13700",
		rate_with_margin: "13950",
		rate_date: null
	},
	{
		from_currency: ENUM_CURRENCY_BACKEND.USD,
		to_currency: ENUM_CURRENCY_BACKEND.EUR,
		rate: "0.92",
		rate_with_margin: "0.94",
		rate_date: null
	}
]);

describe("mapOperatorCurrencyRateListToFrontend", () => {
	it("maps backend strings to numbers and builds row id", () => {
		expect(RATES[0]).toEqual({
			id: "USD-UZS",
			from_currency: ENUM_CURRENCY_OPTIONS.USD,
			to_currency: ENUM_CURRENCY_OPTIONS.UZS,
			rate: 12650,
			rate_with_margin: 12900,
			rate_date: "2026-10-01"
		});
	});
});

describe("filterOperatorCurrencyRates", () => {
	it("returns everything when filters are empty", () => {
		const result = filterOperatorCurrencyRates(RATES, {
			page: 1,
			limit: 5
		});

		expect(result.total).toBe(3);
		expect(result.data).toHaveLength(3);
	});

	it("filters by source currency", () => {
		expect(
			filterOperatorCurrencyRates(RATES, {
				page: 1,
				limit: 5,
				fromCurrency: ENUM_CURRENCY_OPTIONS.USD
			}).total
		).toBe(2);
	});

	it("paginates after filtering", () => {
		const result = filterOperatorCurrencyRates(RATES, {
			page: 2,
			limit: 2
		});

		expect(result.total).toBe(3);
		expect(result.data.map((rate) => rate.id)).toEqual(["USD-EUR"]);
	});
});
