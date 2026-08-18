import { describe, expect, it, vi } from "vitest";

import { Currency } from "@/shared/api";

import {
	ENUM_FORM_SUPPLEMENT_ITEMS,
	ENUM_SUPPLEMENT_MARKUP_TYP,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICE_ROW_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	ENUM_SUPPLEMENT_PRICING_INVOICING,
	ENUM_SUPPLEMENT_PRICING_TYPE,
	type TSupplementPricingSchema
} from "../../types";

import {
	mapItemsAndPricingToBackend,
	mapPricingFromBackend
} from "./supplementary-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

const items = [
	{
		[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: "Extra",
		[ENUM_FORM_SUPPLEMENT_ITEMS.DESCRIPTION]: ""
	}
];

const basePricing = (
	overrides: Partial<TSupplementPricingSchema> = {}
): TSupplementPricingSchema => ({
	[ENUM_SUPPLEMENT_PRICING_FIELD.INVOICING]:
		ENUM_SUPPLEMENT_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
		ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE,
	[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: null,
	[ENUM_SUPPLEMENT_PRICING_FIELD.PACKAGE_ID]: "",
	...overrides
});

describe("mapItemsAndPricingToBackend", () => {
	it("returns items with null expenses without pricing", () => {
		expect(mapItemsAndPricingToBackend(items, undefined)).toEqual([
			{ name: "Extra", expenses: null }
		]);
	});

	it("maps flat_rate with total_price, taxes and currency", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE,
					[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES]: 20,
					[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: Currency.USD
				})
			)
		).toEqual([
			{
				name: "Extra",
				expenses: {
					typ: "fixed",
					cost: { val: 250, currency: Currency.USD },
					fees: {
						typ: "fixed",
						cost: { val: 20, currency: Currency.USD }
					},
					markup: null
				}
			}
		]);
	});

	it("maps flat_rate with unique markup", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE,
					[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: {
						typ: ENUM_SUPPLEMENT_MARKUP_TYP.FIXED,
						value: "30"
					}
				})
			)
		).toEqual([
			{
				name: "Extra",
				expenses: {
					typ: "fixed",
					cost: { val: 250, currency: Currency.USD },
					fees: null,
					markup: {
						typ: "fixed",
						cost: { val: 30, currency: Currency.USD }
					}
				}
			}
		]);
	});

	it("returns null expenses for flat_rate without total_price", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: Currency.USD
				})
			)
		).toEqual([{ name: "Extra", expenses: null }]);
	});

	it("maps per_person with total_price, taxes and currency", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_SUPPLEMENT_PRICING_TYPE.PER_PERSON,
					[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]: 80,
					[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES]: 5,
					[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: Currency.EUR
				})
			)
		).toEqual([
			{
				name: "Extra",
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 80, currency: Currency.EUR },
					fees: {
						typ: "fixed",
						cost: { val: 5, currency: Currency.EUR }
					},
					markup: null
				}
			}
		]);
	});

	it("writes markup to per_person item expenses when flag on", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_SUPPLEMENT_PRICING_TYPE.PER_PERSON,
					[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]: 15,
					[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: Currency.EUR,
					[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: {
						typ: ENUM_SUPPLEMENT_MARKUP_TYP.PERCENTAGE,
						value: "8"
					}
				})
			)
		).toEqual([
			{
				name: "Extra",
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 15, currency: Currency.EUR },
					fees: null,
					markup: { typ: "percentage", percentage: 0.08 }
				}
			}
		]);
	});

	it("maps per_item with cost, fees and currency", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
					[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]: {
						typ: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
						[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: [
							{
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: 150,
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]: 10,
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]:
									Currency.USD,
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: null
							}
						]
					}
				})
			)
		).toEqual([
			{
				name: "Extra",
				expenses: {
					typ: "fixed",
					cost: { val: 150, currency: Currency.USD },
					fees: {
						typ: "fixed",
						cost: { val: 10, currency: Currency.USD }
					},
					markup: null
				}
			}
		]);
	});

	it("omits per_item expenses when cost is null", () => {
		expect(
			mapItemsAndPricingToBackend(
				items,
				basePricing({
					[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
					[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]: {
						typ: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
						[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: [
							{
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: null,
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]: 10,
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]:
									Currency.USD,
								[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: null
							}
						]
					}
				})
			)
		).toEqual([{ name: "Extra", expenses: null }]);
	});

	it("does not send flat_rate fields when active tab is per_item", () => {
		const result = mapItemsAndPricingToBackend(
			items,
			basePricing({
				[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
					ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
				[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]: 999,
				[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES]: 50,
				[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: Currency.USD,
				[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
					[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: [
						{
							[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: 40,
							[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]:
								Currency.USD,
							[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			})
		);

		expect(result[0]?.expenses).toMatchObject({
			typ: "fixed",
			cost: { val: 40, currency: Currency.USD }
		});
		expect(result[0]?.expenses).not.toMatchObject({
			cost: { val: 999 }
		});
	});
});

describe("mapPricingFromBackend", () => {
	it("maps flat expenses with fees and markup from backend", () => {
		expect(
			mapPricingFromBackend([
				{
					name: "Extra",
					expenses: {
						typ: "fixed",
						cost: { val: 30, currency: Currency.USD },
						fees: {
							typ: "fixed",
							cost: { val: 5, currency: Currency.USD }
						},
						markup: {
							typ: "fixed",
							cost: { val: 5, currency: Currency.USD }
						}
					}
				}
			])
		).toMatchObject({
			pricing_type: ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE,
			total_price: 30,
			taxes: 5,
			currency: Currency.USD,
			add_margin_separately: true,
			markup: { typ: ENUM_SUPPLEMENT_MARKUP_TYP.FIXED, value: "5" }
		});
	});

	it("maps per_person expenses with fees from backend", () => {
		expect(
			mapPricingFromBackend([
				{
					name: "Extra",
					expenses: {
						typ: "per_person",
						cost_per_person: { val: 15, currency: Currency.EUR },
						fees: {
							typ: "fixed",
							cost: { val: 2, currency: Currency.EUR }
						},
						markup: null
					}
				}
			])
		).toMatchObject({
			pricing_type: ENUM_SUPPLEMENT_PRICING_TYPE.PER_PERSON,
			total_price: 15,
			taxes: 2,
			currency: Currency.EUR,
			add_margin_separately: false
		});
	});

	it("maps different item costs into per_item with fees", () => {
		expect(
			mapPricingFromBackend([
				{
					name: "A",
					expenses: {
						typ: "fixed",
						cost: { val: 10, currency: Currency.USD },
						fees: {
							typ: "fixed",
							cost: { val: 1, currency: Currency.USD }
						},
						markup: null
					}
				},
				{
					name: "B",
					expenses: {
						typ: "fixed",
						cost: { val: 20, currency: Currency.USD },
						fees: null,
						markup: null
					}
				}
			])
		).toMatchObject({
			pricing_type: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
			expenses: {
				typ: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
				items: [
					{
						cost: 10,
						fees: 1,
						currency: Currency.USD,
						markup: null
					},
					{
						cost: 20,
						fees: null,
						currency: Currency.USD,
						markup: null
					}
				]
			}
		});
	});
});
