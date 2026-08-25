import { describe, expect, it } from "vitest";

import { ENUM_HOUSING_SOURCE } from "../../types";

import { isInheritedHousingDetails } from "./housing-details.helpers";

describe("isInheritedHousingDetails", () => {
	it("is true when source is inherited", () => {
		expect(
			isInheritedHousingDetails({
				source: ENUM_HOUSING_SOURCE.INHERITED,
				product_id: "b0c1c0de-0000-0000-0000-000000000001"
			})
		).toBe(true);
	});

	it("is false for custom details", () => {
		expect(
			isInheritedHousingDetails({
				source: ENUM_HOUSING_SOURCE.CUSTOM,
				duration: 2,
				amenities: []
			})
		).toBe(false);
	});
});
