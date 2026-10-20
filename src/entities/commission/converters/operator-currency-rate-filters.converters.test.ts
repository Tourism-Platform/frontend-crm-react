import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";

import { ENUM_CURRENCY_OPTIONS } from "../types";

import { mapOperatorCurrencyRateFiltersToBackend } from "./operator-currency-rate.converters";

describe("mapOperatorCurrencyRateFiltersToBackend", () => {
	it("sends no currencies when they are empty", () => {
		const query = mapOperatorCurrencyRateFiltersToBackend({
			page: 1,
			limit: 5
		});

		expect(query).not.toHaveProperty("from_currency");
		expect(query).not.toHaveProperty("to_currency");
	});

	it("maps the currency pair", () => {
		expect(
			mapOperatorCurrencyRateFiltersToBackend({
				page: 1,
				limit: 5,
				fromCurrency: ENUM_CURRENCY_OPTIONS.USD,
				toCurrency: ENUM_CURRENCY_OPTIONS.UZS
			})
		).toMatchObject({
			from_currency: Currency.USD,
			to_currency: Currency.UZS
		});
	});
});
