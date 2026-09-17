import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_BUS_PRICING,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IBusProduct
} from "../../types";

import {
	mapBusProductToGeneralForm,
	mapBusProductToUpdate
} from "./product-form.converters";

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
	variants: []
};

describe("mapBusProductToUpdate", () => {
	it("uses the general mapper", () => {
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

	it("keeps whole charge from existing product", () => {
		expect(
			mapBusProductToUpdate({
				supplierId: PRODUCT.supplierId,
				productId: PRODUCT.id,
				values: mapBusProductToGeneralForm(PRODUCT),
				existing: {
					...PRODUCT,
					pricing: ENUM_BUS_PRICING.WHOLE,
					charge: {
						typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
						cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
						fees: null,
						markup: null
					}
				}
			})
		).toMatchObject({
			details: {
				pricing: "whole",
				name: "Coach fleet",
				charge: {
					typ: "fixed",
					cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY }
				}
			}
		});
	});
});
