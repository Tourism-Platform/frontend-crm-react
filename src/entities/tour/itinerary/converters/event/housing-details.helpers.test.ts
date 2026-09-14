import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";
import type { HousingDetailsOutput } from "@/shared/api";

import { isInheritedHousingDetails } from "./housing-details.helpers";

const WHOLE_SPEC: HousingDetailsOutput["spec"] = {
	pricing: "whole",
	images: [],
	name: null,
	location: null,
	stars: null,
	typs: [],
	amenities: [],
	policy: null,
	price: {
		base: {
			typ: "fixed",
			cost: { val: 0, currency: Currency.USD },
			fees: null,
			extra_costs: [],
			markup: null
		},
		seasons: []
	},
	categories: []
};

describe("isInheritedHousingDetails", () => {
	it("is true when supply.source is product", () => {
		expect(
			isInheritedHousingDetails({
				plan: {},
				supply: {
					source: "product",
					product_id: "b0c1c0de-0000-0000-0000-000000000001",
					supplier: { id: "s1", name: "S" },
					scope: { typ: "all" },
					override: null
				},
				spec: WHOLE_SPEC
			})
		).toBe(true);
	});

	it("is false for inline supply", () => {
		expect(
			isInheritedHousingDetails({
				plan: { duration: 2 },
				supply: { source: "inline", supplier_id: null },
				spec: WHOLE_SPEC
			})
		).toBe(false);
	});
});
