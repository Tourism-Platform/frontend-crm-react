import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	ENUM_VEHICLE_BODY_TYPE,
	type ITransferProduct,
	type ITransferVariant
} from "../../types";

import { mapTransferCarRowToVariantWrite } from "./transfer-product-cars.converters";

const VARIANT: ITransferVariant = {
	id: "v1",
	name: "Sedan",
	bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
	pax: 3,
	description: null,
	expenses: {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: 0.1
		}
	},
	prices: []
};

const PRODUCT: ITransferProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.TRANSFER,
	name: "Airport fleet",
	pricing: ENUM_TRANSFER_PRICING.PER_CAR,
	charge: null,
	fleetCategories: [],
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapTransferCarRowToVariantWrite", () => {
	it("echoes charge from the product, not from pricing expenses", () => {
		expect(
			mapTransferCarRowToVariantWrite(
				{
					[ENUM_FORM_TRANSFER_CARS.VARIANT_ID]: "v1",
					[ENUM_FORM_TRANSFER_CARS.NAME]: "Sedan",
					[ENUM_FORM_TRANSFER_CARS.CAR_NAME]:
						ENUM_VEHICLE_BODY_TYPE.SEDAN,
					[ENUM_FORM_TRANSFER_CARS.PAX]: 3,
					[ENUM_FORM_TRANSFER_CARS.DESCRIPTION]: undefined
				},
				PRODUCT
			)
		).toMatchObject({
			name: "Sedan",
			bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 3,
			expenses: {
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY }
			}
		});
	});
});
