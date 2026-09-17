import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { ACTIVITY_VARIANT_FORM_SCHEMA } from "../../schema/activity/variant.schema";
import { ENUM_SUPPLIER_VARIANT_CHARGE } from "../../types";

import {
	emptyActivityVariantForm,
	mapActivityVariantFormToWrite,
	mapActivityVariantToForm
} from "./variant-form.converters";

describe("mapActivityVariantToForm", () => {
	it("maps empty variant", () => {
		expect(mapActivityVariantToForm(null)).toEqual(
			emptyActivityVariantForm()
		);
	});

	it("maps per-person expenses", () => {
		const form = mapActivityVariantToForm({
			id: "v1",
			name: "Standard",
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(form).toMatchObject({
			name: "Standard",
			chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
			cost: 40,
			currency: DEFAULT_EVENT_CURRENCY,
			fees: []
		});
	});
});

describe("mapActivityVariantFormToWrite", () => {
	it("maps fixed charge", () => {
		const write = mapActivityVariantFormToWrite({
			...emptyActivityVariantForm(),
			name: "Standard",
			cost: 25
		});

		expect(write).toEqual({
			name: "Standard",
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});
	});

	it("maps null cost to zero", () => {
		const write = mapActivityVariantFormToWrite({
			...emptyActivityVariantForm(),
			name: "Standard",
			cost: null
		});

		expect(write.expenses).toMatchObject({
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
			markup: null
		});
	});
});

describe("ACTIVITY_VARIANT_FORM_SCHEMA", () => {
	it("rejects empty name", () => {
		expect(
			ACTIVITY_VARIANT_FORM_SCHEMA.safeParse(emptyActivityVariantForm())
				.success
		).toBe(false);
	});

	it("accepts a named variant", () => {
		expect(
			ACTIVITY_VARIANT_FORM_SCHEMA.safeParse({
				...emptyActivityVariantForm(),
				name: "Standard"
			}).success
		).toBe(true);
	});
});
