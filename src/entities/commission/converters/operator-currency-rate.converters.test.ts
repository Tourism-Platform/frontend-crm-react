import { describe, expect, it } from "vitest";

import {
	ENUM_CURRENCY_BACKEND,
	ENUM_CURRENCY_OPTIONS,
	ENUM_OPERATOR_CURRENCY_RATE_SCOPE
} from "../types";

import {
	mapOperatorCurrencyRateListToFrontend,
	mapOperatorCurrencyRateQueryToBackend,
	paginateOperatorCurrencyRates
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

describe("mapOperatorCurrencyRateQueryToBackend", () => {
	it("omits empty filters", () => {
		expect(
			mapOperatorCurrencyRateQueryToBackend({ fromCurrency: [] })
		).toEqual({});
	});

	it("maps currencies and scope to backend query", () => {
		expect(
			mapOperatorCurrencyRateQueryToBackend({
				fromCurrency: [
					ENUM_CURRENCY_OPTIONS.USD,
					ENUM_CURRENCY_OPTIONS.EUR
				],
				toCurrency: [ENUM_CURRENCY_OPTIONS.UZS],
				scope: ENUM_OPERATOR_CURRENCY_RATE_SCOPE.ACCEPTED
			})
		).toEqual({
			from_currency: [
				ENUM_CURRENCY_BACKEND.USD,
				ENUM_CURRENCY_BACKEND.EUR
			],
			to_currency: [ENUM_CURRENCY_BACKEND.UZS],
			scope: ENUM_OPERATOR_CURRENCY_RATE_SCOPE.ACCEPTED
		});
	});
});

describe("paginateOperatorCurrencyRates", () => {
	it("returns everything on a page bigger than the list", () => {
		const result = paginateOperatorCurrencyRates(RATES, {
			page: 1,
			limit: 5
		});

		expect(result.total).toBe(3);
		expect(result.data).toHaveLength(3);
	});

	it("slices the requested page", () => {
		const result = paginateOperatorCurrencyRates(RATES, {
			page: 2,
			limit: 2
		});

		expect(result.total).toBe(3);
		expect(result.data.map((rate) => rate.id)).toEqual(["USD-EUR"]);
	});
});
