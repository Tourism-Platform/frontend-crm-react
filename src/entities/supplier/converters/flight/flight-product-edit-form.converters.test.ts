import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FLIGHT_PRICING,
	ENUM_FLIGHT_VARIANT_CHARGE,
	ENUM_SUPPLIER_TYPE,
	type IFlightProduct
} from "../../types";

import { mapFlightProductToEditForm } from "./flight-product-edit-form.converters";

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
	variants: [
		{
			id: "v1",
			name: "Economy",
			expenses: {
				typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		}
	]
};

describe("mapFlightProductToEditForm", () => {
	it("maps general, fares and pricing sections", () => {
		const form = mapFlightProductToEditForm(PRODUCT);

		expect(form.general.name).toBe("HY TAS–SKD");
		expect(form.fares.fares).toEqual([
			{ variant_id: "v1", name: "Economy" }
		]);
		expect(form.pricing.pricing_type).toBe("per_fare");
		expect(form.pricing.fares[0]).toMatchObject({
			variant_id: "v1",
			cost: 40
		});
	});

	it("maps empty product defaults", () => {
		const form = mapFlightProductToEditForm(null);

		expect(form.general.name).toBe("");
		expect(form.fares.fares).toEqual([]);
		expect(form.pricing.pricing_type).toBe("flat_rate");
	});

	it("maps whole pricing charge", () => {
		const form = mapFlightProductToEditForm({
			...PRODUCT,
			pricing: ENUM_FLIGHT_PRICING.WHOLE,
			charge: {
				typ: ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 12, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			},
			variants: [{ id: "v1", name: "Economy", expenses: null }]
		});

		expect(form.pricing.pricing_type).toBe("per_person");
		expect(form.pricing.total_price).toBe(12);
	});
});
