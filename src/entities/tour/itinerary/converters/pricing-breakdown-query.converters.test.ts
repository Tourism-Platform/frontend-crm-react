import { describe, expect, it } from "vitest";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import { mapPricingBreakdownQueryToBackend } from "./pricing-review.converters";

const BASE = { tourId: "tour", optionId: "option" };

describe("mapPricingBreakdownQueryToBackend", () => {
	it("sends no params when they are empty", () => {
		expect(
			mapPricingBreakdownQueryToBackend({
				...BASE,
				date: null,
				pax: null
			})
		).toEqual({});
	});

	it("maps currency, date and pax", () => {
		expect(
			mapPricingBreakdownQueryToBackend({
				...BASE,
				currency: ENUM_CURRENCY_BACKEND.USD,
				date: "2026-11-01",
				pax: 12
			})
		).toEqual({
			currency: ENUM_CURRENCY_BACKEND.USD,
			date: "2026-11-01",
			pax: 12
		});
	});

	it("drops non-positive pax", () => {
		expect(
			mapPricingBreakdownQueryToBackend({ ...BASE, pax: 0 })
		).not.toHaveProperty("pax");
	});
});
