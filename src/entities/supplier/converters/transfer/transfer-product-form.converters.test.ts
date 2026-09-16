import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	type ITransferProduct
} from "../../types";

import {
	mapTransferProductToGeneralForm,
	mapTransferProductToUpdate
} from "./transfer-product-form.converters";

const PRODUCT: ITransferProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.TRANSFER,
	name: "Airport fleet",
	pricing: ENUM_TRANSFER_PRICING.PER_CAR,
	charge: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: []
};

const WHOLE_PRODUCT: ITransferProduct = {
	...PRODUCT,
	pricing: ENUM_TRANSFER_PRICING.WHOLE,
	charge: {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: { val: 100, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: null
	}
};

describe("mapTransferProductToUpdate", () => {
	it("keeps the existing per_car arm and only updates the name", () => {
		expect(
			mapTransferProductToUpdate({
				supplierId: PRODUCT.supplierId,
				productId: PRODUCT.id,
				values: mapTransferProductToGeneralForm({
					...PRODUCT,
					name: "New fleet"
				}),
				existing: PRODUCT
			})
		).toMatchObject({
			details: {
				pricing: "per_car",
				name: "New fleet"
			}
		});
	});

	it("echoes the existing whole charge on a name update", () => {
		expect(
			mapTransferProductToUpdate({
				supplierId: WHOLE_PRODUCT.supplierId,
				productId: WHOLE_PRODUCT.id,
				values: mapTransferProductToGeneralForm(WHOLE_PRODUCT),
				existing: WHOLE_PRODUCT
			})
		).toMatchObject({
			details: {
				pricing: "whole",
				name: "Airport fleet",
				charge: {
					typ: "fixed",
					cost: { val: 100, currency: DEFAULT_EVENT_CURRENCY }
				}
			}
		});
	});
});
