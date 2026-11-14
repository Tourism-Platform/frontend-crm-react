// @vitest-environment node
import { describe, expect, it } from "vitest";

import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

import { getCheapestOptionPrice } from "./get-cheapest-option-price";

const option = (
	id: string,
	price: string,
	priceValue: number | null
): IPreviewOptionCard => ({
	id,
	title: id,
	description: "",
	price,
	priceValue,
	totalPrice: "",
	image: ""
});

describe("getCheapestOptionPrice", () => {
	it("returns the price of the option with the lowest value", () => {
		expect(
			getCheapestOptionPrice([
				option("comfort", "$700.00", 700),
				option("standard", "$500.50 - $4,290.00", 500.5),
				option("lux", "$1,200.00", 1200)
			])
		).toBe("$500.50 - $4,290.00");
	});

	it("skips options without a price", () => {
		expect(
			getCheapestOptionPrice([
				option("draft", "", null),
				option("standard", "$900.00", 900)
			])
		).toBe("$900.00");
	});

	it("returns an empty string when no option has a price", () => {
		expect(getCheapestOptionPrice([option("draft", "", null)])).toBe("");
		expect(getCheapestOptionPrice([])).toBe("");
	});
});
