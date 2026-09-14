import { describe, expect, it } from "vitest";

import {
	ENUM_BUS_PRICING,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";

import {
	mapBusProductToCreate,
	mapBusVariantToWrite
} from "./product.converters";

describe("mapBusProductToCreate", () => {
	it("maps name into details", () => {
		expect(mapBusProductToCreate({ name: "Coach fleet" })).toEqual({
			typ: "bus",
			details: { pricing: "per_vehicle", name: "Coach fleet" }
		});
	});
});

describe("mapBusVariantToWrite", () => {
	it("maps per_vehicle variant with fixed charge", () => {
		expect(
			mapBusVariantToWrite(
				{
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
				},
				ENUM_BUS_PRICING.PER_VEHICLE
			)
		).toEqual({
			typ: "bus",
			pricing: "per_vehicle",
			name: "45-seater",
			body_type: "coach",
			pax: 45,
			description: "Tour coach",
			charge: {
				typ: "fixed",
				cost: { val: 250, currency: "USD" },
				fees: null,
				markup: null
			}
		});
	});

	it("maps whole variant without charge", () => {
		expect(
			mapBusVariantToWrite(
				{
					name: "45-seater",
					bodyType: ENUM_VEHICLE_BODY_TYPE.COACH,
					pax: 45,
					description: null,
					expenses: {
						typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
						cost: { val: 250, currency: "USD" },
						fees: null,
						markup: null
					}
				},
				ENUM_BUS_PRICING.WHOLE
			)
		).toEqual({
			typ: "bus",
			pricing: "whole",
			name: "45-seater",
			body_type: "coach",
			pax: 45,
			description: null
		});
	});
});
