import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_BUS_PRICING,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type IBusProduct
} from "../../types";

import { mapBusProductToEditForm } from "./bus-product-edit-form.converters";

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
	variants: [
		{
			id: "v1",
			name: "Coach",
			bodyType: ENUM_VEHICLE_BODY_TYPE.COACH,
			pax: 45,
			description: "Standard",
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		}
	]
};

describe("mapBusProductToEditForm", () => {
	it("maps general, vehicles and pricing sections", () => {
		const form = mapBusProductToEditForm(PRODUCT);

		expect(form.general.name).toBe("Coach fleet");
		expect(form.vehicles.vehicles).toEqual([
			{
				variant_id: "v1",
				name: "Coach",
				body_type: ENUM_VEHICLE_BODY_TYPE.COACH,
				pax: 45,
				description: "Standard"
			}
		]);
		expect(form.pricing.pricing_type).toBe("per_vehicle");
		expect(form.pricing.vehicles[0]).toMatchObject({
			variant_id: "v1",
			cost: 40
		});
	});

	it("maps empty product defaults", () => {
		const form = mapBusProductToEditForm(null);

		expect(form.general.name).toBe("");
		expect(form.vehicles.vehicles).toEqual([]);
		expect(form.pricing.pricing_type).toBe("flat_rate");
	});

	it("maps whole pricing charge", () => {
		const form = mapBusProductToEditForm({
			...PRODUCT,
			pricing: ENUM_BUS_PRICING.WHOLE,
			charge: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 12, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			},
			variants: [
				{
					id: "v1",
					name: "Coach",
					bodyType: ENUM_VEHICLE_BODY_TYPE.COACH,
					pax: 45,
					description: null,
					expenses: null
				}
			]
		});

		expect(form.pricing.pricing_type).toBe("per_person");
		expect(form.pricing.total_price).toBe(12);
	});
});
