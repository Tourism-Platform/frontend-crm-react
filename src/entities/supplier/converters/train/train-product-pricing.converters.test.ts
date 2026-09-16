import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_PRICING,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainProduct,
	type ITrainVariant
} from "../../types";

import { mapTrainProductToEditForm } from "./train-product-edit-form.converters";
import {
	alignTrainPerFareRows,
	mapTrainEditFormToPricingSwitch
} from "./train-product-pricing.converters";

const VARIANT: ITrainVariant = {
	id: "v1",
	name: "Economy",
	expenses: {
		typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
		cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: null
	}
};

const PRODUCT: ITrainProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.TRAIN,
	name: "Night Express",
	pricing: ENUM_TRAIN_PRICING.PER_FARE,
	charge: null,
	hops: [],
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapTrainEditFormToPricingSwitch", () => {
	it("builds ToPerFare from fare rows", () => {
		const values = mapTrainProductToEditForm(PRODUCT);
		values.pricing.fares = [
			{
				variant_id: "v1",
				charge_typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
				cost: 55,
				fees: [],
				currency: DEFAULT_EVENT_CURRENCY,
				markup: null
			}
		];

		expect(mapTrainEditFormToPricingSwitch(values)).toMatchObject({
			typ: "train",
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
		const values = mapTrainProductToEditForm({
			...PRODUCT,
			pricing: ENUM_TRAIN_PRICING.WHOLE,
			charge: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(mapTrainEditFormToPricingSwitch(values)).toMatchObject({
			typ: "train",
			to: "whole",
			charge: {
				typ: "fixed",
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY }
			}
		});
	});
});

describe("alignTrainPerFareRows", () => {
	it("keeps fares and pricing rows the same length", () => {
		const aligned = alignTrainPerFareRows({
			faresList: [{ variant_id: "a" }, { variant_id: "b" }],
			current: [
				{
					variant_id: "a",
					charge_typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
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
