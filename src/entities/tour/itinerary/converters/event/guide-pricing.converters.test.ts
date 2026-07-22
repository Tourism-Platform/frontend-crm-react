import { describe, expect, it, vi } from "vitest";

import { LanguageCode } from "@/shared/api";

import { ENUM_LANGUAGES } from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE,
	type TGuidePricingSchema
} from "../../types";

import { mapGuideCategoriesToBackend } from "./guide-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

const basePricing = (
	overrides: Partial<TGuidePricingSchema> = {}
): TGuidePricingSchema => ({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
		ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]: ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
	[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: false,
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: null,
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_TYPE]: "",
	...overrides
});

describe("mapGuideCategoriesToBackend", () => {
	it("skips fully empty synced rows", () => {
		const result = mapGuideCategoriesToBackend(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
							[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "",
							[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			}),
			1
		);

		expect(result).toEqual([]);
	});

	it("sends cost without currency (backend defaults USD)", () => {
		const result = mapGuideCategoriesToBackend(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: 100,
							[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "",
							[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			}),
			1
		);

		expect(result).toEqual([
			{
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 100 }
				}
			}
		]);
	});

	it("coerces numeric strings from inputs", () => {
		const result = mapGuideCategoriesToBackend(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PRICE_ROW_FIELD.COST]:
								"80" as unknown as number,
							[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "USD",
							[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			}),
			1
		);

		expect(result).toEqual([
			{
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 80, currency: "USD" }
				}
			}
		]);
	});

	it("sends lang-only category without expenses", () => {
		const result = mapGuideCategoriesToBackend(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
								{
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]:
										ENUM_LANGUAGES.ENGLISH,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: null,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: null,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]:
										"",
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
								}
							]
						}
					]
				}
			}),
			1
		);

		expect(result).toEqual([{ lang: LanguageCode.En }]);
	});

	it("includes currency when provided", () => {
		const result = mapGuideCategoriesToBackend(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: 50,
							[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: 10,
							[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "EUR",
							[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			}),
			1
		);

		expect(result).toEqual([
			{
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 60, currency: "EUR" }
				}
			}
		]);
	});
});
