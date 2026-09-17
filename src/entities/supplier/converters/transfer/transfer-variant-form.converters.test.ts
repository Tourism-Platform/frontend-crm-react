import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { TRANSFER_VARIANT_FORM_SCHEMA } from "../../schema/transfer/variant.schema";
import {
	ENUM_FORM_TRANSFER_CATEGORY,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";

import {
	emptyTransferVariantCategory,
	emptyTransferVariantForm,
	mapTransferVariantFormToWrite,
	mapTransferVariantToForm
} from "./transfer-variant-form.converters";

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
			prices: []
		});

		expect(form).toMatchObject({
			name: "Sedan",
			body_type: ENUM_VEHICLE_BODY_TYPE.SEDAN,
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

	it("maps price rows", () => {
		const form = mapTransferVariantToForm(
			{
				id: "v1",
				name: "Sedan",
				bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
				pax: 3,
				description: null,
				expenses: null,
				prices: [
					{
						id: "p1",
						categoryId: "fc1",
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
			},
			[{ id: "fc1", name: "economy" }]
		);

		expect(form.addMarginSeparately).toBe(true);
		expect(form.categories).toEqual([
			{
				id: "p1",
				category_id: "fc1",
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
	it("maps fixed charge and echoes price id", () => {
		const write = mapTransferVariantFormToWrite({
			...emptyTransferVariantForm(),
			name: "Sedan",
			cost: 25,
			categories: [
				{
					id: "p1",
					category_id: "fc1",
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
			prices: [
				{
					id: "p1",
					categoryId: "fc1",
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

	it("echoes price id and writes markup when the checkbox is on", () => {
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
					id: "p1",
					category_id: "fc1",
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
		expect(write.prices).toEqual([
			{
				id: "p1",
				categoryId: "fc1",
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
					id: "p1",
					category_id: "fc1",
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
		expect(write.prices[0]?.expenses.markup).toBeNull();
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
			TRANSFER_VARIANT_FORM_SCHEMA.safeParse({
				...emptyTransferVariantForm(),
				name: ""
			}).success
		).toBe(false);
	});

	it("requires category_id on category rows", () => {
		expect(
			TRANSFER_VARIANT_FORM_SCHEMA.safeParse({
				...emptyTransferVariantForm(),
				categories: [
					{
						[ENUM_FORM_TRANSFER_CATEGORY.NAME]: "economy",
						[ENUM_FORM_TRANSFER_CATEGORY.COST]: 10,
						[ENUM_FORM_TRANSFER_CATEGORY.CURRENCY]:
							DEFAULT_EVENT_CURRENCY,
						[ENUM_FORM_TRANSFER_CATEGORY.FEES]: [],
						[ENUM_FORM_TRANSFER_CATEGORY.MARKUP]: null
					}
				]
			}).success
		).toBe(false);
	});
});
