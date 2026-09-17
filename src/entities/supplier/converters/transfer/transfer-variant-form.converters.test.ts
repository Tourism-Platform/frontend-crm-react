import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { TRANSFER_VARIANT_FORM_SCHEMA } from "../../schema/transfer/variant.schema";
import {
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";

import {
	emptyTransferVariantCategory,
	emptyTransferVariantForm,
	mapTransferMarkupFormToDomain,
	mapTransferMarkupToForm,
	mapTransferVariantFormToWrite,
	mapTransferVariantToForm
} from "./transfer-variant-form.converters";

describe("mapTransferMarkupToForm", () => {
	it("maps percentage from a 0..1 share to a form percent", () => {
		expect(
			mapTransferMarkupToForm({
				typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
				percentage: 0.1
			})
		).toEqual({
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			value: "10"
		});
	});

	it("maps a fixed cost", () => {
		expect(
			mapTransferMarkupToForm({
				typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
				cost: { val: 15, currency: DEFAULT_EVENT_CURRENCY }
			})
		).toEqual({
			typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
			value: "15"
		});
	});

	it("maps missing markup to null", () => {
		expect(mapTransferMarkupToForm(null)).toBeNull();
	});
});

describe("mapTransferMarkupFormToDomain", () => {
	it("maps a form percent 10 to percentage 0.1", () => {
		expect(
			mapTransferMarkupFormToDomain(
				{
					typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
					value: "10"
				},
				DEFAULT_EVENT_CURRENCY,
				true
			)
		).toEqual({
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: 0.1
		});
	});

	it("maps checkbox off to null", () => {
		expect(
			mapTransferMarkupFormToDomain(
				{
					typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
					value: "10"
				},
				DEFAULT_EVENT_CURRENCY,
				false
			)
		).toBeNull();
	});

	it("maps an empty value to null", () => {
		expect(
			mapTransferMarkupFormToDomain(
				{
					typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
					value: ""
				},
				DEFAULT_EVENT_CURRENCY,
				true
			)
		).toBeNull();
	});
});

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
			},
			categories: []
		});

		expect(form).toMatchObject({
			name: "Sedan",
			bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 3,
			description: "Airport",
			cost: 40,
			currency: DEFAULT_EVENT_CURRENCY,
			fees: [],
			addMarginSeparately: false,
			markup: null
		});
		expect(form.categories).toEqual([emptyTransferVariantCategory()]);
	});

	it("maps category rows", () => {
		const form = mapTransferVariantToForm({
			id: "v1",
			name: "Sedan",
			bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 3,
			description: null,
			expenses: null,
			categories: [
				{
					id: "c1",
					name: "economy",
					expenses: {
						typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
						cost: { val: 30, currency: DEFAULT_EVENT_CURRENCY },
						fees: null,
						markup: {
							typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
							percentage: 0.1
						}
					}
				}
			]
		});

		expect(form.addMarginSeparately).toBe(true);
		expect(form.categories).toEqual([
			{
				id: "c1",
				name: "economy",
				cost: 30,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: [],
				markup: {
					typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
					value: "10"
				}
			}
		]);
	});
});

describe("mapTransferVariantFormToWrite", () => {
	it("maps fixed charge and echoes category id", () => {
		const write = mapTransferVariantFormToWrite({
			...emptyTransferVariantForm(),
			name: "Sedan",
			cost: 25,
			categories: [
				{
					id: "c1",
					name: "economy",
					cost: 30,
					currency: DEFAULT_EVENT_CURRENCY,
					fees: [],
					markup: null
				}
			]
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
			},
			categories: [
				{
					id: "c1",
					name: "economy",
					expenses: {
						typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
						cost: { val: 30, currency: DEFAULT_EVENT_CURRENCY },
						fees: null,
						markup: null
					}
				}
			]
		});
	});

	it("echoes category id and writes markup when the checkbox is on", () => {
		const write = mapTransferVariantFormToWrite({
			...emptyTransferVariantForm(),
			name: "Sedan",
			cost: 25,
			addMarginSeparately: true,
			markup: {
				typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
				value: "10"
			},
			categories: [
				{
					id: "c1",
					name: "economy",
					cost: 30,
					currency: DEFAULT_EVENT_CURRENCY,
					fees: [],
					markup: {
						typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
						value: "5"
					}
				}
			]
		});

		expect(write.expenses.markup).toEqual({
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: 0.1
		});
		expect(write.categories).toEqual([
			{
				id: "c1",
				name: "economy",
				expenses: {
					typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: { val: 30, currency: DEFAULT_EVENT_CURRENCY },
					fees: null,
					markup: {
						typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
						cost: { val: 5, currency: DEFAULT_EVENT_CURRENCY }
					}
				}
			}
		]);
	});

	it("maps checkbox off to null markup", () => {
		const write = mapTransferVariantFormToWrite({
			...emptyTransferVariantForm(),
			name: "Sedan",
			cost: 25,
			addMarginSeparately: false,
			markup: {
				typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
				value: "10"
			},
			categories: [
				{
					id: "c1",
					name: "economy",
					cost: 30,
					currency: DEFAULT_EVENT_CURRENCY,
					fees: [],
					markup: {
						typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
						value: "5"
					}
				}
			]
		});

		expect(write.expenses.markup).toBeNull();
		expect(write.categories[0]?.expenses.markup).toBeNull();
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
