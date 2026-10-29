import { describe, expect, it, vi } from "vitest";

import {
	ENUM_EXTRA_COST_FIELD,
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_FORM_SECTION,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_TYPE,
	GUIDE_ANY_LANGUAGE,
	GUIDE_MAX_PRICE_COLUMNS,
	createEmptyExtraCostRow
} from "../../types";

import { GUIDE_EDIT_SCHEMA } from "./guide-edit.schema";
import { GUIDES_SCHEMA } from "./guides.schema";
import { GUIDE_PRICING_SCHEMA } from "./pricing.schema";

vi.mock("@/shared/config", async () => {
	const { ENV } = await import("@/shared/config/constants/env.config");
	return {
		ENV,
		i18nKey: () => (key: string) => key
	};
});

const priceRow = (lang: string, costs: (number | null)[]) => ({
	[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: lang,
	[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: costs
});

const bounds = (...upToPax: (number | null)[]) =>
	upToPax.map((value) => ({
		[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX]: value
	}));

const basePricing = (overrides: Record<string, unknown> = {}) => ({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
		ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]: ENUM_GUIDE_CHARGE.PER_DURATION,
	[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: "USD",
	[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: [],
	[ENUM_GUIDE_PRICING_FIELD.ROWS]: [],
	[ENUM_GUIDE_PRICING_FIELD.FEES]: [],
	[ENUM_GUIDE_PRICING_FIELD.MARKUP]: null,
	[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]: [],
	[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]: false,
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: "",
	...overrides
});

const typTier = (upToPax: number | null) => ({
	[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
	[ENUM_FORM_GUIDES.UP_TO_PAX]: upToPax
});

const baseGuides = (overrides: Record<string, unknown> = {}) => ({
	[ENUM_FORM_GUIDES.DURATION_DAYS]: 1,
	[ENUM_FORM_GUIDES.TYP_TIERS]: [typTier(10)],
	...overrides
});

const issuePaths = (result: {
	success: boolean;
	error?: { issues: { path: PropertyKey[] }[] };
}) => (result.error?.issues ?? []).map((issue) => issue.path.join("."));

describe("GUIDES_SCHEMA", () => {
	it("passes with valid duration and tiers", () => {
		expect(GUIDES_SCHEMA.safeParse(baseGuides()).success).toBe(true);
	});

	it("allows no typ tiers", () => {
		expect(
			GUIDES_SCHEMA.safeParse(
				baseGuides({ [ENUM_FORM_GUIDES.TYP_TIERS]: [] })
			).success
		).toBe(true);
	});

	it("fails when duration_days is not positive or missing", () => {
		expect(
			GUIDES_SCHEMA.safeParse(
				baseGuides({ [ENUM_FORM_GUIDES.DURATION_DAYS]: 0 })
			).success
		).toBe(false);
		expect(
			issuePaths(
				GUIDES_SCHEMA.safeParse(
					baseGuides({ [ENUM_FORM_GUIDES.DURATION_DAYS]: null })
				)
			)
		).toEqual(["duration_days"]);
	});

	it("requires a tier bound", () => {
		const result = GUIDES_SCHEMA.safeParse(
			baseGuides({ [ENUM_FORM_GUIDES.TYP_TIERS]: [typTier(null)] })
		);
		expect(issuePaths(result)).toEqual(["typ_tiers.0.up_to_pax"]);
	});

	it("requires tier bounds to strictly grow", () => {
		const result = GUIDES_SCHEMA.safeParse(
			baseGuides({
				[ENUM_FORM_GUIDES.TYP_TIERS]: [typTier(10), typTier(10)]
			})
		);
		expect(issuePaths(result)).toEqual(["typ_tiers.1.up_to_pax"]);
	});
});

describe("GUIDE_PRICING_SCHEMA", () => {
	it("requires package_id when invoicing is part of package", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
					ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE
			})
		);
		expect(issuePaths(result)).toEqual(["package_id"]);
	});

	it("passes a full matrix and a language without prices", () => {
		expect(
			GUIDE_PRICING_SCHEMA.safeParse(
				basePricing({
					[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(6, 15),
					[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
						priceRow("english", [40, 60, 80]),
						priceRow("russian", [null, null, null]),
						priceRow(GUIDE_ANY_LANGUAGE, [30, 30, 30])
					]
				})
			).success
		).toBe(true);
	});

	it("requires a language and rejects one priced twice, the fallback too", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					priceRow("", [10]),
					priceRow(GUIDE_ANY_LANGUAGE, [10]),
					priceRow(GUIDE_ANY_LANGUAGE, [10])
				]
			})
		);
		expect(issuePaths(result)).toEqual(["rows.0.lang", "rows.2.lang"]);
	});

	it("rejects a partly priced row and a price dropping with the group", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(6, 15),
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					priceRow("english", [40, null, 80]),
					priceRow("russian", [40, 30, 50])
				]
			})
		);
		expect(issuePaths(result)).toEqual([
			"rows.0.costs.1",
			"rows.1.costs.1"
		]);
	});

	it("requires whole, strictly growing bounds", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(10, 10, null, 2.5)
			})
		);
		expect(issuePaths(result)).toEqual([
			"bounds.1.up_to_pax",
			"bounds.2.up_to_pax",
			"bounds.3.up_to_pax"
		]);
	});

	it("caps the number of columns", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(
					...Array.from(
						{ length: GUIDE_MAX_PRICE_COLUMNS },
						(_, index) => index + 1
					)
				)
			})
		);
		expect(issuePaths(result)).toEqual(["bounds"]);
	});

	it("ignores bounds and later columns for the whole-engagement charge", () => {
		expect(
			GUIDE_PRICING_SCHEMA.safeParse(
				basePricing({
					[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]:
						ENUM_GUIDE_CHARGE.FIXED,
					[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(null),
					[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
						priceRow("english", [300, null])
					]
				})
			).success
		).toBe(true);
	});

	it("requires a currency once something is priced", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: undefined,
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [priceRow("english", [50])]
			})
		);
		expect(issuePaths(result)).toEqual(["currency"]);
	});

	it("requires a named, priced extra cost", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]: [
					{
						...createEmptyExtraCostRow(),
						[ENUM_EXTRA_COST_FIELD.NAME]: "  "
					}
				]
			})
		);
		expect(issuePaths(result)).toEqual([
			"extra_costs.0.name",
			"extra_costs.0.cost"
		]);
	});

	it("skips matrix checks when invoicing is part of package", () => {
		expect(
			GUIDE_PRICING_SCHEMA.safeParse(
				basePricing({
					[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
						ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE,
					[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: "pkg-1",
					[ENUM_GUIDE_PRICING_FIELD.ROWS]: [priceRow("", [10])]
				})
			).success
		).toBe(true);
	});

	it("rejects a percentage markup out of range", () => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.MARKUP]: {
					typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
					value: "150"
				}
			})
		);
		expect(issuePaths(result)).toEqual(["markup.value"]);
	});

	it.each(["-5", "abc"])("rejects a fixed markup of %s", (value) => {
		const result = GUIDE_PRICING_SCHEMA.safeParse(
			basePricing({
				[ENUM_GUIDE_PRICING_FIELD.MARKUP]: {
					typ: ENUM_GUIDE_MARKUP_TYP.FIXED,
					value
				}
			})
		);
		expect(issuePaths(result)).toEqual(["markup.value"]);
	});
});

describe("GUIDE_EDIT_SCHEMA", () => {
	it("reports the pricing section, not guides, for a pricing error", () => {
		const result = GUIDE_EDIT_SCHEMA.safeParse({
			[ENUM_GUIDE_FORM_SECTION.GUIDES]: baseGuides(),
			[ENUM_GUIDE_FORM_SECTION.PRICING]: basePricing({
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [priceRow("", [])]
			}),
			[ENUM_GUIDE_FORM_SECTION.NAME]: "Guide event",
			[ENUM_GUIDE_FORM_SECTION.DAY]: 1,
			[ENUM_GUIDE_FORM_SECTION.POSITION]: 0
		});
		expect(issuePaths(result)).toEqual(["pricing.rows.0.lang"]);
	});
});
