import { describe, expect, it, vi } from "vitest";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_FORM_SECTION,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE,
	ENUM_GUIDE_TYPE
} from "../../types";

import { GUIDE_EDIT_SCHEMA } from "./guide-edit.schema";
import { GUIDES_SCHEMA } from "./guides.schema";
import { GUIDE_PRICING_SCHEMA } from "./pricing.schema";

vi.mock("@/shared/config", () => ({
	i18nKey: () => (key: string) => key
}));

/** Mirrors empty row from alignGuidePerGuideExpenses / createEmptyCategoryRow */
const emptyCategoryRow = () => ({
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: "",
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: "",
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
});

/** Mirrors empty row from alignGuidePerGuideExpenses / createEmptyPerGuidePriceRow */
const emptyPerGuideRow = () => ({
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: "",
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
});

const syncedPriceByLanguageExpenses = (guidesCount: number) => ({
	typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: Array.from(
		{ length: guidesCount },
		() => ({
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
				emptyCategoryRow()
			]
		})
	)
});

const syncedPerGuideExpenses = (guidesCount: number) => ({
	typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: Array.from(
		{ length: guidesCount },
		() => emptyPerGuideRow()
	)
});

const validGuide = (overrides?: {
	guide_type?: (typeof ENUM_GUIDE_TYPE)[keyof typeof ENUM_GUIDE_TYPE];
	duration_days?: number;
}) => ({
	[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
	[ENUM_FORM_GUIDES.DURATION_DAYS]: 1,
	...overrides
});

const basePricing = (overrides: Record<string, unknown> = {}) => ({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
		ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]: ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
	[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: false,
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: null,
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_TYPE]: "",
	...overrides
});

const buildGuideEditForm = (options: {
	guidesList: ReturnType<typeof validGuide>[];
	pricing?: Record<string, unknown>;
}) => ({
	[ENUM_GUIDE_FORM_SECTION.GUIDES]: {
		[ENUM_FORM_GUIDES.GUIDES_LIST]: options.guidesList
	},
	[ENUM_GUIDE_FORM_SECTION.PRICING]: options.pricing ?? basePricing(),
	[ENUM_GUIDE_FORM_SECTION.NAME]: "Guide event",
	[ENUM_GUIDE_FORM_SECTION.DAY]: 1,
	[ENUM_GUIDE_FORM_SECTION.POSITION]: 0
});

describe("GUIDES_SCHEMA", () => {
	it("fails when guides_list is empty", () => {
		const result = GUIDES_SCHEMA.safeParse({
			[ENUM_FORM_GUIDES.GUIDES_LIST]: []
		});

		expect(result.success).toBe(false);
	});

	it("fails when duration_days is not positive", () => {
		const result = GUIDES_SCHEMA.safeParse({
			[ENUM_FORM_GUIDES.GUIDES_LIST]: [validGuide({ duration_days: 0 })]
		});

		expect(result.success).toBe(false);
	});

	it("passes with a valid guide", () => {
		const result = GUIDES_SCHEMA.safeParse({
			[ENUM_FORM_GUIDES.GUIDES_LIST]: [validGuide()]
		});

		expect(result.success).toBe(true);
	});
});

describe("GUIDE_PRICING_SCHEMA", () => {
	it("skips expenses validation when invoicing is not individual", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
					ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: null
			})
		);

		expect(result.success).toBe(true);
	});

	it("allows empty language category after sync", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]:
					syncedPriceByLanguageExpenses(1)
			})
		);

		expect(result.success).toBe(true);
	});

	it("allows null expenses for individual/per_guide", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(basePricing());

		expect(result.success).toBe(true);
	});

	it("fails when markup is set without value and add_margin_separately is on", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
				[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
						{
							...emptyPerGuideRow(),
							[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: {
								typ: "fixed",
								value: ""
							}
						}
					]
				}
			})
		);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.path[0]).toBe(
				ENUM_GUIDE_PRICING_FIELD.EXPENSES
			);
		}
	});
});

describe("GUIDE_EDIT_SCHEMA — add guide must not force pricing", () => {
	it("passes when guides are valid and pricing is package (no expenses)", () => {
		const result = GUIDE_EDIT_SCHEMA.safeParse(
			buildGuideEditForm({
				guidesList: [validGuide()],
				pricing: basePricing({
					[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
						ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE
				})
			})
		);

		expect(result.success).toBe(true);
	});

	it("reports pricing section (not guides) when markup value is missing", () => {
		const result = GUIDE_EDIT_SCHEMA.safeParse(
			buildGuideEditForm({
				guidesList: [validGuide()],
				pricing: basePricing({
					[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
						typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
						[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: [
							{
								...emptyPerGuideRow(),
								[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: {
									typ: "percentage",
									value: "   "
								}
							}
						]
					}
				})
			})
		);

		expect(result.success).toBe(false);
		if (!result.success) {
			const sectionKeys = result.error.issues.map(
				(issue) => issue.path[0]
			);
			expect(sectionKeys).toContain(ENUM_GUIDE_FORM_SECTION.PRICING);
			expect(sectionKeys).not.toContain(ENUM_GUIDE_FORM_SECTION.GUIDES);
		}
	});

	it("allows adding a second guide with auto-synced empty price-by-language rows", () => {
		const guidesList = [
			validGuide(),
			validGuide({
				guide_type: ENUM_GUIDE_TYPE.ACCOMPANYING,
				duration_days: 2
			})
		];

		const result = GUIDE_EDIT_SCHEMA.safeParse(
			buildGuideEditForm({
				guidesList,
				pricing: basePricing({
					[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
					[ENUM_GUIDE_PRICING_FIELD.EXPENSES]:
						syncedPriceByLanguageExpenses(guidesList.length)
				})
			})
		);

		expect(result.success).toBe(true);
	});

	it("allows empty per-guide expense rows after sync (no price_by_language)", () => {
		const guidesList = [validGuide(), validGuide({ duration_days: 3 })];

		const result = GUIDE_EDIT_SCHEMA.safeParse(
			buildGuideEditForm({
				guidesList,
				pricing: basePricing({
					[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: false,
					[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: syncedPerGuideExpenses(
						guidesList.length
					)
				})
			})
		);

		expect(result.success).toBe(true);
	});

	it("allows valid guides with individual/per_guide and null expenses", () => {
		const result = GUIDE_EDIT_SCHEMA.safeParse(
			buildGuideEditForm({
				guidesList: [validGuide(), validGuide({ duration_days: 2 })],
				pricing: basePricing({
					[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: null
				})
			})
		);

		expect(result.success).toBe(true);
	});
});
