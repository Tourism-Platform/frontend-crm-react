import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { FLIGHT_VARIANT_FORM_SCHEMA } from "../../schema/flight-variant.schema";
import { ENUM_FLIGHT_VARIANT_CHARGE } from "../../types";

import {
	emptyFlightVariantForm,
	mapFlightVariantFormToWrite,
	mapFlightVariantToForm
} from "./variant-form.converters";

describe("mapFlightVariantToForm", () => {
	it("maps empty variant", () => {
		expect(mapFlightVariantToForm(null)).toEqual(emptyFlightVariantForm());
	});

	it("maps per-person expenses", () => {
		const form = mapFlightVariantToForm({
			id: "v1",
			name: "Economy",
			expenses: {
				typ: ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(form).toMatchObject({
			name: "Economy",
			chargeTyp: ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON,
			cost: 40,
			currency: DEFAULT_EVENT_CURRENCY,
			fees: []
		});
	});
});

describe("mapFlightVariantFormToWrite", () => {
	it("maps fixed charge", () => {
		const write = mapFlightVariantFormToWrite({
			...emptyFlightVariantForm(),
			name: "Economy",
			cost: 25
		});

		expect(write).toEqual({
			name: "Economy",
			expenses: {
				typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
				cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});
	});

	it("maps null cost to zero", () => {
		const write = mapFlightVariantFormToWrite({
			...emptyFlightVariantForm(),
			name: "Economy",
			cost: null
		});

		expect(write.expenses).toMatchObject({
			typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
			cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY }
		});
	});
});

describe("FLIGHT_VARIANT_FORM_SCHEMA", () => {
	it("rejects empty name", () => {
		expect(
			FLIGHT_VARIANT_FORM_SCHEMA.safeParse(emptyFlightVariantForm())
				.success
		).toBe(false);
	});

	it("accepts a named variant", () => {
		expect(
			FLIGHT_VARIANT_FORM_SCHEMA.safeParse({
				...emptyFlightVariantForm(),
				name: "Economy"
			}).success
		).toBe(true);
	});
});
