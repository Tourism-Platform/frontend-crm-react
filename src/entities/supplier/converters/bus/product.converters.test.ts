import { describe, expect, it } from "vitest";

import {
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";

import {
	mapBusProductToCreate,
	mapBusVariantToWrite
} from "./product.converters";

describe("mapBusProductToCreate", () => {
	it("maps name and empty details", () => {
		expect(mapBusProductToCreate({ name: "Coach fleet" })).toEqual({
			typ: "bus",
			name: "Coach fleet",
			details: { typ: "bus" }
		});
	});
});

describe("mapBusVariantToWrite", () => {
	it("maps vehicle category", () => {
		expect(
			mapBusVariantToWrite({
				name: "45-seater",
				bodyType: ENUM_VEHICLE_BODY_TYPE.COACH,
				pax: 45,
				description: "Tour coach",
				expenses: {
					typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: { val: 250, currency: "USD" },
					fees: null,
					markup: null
				}
			})
		).toMatchObject({
			typ: "bus",
			name: "45-seater",
			details: {
				typ: "bus",
				body_type: "coach",
				pax: 45,
				description: "Tour coach",
				expenses: {
					typ: "fixed",
					cost: { val: 250, currency: "USD" }
				}
			}
		});
	});
});
