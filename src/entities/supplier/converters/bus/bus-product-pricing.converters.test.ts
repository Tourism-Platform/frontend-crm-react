import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_BUS_PRICING,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type IBusProduct,
	type IBusVariant
} from "../../types";

import { mapBusProductToEditForm } from "./bus-product-edit-form.converters";
import {
	alignBusPerVehicleRows,
	mapBusEditFormToPricingSwitch
} from "./bus-product-pricing.converters";

const VARIANT: IBusVariant = {
	id: "v1",
	name: "Coach",
	bodyType: ENUM_VEHICLE_BODY_TYPE.COACH,
	pax: 45,
	description: null,
	expenses: {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: null
	}
};

const PRODUCT: IBusProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.BUS,
	name: "Coach fleet",
	pricing: ENUM_BUS_PRICING.PER_VEHICLE,
	charge: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapBusEditFormToPricingSwitch", () => {
	it("builds ToPerVehicle from vehicle rows", () => {
		const values = mapBusProductToEditForm(PRODUCT);
		values.pricing.vehicles = [
			{
				variant_id: "v1",
				cost: 55,
				fees: [],
				currency: DEFAULT_EVENT_CURRENCY,
				markup: null
			}
		];

		expect(mapBusEditFormToPricingSwitch(values)).toMatchObject({
			typ: "bus",
			to: "per_vehicle",
			vehicles: [
				{
					variant_id: "v1",
					charge: {
						typ: "fixed",
						cost: { val: 55, currency: DEFAULT_EVENT_CURRENCY }
					}
				}
			]
		});
	});

	it("builds ToWholeFleet from total_price", () => {
		const values = mapBusProductToEditForm({
			...PRODUCT,
			pricing: ENUM_BUS_PRICING.WHOLE,
			charge: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(mapBusEditFormToPricingSwitch(values)).toMatchObject({
			typ: "bus",
			to: "whole",
			charge: {
				typ: "fixed",
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY }
			}
		});
	});

	it("builds ToWholeFleet per_person from whole charge", () => {
		const values = mapBusProductToEditForm({
			...PRODUCT,
			pricing: ENUM_BUS_PRICING.WHOLE,
			charge: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 12, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			},
			variants: [{ ...VARIANT, expenses: null }]
		});

		expect(mapBusEditFormToPricingSwitch(values)).toMatchObject({
			typ: "bus",
			to: "whole",
			charge: {
				typ: "per_person",
				cost_per_person: {
					val: 12,
					currency: DEFAULT_EVENT_CURRENCY
				}
			}
		});
	});
});

describe("alignBusPerVehicleRows", () => {
	it("keeps vehicles and pricing rows the same length", () => {
		const aligned = alignBusPerVehicleRows({
			vehiclesList: [{ variant_id: "a" }, { variant_id: "b" }],
			current: [
				{
					variant_id: "a",
					cost: 10,
					fees: [],
					currency: DEFAULT_EVENT_CURRENCY,
					markup: null
				}
			]
		});

		expect(aligned).toHaveLength(2);
		expect(aligned[0].variant_id).toBe("a");
		expect(aligned[0].cost).toBe(10);
		expect(aligned[1].variant_id).toBe("b");
		expect(aligned[1].cost).toBeNull();
	});
});
