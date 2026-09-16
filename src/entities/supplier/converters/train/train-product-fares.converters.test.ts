import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_TRAIN_PRICING,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainProduct
} from "../../types";

import {
	mapFareRowFromVariant,
	mapFareRowToVariantWrite
} from "./train-product-fares.converters";

const PRODUCT: ITrainProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: "train",
	name: "Night Express",
	pricing: ENUM_TRAIN_PRICING.PER_FARE,
	charge: null,
	hops: [],
	imagePaths: [],
	primaryImagePath: null,
	variants: [
		{
			id: "v1",
			name: "Economy",
			expenses: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		}
	]
};

describe("mapFareRowFromVariant", () => {
	it("maps id and name only", () => {
		expect(mapFareRowFromVariant(PRODUCT.variants[0])).toEqual({
			variant_id: "v1",
			name: "Economy"
		});
	});
});

describe("mapFareRowToVariantWrite", () => {
	it("keeps existing expenses and updates name", () => {
		const write = mapFareRowToVariantWrite(
			{ variant_id: "v1", name: "Comfort" },
			PRODUCT
		);

		expect(write).toEqual({
			name: "Comfort",
			expenses: PRODUCT.variants[0].expenses
		});
	});

	it("falls back to empty charge when variant missing", () => {
		const write = mapFareRowToVariantWrite(
			{ variant_id: "missing", name: "New" },
			PRODUCT
		);

		expect(write.name).toBe("New");
		expect(write.expenses).toEqual({
			typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
			cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
			fees: null,
			markup: null
		});
	});
});
