import { describe, expect, it, vi } from "vitest";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_FORM_SECTION,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE,
	ENUM_GUIDE_TYPE
} from "../../types";

import { mapGuideFormToUpdate } from "./guide.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

describe("mapGuideFormToUpdate", () => {
	it("omits empty categories so PATCH does not wipe backend prices", () => {
		const result = mapGuideFormToUpdate({
			[ENUM_GUIDE_FORM_SECTION.NAME]: "Guide",
			[ENUM_GUIDE_FORM_SECTION.DAY]: 1,
			[ENUM_GUIDE_FORM_SECTION.POSITION]: 0,
			[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
				[ENUM_FORM_GUIDES.GUIDES_LIST]: [
					{
						[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
						[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
					}
				]
			},
			[ENUM_GUIDE_FORM_SECTION.PRICING]: {
				[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
					ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]:
					ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
				[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
				[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
								{
									lang: "",
									cost: null,
									fees: null,
									currency: "",
									markup: null
								}
							]
						}
					]
				},
				[ENUM_GUIDE_PRICING_FIELD.PACKAGE_TYPE]: ""
			}
		});

		expect(result).toEqual({
			typ: "8",
			name: "Guide",
			day: 1,
			position: 0,
			details: { duration: 1 }
		});
		expect(result.details).not.toHaveProperty("categories");
	});

	it("includes categories when cost is filled without currency", () => {
		const result = mapGuideFormToUpdate({
			[ENUM_GUIDE_FORM_SECTION.NAME]: "Guide",
			[ENUM_GUIDE_FORM_SECTION.DAY]: 1,
			[ENUM_GUIDE_FORM_SECTION.POSITION]: 0,
			[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
				[ENUM_FORM_GUIDES.GUIDES_LIST]: [
					{
						[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
						[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
					}
				]
			},
			[ENUM_GUIDE_FORM_SECTION.PRICING]: {
				[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
					ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]:
					ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
				[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: false,
				[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: 120,
							[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "",
							[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				},
				[ENUM_GUIDE_PRICING_FIELD.PACKAGE_TYPE]: ""
			}
		});

		expect(result.details).toEqual({
			duration: 1,
			categories: [
				{
					expenses: {
						typ: "per_person",
						cost_per_person: { val: 120 }
					}
				}
			]
		});
	});
});
