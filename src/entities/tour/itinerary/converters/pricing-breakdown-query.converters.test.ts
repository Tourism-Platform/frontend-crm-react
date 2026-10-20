import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";

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
				currency: Currency.USD,
				date: "2026-11-01",
				pax: 12
			})
		).toEqual({ currency: Currency.USD, date: "2026-11-01", pax: 12 });
	});

	it("drops non-positive pax", () => {
		expect(
			mapPricingBreakdownQueryToBackend({ ...BASE, pax: 0 })
		).not.toHaveProperty("pax");
	});
});
