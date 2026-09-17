import { describe, expect, it, vi } from "vitest";

import { Currency, GuideType, LanguageCode } from "@/shared/api";
import type { GuideDetailsOutput, GuideSpecInput } from "@/shared/api";

import { ENUM_LANGUAGES } from "@/entities/tour/landing/types/languages.types";

import { DEFAULT_GUIDE_UP_TO_PAX } from "../../../config";
import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_CHARGE,
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
} from "../../../types";
import { ENUM_EVENT_BACKEND } from "../../../types/event-backend-enum.types";

import { mapGuidePricingFromBackend } from "./guide-pricing.converters";
import { mapGuideFormToUpdate } from "./guide.converters";
import { mapGuidesFromBackend } from "./guides.converters";

const expectGuideWrite = (result: ReturnType<typeof mapGuideFormToUpdate>) => {
	if (result.typ !== "guide" || result.details == null) {
		throw new Error("expected a guide write body");
	}
	return result.details;
};

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
					[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]:
						ENUM_GUIDE_CHARGE.PER_DURATION,
					[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
					[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: [],
					[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: undefined,
					[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
				}
			]
		},
		[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: ""
	},
	...overrides
});

type TGuideSpec = NonNullable<GuideDetailsOutput["pool"][number]["spec"]>;

const guideReadDetails = (
	spec: TGuideSpec,
	plan: GuideDetailsOutput["plan"] = {}
): GuideDetailsOutput => ({
	plan,
	pool: [
		{
			id: "supply-1",
			is_main: true,
			supply: { source: "inline", supplier_id: null },
			spec
		}
	]
});

const inlineGuidePool = (spec: GuideSpecInput) => [
	{ supply: { source: "inline" as const, spec } }
];

describe("mapGuidesFromBackend", () => {
	it("maps typ_tiers entries to guides_list", () => {
		const result = mapGuidesFromBackend(
			guideReadDetails(
				{
					name: null,
					typ_tiers: [{ up_to_pax: 15, typ: GuideType.Route }],
					categories: []
				},
				{ duration: 2 }
			)
		);

		expect(result).toEqual({
			[ENUM_FORM_GUIDES.GUIDES_LIST]: [
				{
					[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.ACCOMPANYING,
					[ENUM_FORM_GUIDES.DURATION_DAYS]: 2
				}
			]
		});
	});

	it("returns empty guides_list when typ_tiers is empty", () => {
		const result = mapGuidesFromBackend(
			guideReadDetails(
				{ name: null, typ_tiers: [], categories: [] },
				{ duration: 1 }
			)
		);

		expect(result.guides_list).toEqual([]);
	});

	it("maps every typ_tiers entry to guides_list", () => {
		const result = mapGuidesFromBackend(
			guideReadDetails(
				{
					name: null,
					typ_tiers: [
						{ up_to_pax: 10, typ: GuideType.Local },
						{ up_to_pax: 20, typ: GuideType.Route }
					],
					categories: []
				},
				{ duration: 3 }
			)
		);

		expect(result.guides_list).toEqual([
			{
				[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
				[ENUM_FORM_GUIDES.DURATION_DAYS]: 3
			},
			{
				[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.ACCOMPANYING,
				[ENUM_FORM_GUIDES.DURATION_DAYS]: 3
			}
		]);
	});
});

describe("mapGuideFormToUpdate", () => {
	it("maps local guide_type to typ_tiers", () => {
		const result = mapGuideFormToUpdate(baseForm());

		expect(result.details).toMatchObject({
			plan: { duration: 1 },
			pool: inlineGuidePool({
				typ_tiers: [
					{
						up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
						typ: GuideType.Local
					}
				]
			})
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
			plan: { duration: 3 },
			pool: inlineGuidePool({
				typ_tiers: [
					{
						up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
						typ: GuideType.Route
					}
				]
			})
		});
	});

	it("preserves up_to_pax from currentDetails when mapping all tiers", () => {
		const result = mapGuideFormToUpdate(
			baseForm({
				[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
					[ENUM_FORM_GUIDES.GUIDES_LIST]: [
						{
							[ENUM_FORM_GUIDES.GUIDE_TYPE]:
								ENUM_GUIDE_TYPE.LOCAL,
							[ENUM_FORM_GUIDES.DURATION_DAYS]: 2
						},
						{
							[ENUM_FORM_GUIDES.GUIDE_TYPE]:
								ENUM_GUIDE_TYPE.ACCOMPANYING,
							[ENUM_FORM_GUIDES.DURATION_DAYS]: 2
						}
					]
				}
			}),
			undefined,
			guideReadDetails({
				name: null,
				typ_tiers: [
					{ up_to_pax: 10, typ: GuideType.Local },
					{ up_to_pax: 20, typ: GuideType.Route }
				],
				categories: []
			})
		);

		expect(result.details).toMatchObject({
			plan: { duration: 2 },
			pool: inlineGuidePool({
				typ_tiers: [
					{ up_to_pax: 10, typ: GuideType.Local },
					{ up_to_pax: 20, typ: GuideType.Route }
				]
			})
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
											charge_typ:
												ENUM_GUIDE_CHARGE.PER_DURATION,
											cost: null,
											fees: [],
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
			details: {
				plan: { duration: 1 },
				pool: inlineGuidePool({
					typ_tiers: [
						{
							up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
							typ: GuideType.Local
						}
					]
				})
			}
		});
		const details = expectGuideWrite(result);
		expect(details.pool?.[0]?.supply).toMatchObject({ source: "inline" });
		if (details.pool?.[0]?.supply?.source === "inline") {
			expect(details.pool[0].supply.spec).not.toHaveProperty(
				"categories"
			);
		}
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
								[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]:
									ENUM_GUIDE_CHARGE.PER_DURATION,
								[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: 120,
								[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: [],
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
			plan: { duration: 1 },
			pool: inlineGuidePool({
				typ_tiers: [
					{
						up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
						typ: GuideType.Local
					}
				],
				categories: [
					{
						expenses: {
							typ: "per_duration",
							rate: {
								typ: "per_group",
								tiers: [
									{
										up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
										cost: {
											val: 120,
											currency: Currency.USD
										}
									}
								]
							},
							fees: null
						}
					}
				]
			})
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
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.CHARGE_TYP]:
												ENUM_GUIDE_CHARGE.PER_DURATION,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: 120,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]:
												[
													{
														name: null,
														cost: 10,
														currency: "USD",
														description: null
													}
												],
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
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.CHARGE_TYP]:
												ENUM_GUIDE_CHARGE.PER_DURATION,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: 150,
											[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]:
												[],
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

		const details = expectGuideWrite(result);
		expect(
			details.pool?.[0]?.supply?.source === "inline"
				? details.pool[0].supply.spec?.categories
				: undefined
		).toEqual([
			{
				lang: LanguageCode.En,
				expenses: {
					typ: "per_duration",
					rate: {
						typ: "per_group",
						tiers: [
							{
								up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
								cost: { val: 120, currency: Currency.USD }
							}
						]
					},
					fees: [
						{
							name: null,
							description: null,
							cost: { val: 10, currency: Currency.USD }
						}
					],
					markup: { typ: "percentage", percentage: 0.1 }
				}
			},
			{
				lang: LanguageCode.Ru,
				expenses: {
					typ: "per_duration",
					rate: {
						typ: "per_group",
						tiers: [
							{
								up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
								cost: { val: 150, currency: Currency.EUR }
							}
						]
					},
					fees: null
				}
			}
		]);
	});
});

describe("mapGuidePricingFromBackend", () => {
	it("maps tiers[0] cost and keeps multiple languages in guides[0].categories", () => {
		const pricing = mapGuidePricingFromBackend(
			guideReadDetails({
				name: null,
				typ_tiers: [],
				categories: [
					{
						lang: LanguageCode.En,
						expenses: {
							typ: "per_duration",
							rate: {
								typ: "per_group",
								tiers: [
									{
										up_to_pax: 15,
										cost: {
											val: 120,
											currency: Currency.USD
										}
									}
								]
							},
							fees: [
								{
									name: null,
									description: null,
									cost: { val: 5, currency: Currency.USD }
								}
							],
							extra_costs: [],
							markup: { typ: "percentage", percentage: 0.1 }
						}
					},
					{
						lang: LanguageCode.Ru,
						expenses: {
							typ: "per_duration",
							rate: {
								typ: "per_group",
								tiers: [
									{
										up_to_pax: 15,
										cost: {
											val: 150,
											currency: Currency.EUR
										}
									}
								]
							},
							fees: null,
							extra_costs: [],
							markup: null
						}
					}
				]
			}),
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
							charge_typ: ENUM_GUIDE_CHARGE.PER_DURATION,
							cost: 120,
							fees: [
								{
									name: null,
									cost: 5,
									currency: "USD",
									description: null
								}
							],
							currency: "USD",
							markup: {
								typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
								value: "10"
							}
						},
						{
							lang: ENUM_LANGUAGES.RUSSIAN,
							charge_typ: ENUM_GUIDE_CHARGE.PER_DURATION,
							cost: 150,
							fees: [],
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
			guideReadDetails({
				name: null,
				typ_tiers: [],
				categories: [
					{
						lang: null,
						expenses: {
							typ: "per_duration",
							rate: {
								typ: "per_group",
								tiers: [
									{
										up_to_pax: 10,
										cost: {
											val: 100,
											currency: Currency.USD
										}
									},
									{
										up_to_pax: 20,
										cost: {
											val: 200,
											currency: Currency.USD
										}
									}
								]
							},
							fees: null,
							extra_costs: [],
							markup: null
						}
					}
				]
			}),
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
					charge_typ: ENUM_GUIDE_CHARGE.PER_DURATION,
					cost: 100,
					fees: [],
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
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.CHARGE_TYP]:
										ENUM_GUIDE_CHARGE.PER_DURATION,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: 120,
									[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: [
										{
											name: null,
											cost: 10,
											currency: "USD",
											description: null
										}
									],
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

		const write = expectGuideWrite(mapGuideFormToUpdate(form));

		expect(write.plan?.duration).toBe(2);
		expect(write.pool?.[0]?.supply?.source).toBe("inline");
		if (write.pool?.[0]?.supply?.source === "inline") {
			expect(write.pool[0].supply.spec?.typ_tiers?.[0]?.typ).toBe(
				GuideType.Local
			);
			expect(write.pool[0].supply.spec?.categories).toHaveLength(1);
		}
	});
});
