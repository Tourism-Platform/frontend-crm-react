import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";
import type { HousingDetailsOutput } from "@/shared/api";

import { isInheritedHousingDetails } from "./housing-details.helpers";

const WHOLE_SPEC: HousingDetailsOutput["pool"][number]["spec"] = {
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

const member = (
	source: "product" | "inline"
): HousingDetailsOutput["pool"][number] => ({
	id: "11111111-1111-1111-1111-111111111111",
	is_main: true,
	supply:
		source === "product"
			? {
					source: "product",
					product_id: "b0c1c0de-0000-0000-0000-000000000001",
					supplier: { id: "s1", name: "S" },
					scope: { typ: "all" },
					override: null
				}
			: { source: "inline", supplier_id: null },
	spec: WHOLE_SPEC
});

describe("isInheritedHousingDetails", () => {
	it("is true when the selected member is product-linked", () => {
		expect(
			isInheritedHousingDetails({
				plan: { duration: null, check_in: null, check_out: null },
				pool: [member("product")]
			})
		).toBe(true);
	});

	it("is false for inline supply", () => {
		expect(
			isInheritedHousingDetails({
				plan: { duration: 2, check_in: null, check_out: null },
				pool: [member("inline")]
			})
		).toBe(false);
	});
});
