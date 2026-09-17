import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_VEHICLES,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type IBusProduct,
	type IBusVariant
} from "../../types";

import { mapBusVehicleRowToVariantWrite } from "./bus-product-vehicles.converters";

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
		markup: {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: 0.1
		}
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

describe("mapBusVehicleRowToVariantWrite", () => {
	it("echoes charge from the product, not from pricing expenses", () => {
		expect(
			mapBusVehicleRowToVariantWrite(
				{
					[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]: "v1",
					[ENUM_FORM_BUS_VEHICLES.NAME]: "Coach",
					[ENUM_FORM_BUS_VEHICLES.BODY_TYPE]:
						ENUM_VEHICLE_BODY_TYPE.COACH,
					[ENUM_FORM_BUS_VEHICLES.PAX]: 45,
					[ENUM_FORM_BUS_VEHICLES.DESCRIPTION]: undefined
				},
				PRODUCT
			)
		).toMatchObject({
			name: "Coach",
			bodyType: ENUM_VEHICLE_BODY_TYPE.COACH,
			pax: 45,
			expenses: {
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY }
			}
		});
	});
});
