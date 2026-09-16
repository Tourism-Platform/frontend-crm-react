import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_ACTIVITY_SUB_TYPE,
	ENUM_FORM_ACTIVITY_MENU,
	ENUM_FORM_ACTIVITY_SECTION,
	ENUM_FORM_ACTIVITY_VARIANT,
	ENUM_FORM_ACTIVITY_VARIANTS,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IActivityProduct,
	type IActivityVariant
} from "../../types";

import { mapActivityProductToEditForm } from "./activity-product-edit-form.converters";
import {
	mapActivityOfferingRowFromVariant,
	mapActivityOfferingRowToVariantWrite
} from "./activity-product-variants.converters";
import { mapActivityVariantToWrite } from "./product.converters";
import { mapActivityVariantFormToWrite } from "./variant-form.converters";

const markup = {
	typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
	percentage: 0.1
} as const;

const foodVariant = (
	overrides?: Partial<IActivityVariant>
): IActivityVariant => ({
	id: "v1",
	name: "Lunch set",
	expenses: {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup
	},
	menu: [
		{
			[ENUM_FORM_ACTIVITY_MENU.ID]: "m1",
			[ENUM_FORM_ACTIVITY_MENU.NAME]: "Plov",
			[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: "Rice"
		}
	],
	...overrides
});

const product = (variants: IActivityVariant[]): IActivityProduct => ({
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
	name: "Food hall",
	subTyp: ENUM_ACTIVITY_SUB_TYPE.FOOD,
	location: null,
	imagePaths: [],
	primaryImagePath: null,
	variants
});

describe("mapActivityOfferingRowFromVariant", () => {
	it("keeps variant id, charge and menu", () => {
		expect(mapActivityOfferingRowFromVariant(foodVariant())).toMatchObject({
			[ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID]: "v1",
			[ENUM_FORM_ACTIVITY_VARIANT.NAME]: "Lunch set",
			[ENUM_FORM_ACTIVITY_VARIANT.COST]: 25,
			[ENUM_FORM_ACTIVITY_VARIANT.MENU]: [
				{
					[ENUM_FORM_ACTIVITY_MENU.ID]: "m1",
					[ENUM_FORM_ACTIVITY_MENU.NAME]: "Plov"
				}
			]
		});
	});
});

describe("mapActivityVariantFormToWrite", () => {
	it("preserves existing markup", () => {
		const write = mapActivityVariantFormToWrite(
			{
				[ENUM_FORM_ACTIVITY_VARIANT.NAME]: "Lunch set",
				[ENUM_FORM_ACTIVITY_VARIANT.CHARGE_TYP]:
					ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				[ENUM_FORM_ACTIVITY_VARIANT.COST]: 30,
				[ENUM_FORM_ACTIVITY_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
				[ENUM_FORM_ACTIVITY_VARIANT.FEES]: [],
				[ENUM_FORM_ACTIVITY_VARIANT.MENU]: foodVariant().menu
			},
			foodVariant()
		);

		expect(write.expenses.markup).toEqual(markup);
		expect(write.menu?.[0]?.[ENUM_FORM_ACTIVITY_MENU.NAME]).toBe("Plov");
	});
});

describe("mapActivityOfferingRowToVariantWrite", () => {
	it("writes name, charge, menu and keeps markup", () => {
		const row = mapActivityOfferingRowFromVariant(foodVariant());
		row[ENUM_FORM_ACTIVITY_VARIANT.COST] = 40;

		expect(
			mapActivityOfferingRowToVariantWrite(row, product([foodVariant()]))
		).toMatchObject({
			name: "Lunch set",
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
				markup
			},
			menu: [
				{
					[ENUM_FORM_ACTIVITY_MENU.NAME]: "Plov"
				}
			]
		});
	});
});

describe("mapActivityVariantToWrite", () => {
	it("maps menu items to backend", () => {
		expect(
			mapActivityVariantToWrite({
				name: "Lunch set",
				expenses: {
					typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
					fees: null,
					markup: null
				},
				menu: foodVariant().menu
			})
		).toMatchObject({
			typ: "activity",
			name: "Lunch set",
			menu: [{ id: "m1", name: "Plov", description: "Rice" }]
		});
	});
});

describe("mapActivityProductToEditForm", () => {
	it("maps general and offering rows", () => {
		const form = mapActivityProductToEditForm(product([foodVariant()]));

		expect(form[ENUM_FORM_ACTIVITY_SECTION.GENERAL].name).toBe("Food hall");
		expect(
			form[ENUM_FORM_ACTIVITY_SECTION.VARIANTS][
				ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST
			]
		).toHaveLength(1);
	});
});
