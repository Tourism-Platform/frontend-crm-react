import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { TRANSFER_VARIANT_FORM_SCHEMA } from "../../schema/transfer-variant.schema";
import {
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";

import {
	emptyTransferVariantForm,
	mapTransferVariantFormToWrite,
	mapTransferVariantToForm
} from "./variant-form.converters";

describe("mapTransferVariantToForm", () => {
	it("maps empty variant", () => {
		expect(mapTransferVariantToForm(null)).toEqual(
			emptyTransferVariantForm()
		);
	});

	it("maps fixed expenses", () => {
		const form = mapTransferVariantToForm({
			id: "v1",
			name: "Sedan",
			bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 3,
			description: "Airport",
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(form).toMatchObject({
			name: "Sedan",
			bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 3,
			description: "Airport",
			cost: 40,
			currency: DEFAULT_EVENT_CURRENCY,
			fees: []
		});
	});
});

describe("mapTransferVariantFormToWrite", () => {
	it("maps fixed charge", () => {
		const write = mapTransferVariantFormToWrite({
			...emptyTransferVariantForm(),
			name: "Sedan",
			cost: 25
		});

		expect(write).toEqual({
			name: "Sedan",
			bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 1,
			description: null,
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});
	});

	it("maps null cost to zero", () => {
		const write = mapTransferVariantFormToWrite({
			...emptyTransferVariantForm(),
			name: "Sedan",
			cost: null
		});

		expect(write.expenses).toMatchObject({
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY }
		});
	});
});

describe("TRANSFER_VARIANT_FORM_SCHEMA", () => {
	it("rejects empty name", () => {
		expect(
			TRANSFER_VARIANT_FORM_SCHEMA.safeParse(emptyTransferVariantForm())
				.success
		).toBe(false);
	});

	it("accepts a named variant", () => {
		expect(
			TRANSFER_VARIANT_FORM_SCHEMA.safeParse({
				...emptyTransferVariantForm(),
				name: "Sedan"
			}).success
		).toBe(true);
	});
});
