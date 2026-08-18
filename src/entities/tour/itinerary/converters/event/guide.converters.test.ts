import { describe, expect, it, vi } from "vitest";

import {
	Currency,
	type GuideDetailsOutput,
	GuideType,
	LanguageCode
} from "@/shared/api";

import { ENUM_LANGUAGES } from "@/entities/tour/landing/types/languages.types";

import { DEFAULT_GUIDE_UP_TO_PAX } from "../../config";
import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_FORM_SECTION,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE,
	ENUM_GUIDE_TYPE,
	type TGuideEditSchema
} from "../../types";
import { ENUM_EVENT_BACKEND } from "../../types/event-backend-enum.types";

import { mapGuidePricingFromBackend } from "./guide-pricing.converters";
import { mapGuideFormToUpdate } from "./guide.converters";
import { mapGuidesFromBackend } from "./guides.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

const baseForm = (
	overrides: Partial<TGuideEditSchema> = {}
): TGuideEditSchema => ({
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
					[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
					[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
					[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: undefined,
					[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
				}
			]
		},
		[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
	},
	...overrides
});

describe("mapGuidesFromBackend", () => {
	it("maps typ_tiers[0].typ to guide_type", () => {
		const result = mapGuidesFromBackend({
			duration: 2,
			typ_tiers: [{ up_to_pax: 15, typ: GuideType.Route }]
		});

		expect(result).toEqual({
			[ENUM_FORM_GUIDES.GUIDES_LIST]: [
				{
					[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.ACCOMPANYING,
					[ENUM_FORM_GUIDES.DURATION_DAYS]: 2
				}
			]
		});
	});

	it("defaults guide_type to local when typ_tiers is empty", () => {
		const result = mapGuidesFromBackend({ duration: 1, typ_tiers: [] });

		expect(result.guides_list[0].guide_type).toBe(ENUM_GUIDE_TYPE.LOCAL);
	});

	// Known Variant A limit: multi-tier typ_tiers is not editable in UI —
	// LOAD takes only the first tier; SAVE will rewrite a single DEFAULT tier.
	it("uses only the first typ_tiers entry when multiple exist", () => {
		const result = mapGuidesFromBackend({
			typ_tiers: [
				{ up_to_pax: 10, typ: GuideType.Local },
				{ up_to_pax: 20, typ: GuideType.Route }
			]
		});

		expect(result.guides_list[0].guide_type).toBe(ENUM_GUIDE_TYPE.LOCAL);
	});
});

describe("mapGuideFormToUpdate", () => {
	it("maps local guide_type to typ_tiers", () => {
		const result = mapGuideFormToUpdate(baseForm());

		expect(result.details).toMatchObject({
			duration: 1,
			typ_tiers: [
				{ up_to_pax: DEFAULT_GUIDE_UP_TO_PAX, typ: GuideType.Local }
			]
		});
		expect(result.details).not.toHaveProperty("typ");
	});

	it("maps accompanying guide_type to route typ_tiers", () => {
		const result = mapGuideFormToUpdate(
			baseForm({
				[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
					[ENUM_FORM_GUIDES.GUIDES_LIST]: [
						{
							[ENUM_FORM_GUIDES.GUIDE_TYPE]:
								ENUM_GUIDE_TYPE.ACCOMPANYING,
							[ENUM_FORM_GUIDES.DURATION_DAYS]: 3
						}
					]
				}
			})
		);

		expect(result.details).toMatchObject({
			duration: 3,
			typ_tiers: [
				{ up_to_pax: DEFAULT_GUIDE_UP_TO_PAX, typ: GuideType.Route }
			]
		});
	});

	it("omits empty categories so PATCH does not wipe backend prices", () => {
		const result = mapGuideFormToUpdate(
			baseForm({
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
								[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]:
									[
										{
											lang: "",
											cost: null,
											fees: null,
											currency: undefined,
											markup: null
										}
									]
							}
						]
					},
					[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
				}
			})
		);

		expect(result).toEqual({
			typ: ENUM_EVENT_BACKEND.GUIDE,
			package_id: null,
			name: "Guide",
			day: 1,
			position: 0,
			details: {
				typ_tiers: [
					{ up_to_pax: DEFAULT_GUIDE_UP_TO_PAX, typ: GuideType.Local }
				],
				duration: 1
			}
		});
		expect(result.details).not.toHaveProperty("categories");
	});

	it("maps flat cost to per_group tiers", () => {
		const result = mapGuideFormToUpdate(
			baseForm({
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
								[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "USD",
								[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
							}
						]
					},
					[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
				}
			})
		);

		expect(result.details).toEqual({
			typ_tiers: [
				{ up_to_pax: DEFAULT_GUIDE_UP_TO_PAX, typ: GuideType.Local }
			],
			duration: 1,
			categories: [
				{
					expenses: {
						typ: "per_group",
						tiers: [
							{
								up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
								cost: { val: 120, currency: Currency.USD }
							}
						]
					}
				}
			]
		});
	});

	it("maps language categories, fees and markup", () => {
		const result = mapGuideFormToUpdate(
			baseForm({
				[ENUM_GUIDE_FORM_SECTION.PRICING]: {
					[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
						ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
					[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]:
						ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
					[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
					[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
						typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
						[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
							{
								[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]:
									[
										{
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]:
												ENUM_LANGUAGES.ENGLISH,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: 120,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: 10,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]:
												"USD",
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]:
												{
													typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
													value: "10"
												}
										},
										{
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]:
												ENUM_LANGUAGES.RUSSIAN,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: 150,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]:
												null,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]:
												"EUR",
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]:
												null
										}
									]
							}
						]
					},
					[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
				}
			})
		);

		expect(
			(result.details as GuideDetailsOutput | null | undefined)
				?.categories
		).toEqual([
			{
				lang: LanguageCode.En,
				expenses: {
					typ: "per_group",
					tiers: [
						{
							up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
							cost: { val: 120, currency: Currency.USD }
						}
					],
					fees: {
						typ: "fixed",
						cost: { val: 10, currency: Currency.USD }
					},
					markup: { typ: "percentage", percentage: 0.1 }
				}
			},
			{
				lang: LanguageCode.Ru,
				expenses: {
					typ: "per_group",
					tiers: [
						{
							up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
							cost: { val: 150, currency: Currency.EUR }
						}
					]
				}
			}
		]);
	});
});

describe("mapGuidePricingFromBackend", () => {
	it("maps tiers[0] cost and keeps multiple languages in guides[0].categories", () => {
		const pricing = mapGuidePricingFromBackend(
			{
				categories: [
					{
						lang: LanguageCode.En,
						expenses: {
							typ: "per_group",
							tiers: [
								{
									up_to_pax: 15,
									cost: { val: 120, currency: Currency.USD }
								}
							],
							fees: {
								typ: "fixed",
								cost: { val: 5, currency: Currency.USD }
							},
							markup: { typ: "percentage", percentage: 0.1 }
						}
					},
					{
						lang: LanguageCode.Ru,
						expenses: {
							typ: "per_group",
							tiers: [
								{
									up_to_pax: 15,
									cost: { val: 150, currency: Currency.EUR }
								}
							]
						}
					}
				]
			},
			[
				{
					[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
					[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
				}
			]
		);

		expect(pricing.price_by_language).toBe(true);
		expect(pricing.add_margin_separately).toBe(true);
		expect(pricing.expenses).toEqual({
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
			guides: [
				{
					categories: [
						{
							lang: ENUM_LANGUAGES.ENGLISH,
							cost: 120,
							fees: 5,
							currency: "USD",
							markup: {
								typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
								value: "10"
							}
						},
						{
							lang: ENUM_LANGUAGES.RUSSIAN,
							cost: 150,
							fees: null,
							currency: "EUR",
							markup: null
						}
					]
				}
			]
		});
	});

	// Known Variant A limit: multi price tiers collapse to tiers[0] on LOAD.
	it("loads only the first price tier when multiple exist", () => {
		const pricing = mapGuidePricingFromBackend(
			{
				categories: [
					{
						expenses: {
							typ: "per_group",
							tiers: [
								{
									up_to_pax: 10,
									cost: { val: 100, currency: Currency.USD }
								},
								{
									up_to_pax: 20,
									cost: { val: 200, currency: Currency.USD }
								}
							]
						}
					}
				]
			},
			[
				{
					[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
					[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
				}
			]
		);

		expect(pricing.price_by_language).toBe(false);
		expect(pricing.expenses).toEqual({
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
			guides: [
				{
					cost: 100,
					fees: null,
					currency: "USD",
					markup: null
				}
			]
		});
	});
});

describe("guide converters round-trip", () => {
	it("FE form → backend → FE form preserves single-tier guide and languages", () => {
		const form = baseForm({
			[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
				[ENUM_FORM_GUIDES.GUIDES_LIST]: [
					{
						[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
						[ENUM_FORM_GUIDES.DURATION_DAYS]: 2
					}
				]
			},
			[ENUM_GUIDE_FORM_SECTION.PRICING]: {
				[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
					ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]:
					ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
				[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
				[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
								{
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]:
										ENUM_LANGUAGES.ENGLISH,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: 120,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: 10,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]:
										"USD",
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: {
										typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
										value: "10"
									}
								}
							]
						}
					]
				},
				[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
			}
		});

		const backend = mapGuideFormToUpdate(form);
		const details = backend.details as
			| GuideDetailsOutput
			| null
			| undefined;
		const guides = mapGuidesFromBackend(details);
		const pricing = mapGuidePricingFromBackend(details, guides.guides_list);

		expect(guides.guides_list[0]).toEqual({
			guide_type: ENUM_GUIDE_TYPE.LOCAL,
			duration_days: 2
		});
		expect(pricing.price_by_language).toBe(true);
		expect(pricing.add_margin_separately).toBe(true);
		expect(pricing.expenses).toEqual(form.pricing.expenses);
	});
});
