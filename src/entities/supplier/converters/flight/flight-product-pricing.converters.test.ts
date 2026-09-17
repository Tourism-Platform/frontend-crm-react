import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FLIGHT_PRICING,
	ENUM_FLIGHT_VARIANT_CHARGE,
	ENUM_SUPPLIER_TYPE,
	type IFlightProduct,
	type IFlightVariant
} from "../../types";

import { mapFlightProductToEditForm } from "./flight-product-edit-form.converters";
import {
	alignFlightPerFareRows,
	mapFlightEditFormToPricingSwitch
} from "./flight-product-pricing.converters";

const VARIANT: IFlightVariant = {
	id: "v1",
	name: "Economy",
	expenses: {
		typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
		cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: null
	}
};

const PRODUCT: IFlightProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.FLIGHT,
	name: "HY TAS–SKD",
	pricing: ENUM_FLIGHT_PRICING.PER_FARE,
	charge: null,
	hops: [],
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapFlightEditFormToPricingSwitch", () => {
	it("builds ToPerFare from fare rows", () => {
		const values = mapFlightProductToEditForm(PRODUCT);
		values.pricing.fares = [
			{
				variant_id: "v1",
				charge_typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
				cost: 55,
				fees: [],
				currency: DEFAULT_EVENT_CURRENCY,
				markup: null
			}
		];

		expect(mapFlightEditFormToPricingSwitch(values)).toMatchObject({
			typ: "flight",
			to: "per_fare",
			fares: [
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

	it("builds ToWholeRoute from total_price", () => {
		const values = mapFlightProductToEditForm({
			...PRODUCT,
			pricing: ENUM_FLIGHT_PRICING.WHOLE,
			charge: {
				typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(mapFlightEditFormToPricingSwitch(values)).toMatchObject({
			typ: "flight",
			to: "whole",
			charge: {
				typ: "fixed",
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY }
			}
		});
	});
});

describe("alignFlightPerFareRows", () => {
	it("keeps fares and pricing rows the same length", () => {
		const aligned = alignFlightPerFareRows({
			faresList: [{ variant_id: "a" }, { variant_id: "b" }],
			current: [
				{
					variant_id: "a",
					charge_typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
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
