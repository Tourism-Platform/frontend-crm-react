import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { TRAIN_VARIANT_FORM_SCHEMA } from "../../schema/train/variant.schema";
import { ENUM_TRAIN_VARIANT_CHARGE } from "../../types";

import {
	emptyTrainVariantForm,
	mapTrainVariantFormToWrite,
	mapTrainVariantToForm
} from "./variant-form.converters";

describe("mapTrainVariantToForm", () => {
	it("maps empty variant", () => {
		expect(mapTrainVariantToForm(null)).toEqual(emptyTrainVariantForm());
	});

	it("maps per-person expenses", () => {
		const form = mapTrainVariantToForm({
			id: "v1",
			name: "Standard",
			expenses: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(form).toMatchObject({
			name: "Standard",
			chargeTyp: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
			cost: 40,
			currency: DEFAULT_EVENT_CURRENCY,
			fees: []
		});
	});
});

describe("mapTrainVariantFormToWrite", () => {
	it("maps fixed charge", () => {
		const write = mapTrainVariantFormToWrite({
			...emptyTrainVariantForm(),
			name: "Standard",
			cost: 25
		});

		expect(write).toEqual({
			name: "Standard",
			expenses: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
				cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});
	});
});

describe("TRAIN_VARIANT_FORM_SCHEMA", () => {
	it("rejects empty name", () => {
		expect(
			TRAIN_VARIANT_FORM_SCHEMA.safeParse(emptyTrainVariantForm()).success
		).toBe(false);
	});

	it("accepts a named variant", () => {
		expect(
			TRAIN_VARIANT_FORM_SCHEMA.safeParse({
				...emptyTrainVariantForm(),
				name: "Standard"
			}).success
		).toBe(true);
	});
});
