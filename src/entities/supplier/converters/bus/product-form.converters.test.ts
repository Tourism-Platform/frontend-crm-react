import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_BUS_PRICING,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IBusProduct
} from "../../types";

import {
	mapBusProductPricingToUpdate,
	mapBusProductToGeneralForm,
	mapBusProductToUpdate
} from "./product-form.converters";

const PRODUCT: IBusProduct = {
	id: "p1",
	supplierId: "s1",
	typ: ENUM_SUPPLIER_TYPE.BUS,
	name: "Coach fleet",
	pricing: ENUM_BUS_PRICING.PER_VEHICLE,
	charge: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: []
};

describe("mapBusProductPricingToUpdate", () => {
	it("sends per_vehicle without a fleet charge", () => {
		expect(
			mapBusProductPricingToUpdate(PRODUCT, {
				pricing: ENUM_BUS_PRICING.PER_VEHICLE,
				chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: 90,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: []
			})
		).toMatchObject({
			typ: "bus",
			details: {
				pricing: "per_vehicle",
				name: "Coach fleet"
			}
		});
		expect(
			mapBusProductPricingToUpdate(PRODUCT, {
				pricing: ENUM_BUS_PRICING.PER_VEHICLE,
				chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: 90,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: []
			}).details
		).not.toHaveProperty("charge");
	});

	it("sends whole with a fleet charge", () => {
		expect(
			mapBusProductPricingToUpdate(PRODUCT, {
				pricing: ENUM_BUS_PRICING.WHOLE,
				chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: 400,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: []
			})
		).toMatchObject({
			typ: "bus",
			details: {
				pricing: "whole",
				name: "Coach fleet",
				charge: {
					typ: "fixed",
					cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
					fees: null,
					markup: null
				}
			}
		});
	});
});

describe("mapBusProductToUpdate", () => {
	it("uses the pricing mapper when pricing and existing are set", () => {
		expect(
			mapBusProductToUpdate({
				supplierId: PRODUCT.supplierId,
				productId: PRODUCT.id,
				values: mapBusProductToGeneralForm(PRODUCT),
				existing: PRODUCT,
				pricing: {
					pricing: ENUM_BUS_PRICING.WHOLE,
					chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: 400,
					currency: DEFAULT_EVENT_CURRENCY,
					fees: []
				}
			})
		).toMatchObject({
			details: {
				pricing: "whole",
				charge: {
					typ: "fixed",
					cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY }
				}
			}
		});
	});

	it("uses the general mapper when pricing is omitted", () => {
		expect(
			mapBusProductToUpdate({
				supplierId: PRODUCT.supplierId,
				productId: PRODUCT.id,
				values: mapBusProductToGeneralForm(PRODUCT),
				existing: PRODUCT
			})
		).toMatchObject({
			details: {
				pricing: "per_vehicle",
				name: "Coach fleet"
			}
		});
	});
});
