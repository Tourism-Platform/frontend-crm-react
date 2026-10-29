import { describe, expect, it, vi } from "vitest";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import {
	ENUM_LANGUAGES,
	ENUM_LANGUAGES_BACKEND
} from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_EXTRA_COST_FIELD,
	ENUM_EXTRA_COST_MODE,
	ENUM_FEE_FIELD,
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	GUIDE_ANY_LANGUAGE,
	type IGuidePriceRow,
	type TGuideByLanguageCategoryInputBackend,
	type TGuideDetailsBackend,
	type TGuidePricingSchema,
	createEmptyExtraCostRow,
	createEmptyFeeRow
} from "../../../types";

import {
	getDefaultGuidePricing,
	mapGuideCategoriesToBackend,
	mapGuidePricingFromBackend
} from "./guide-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

const USD = ENUM_CURRENCY_BACKEND.USD;
const EN = ENUM_LANGUAGES_BACKEND.ENGLISH;
const RU = ENUM_LANGUAGES_BACKEND.RUSSIAN;

const usd = (val: number) => ({ val, currency: USD });

const row = (lang: string, costs: (number | null)[]): IGuidePriceRow => ({
	[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: lang,
	[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: costs
});

const pricing = (
	overrides: Partial<TGuidePricingSchema> = {}
): TGuidePricingSchema => ({
	...getDefaultGuidePricing(),
	[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: "USD",
	...overrides
});

const bounds = (...upToPax: (number | null)[]) =>
	upToPax.map((value) => ({
		[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX]: value
	}));

const perGroup = (tiers: [number, number][]) => ({
	typ: "per_duration" as const,
	rate: {
		typ: "per_group" as const,
		tiers: tiers.map(([up_to_pax, val]) => ({ up_to_pax, cost: usd(val) }))
	},
	fees: null,
	extra_costs: []
});

const guideDetails = (
	categories: TGuideByLanguageCategoryInputBackend[]
): TGuideDetailsBackend =>
	({
		plan: { duration: 1 },
		pool: [
			{
				id: "supply-1",
				is_main: true,
				supply: { source: "inline", supplier_id: null },
				spec: { name: null, typ_tiers: [], categories }
			}
		]
	}) as TGuideDetailsBackend;

describe("mapGuideCategoriesToBackend", () => {
	it("writes one category per language with the shared tiers (fe6.6 §9.1)", () => {
		const result = mapGuideCategoriesToBackend(
			pricing({
				[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(6, 15),
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					row(ENUM_LANGUAGES.ENGLISH, [40, 60, 80]),
					row(ENUM_LANGUAGES.RUSSIAN, [30, 45, 60])
				]
			})
		);

		expect(result).toEqual([
			{
				lang: EN,
				expenses: perGroup([
					[6, 40],
					[15, 60],
					[16, 80]
				])
			},
			{
				lang: RU,
				expenses: perGroup([
					[6, 30],
					[15, 45],
					[16, 60]
				])
			}
		]);
	});

	it("writes a single day rate as one open tier", () => {
		const [category] = mapGuideCategoriesToBackend(
			pricing({
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					row(ENUM_LANGUAGES.ENGLISH, [50])
				]
			})
		);

		expect(category.expenses).toEqual(perGroup([[1, 50]]));
	});

	it("writes the whole-engagement charge with fees, markup and extra costs (fe6.6 §9.2)", () => {
		const [category] = mapGuideCategoriesToBackend(
			pricing({
				[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]: ENUM_GUIDE_CHARGE.FIXED,
				// Kept from the per-day mode, ignored by the flat charge.
				[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(6),
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					row(GUIDE_ANY_LANGUAGE, [1200, 1500])
				],
				[ENUM_GUIDE_PRICING_FIELD.FEES]: [
					{
						...createEmptyFeeRow(),
						[ENUM_FEE_FIELD.NAME]: "Permit",
						[ENUM_FEE_FIELD.COST]: 10
					}
				],
				[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
				[ENUM_GUIDE_PRICING_FIELD.MARKUP]: {
					typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
					value: "10"
				},
				[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]: [
					{
						...createEmptyExtraCostRow(),
						[ENUM_EXTRA_COST_FIELD.NAME]: "Guide meals",
						[ENUM_EXTRA_COST_FIELD.COST]: 25
					}
				]
			})
		);

		expect(category).toEqual({
			lang: null,
			expenses: {
				typ: "fixed",
				cost: usd(1200),
				fees: [{ name: "Permit", description: null, cost: usd(10) }],
				markup: { typ: "percentage", percentage: 0.1 },
				extra_costs: [
					{
						name: "Guide meals",
						expense: {
							typ: "per_duration",
							rate: { typ: "fixed", cost: usd(25) }
						}
					}
				]
			}
		});
	});

	it("drops the markup unless it is added separately", () => {
		const [category] = mapGuideCategoriesToBackend(
			pricing({
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					row(ENUM_LANGUAGES.ENGLISH, [50])
				],
				[ENUM_GUIDE_PRICING_FIELD.MARKUP]: {
					typ: ENUM_GUIDE_MARKUP_TYP.FIXED,
					value: "5"
				}
			})
		);

		expect(category.expenses).not.toHaveProperty("markup");
	});

	it("keeps a language without prices and drops a priceless fallback", () => {
		const result = mapGuideCategoriesToBackend(
			pricing({
				[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
					row(ENUM_LANGUAGES.ENGLISH, [null]),
					row(GUIDE_ANY_LANGUAGE, [null])
				]
			})
		);

		expect(result).toEqual([{ lang: EN, expenses: null }]);
	});
});

describe("mapGuidePricingFromBackend", () => {
	it("returns the defaults for a spec without categories", () => {
		expect(mapGuidePricingFromBackend(guideDetails([]))).toEqual(
			getDefaultGuidePricing()
		);
	});

	it("reads languages into one matrix and back without loss", () => {
		const categories = [
			{
				lang: EN,
				expenses: perGroup([
					[6, 40],
					[15, 60],
					[16, 80]
				])
			},
			{
				lang: RU,
				expenses: perGroup([
					[6, 30],
					[15, 45],
					[16, 60]
				])
			},
			{ lang: ENUM_LANGUAGES_BACKEND.FRENCH, expenses: null }
		];

		const form = mapGuidePricingFromBackend(guideDetails(categories));

		expect(form).toMatchObject({
			[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]:
				ENUM_GUIDE_CHARGE.PER_DURATION,
			[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: "USD",
			[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: bounds(6, 15),
			[ENUM_GUIDE_PRICING_FIELD.ROWS]: [
				row(ENUM_LANGUAGES.ENGLISH, [40, 60, 80]),
				row(ENUM_LANGUAGES.RUSSIAN, [30, 45, 60]),
				row(ENUM_LANGUAGES.FRENCH, [null, null, null])
			],
			[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]: false
		});
		expect(mapGuideCategoriesToBackend(form)).toEqual(categories);
	});

	it("reads the open last tier as one past the last bound", () => {
		const form = mapGuidePricingFromBackend(
			guideDetails([
				{
					lang: null,
					expenses: perGroup([
						[10, 50],
						[99, 120]
					])
				}
			])
		);

		expect(form[ENUM_GUIDE_PRICING_FIELD.ROWS]).toEqual([
			row(GUIDE_ANY_LANGUAGE, [50, 120])
		]);
		expect(mapGuideCategoriesToBackend(form)[0].expenses).toEqual(
			perGroup([
				[10, 50],
				[11, 120]
			])
		);
	});

	it("flags languages priced in different shapes and resamples them", () => {
		const form = mapGuidePricingFromBackend(
			guideDetails([
				{
					lang: EN,
					expenses: perGroup([
						[6, 40],
						[99, 80]
					])
				},
				{
					lang: RU,
					expenses: {
						typ: "per_duration",
						rate: { typ: "fixed", cost: usd(35) },
						fees: null,
						markup: null,
						extra_costs: []
					}
				}
			])
		);

		expect(form[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]).toBe(true);
		expect(form[ENUM_GUIDE_PRICING_FIELD.ROWS]).toEqual([
			row(ENUM_LANGUAGES.ENGLISH, [40, 80]),
			row(ENUM_LANGUAGES.RUSSIAN, [35, 35])
		]);
	});

	it("flags a per-person day rate", () => {
		const form = mapGuidePricingFromBackend(
			guideDetails([
				{
					lang: EN,
					expenses: {
						typ: "per_duration",
						rate: { typ: "per_person", cost_per_person: usd(7) },
						fees: null,
						markup: null,
						extra_costs: []
					}
				}
			])
		);

		expect(form[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]).toBe(true);
	});

	it("reads a percentage markup without floating-point noise", () => {
		const form = mapGuidePricingFromBackend(
			guideDetails([
				{
					lang: EN,
					expenses: {
						...perGroup([[1, 50]]),
						markup: { typ: "percentage", percentage: 0.07 }
					}
				}
			])
		);

		expect(form[ENUM_GUIDE_PRICING_FIELD.MARKUP]).toEqual({
			typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
			value: "7"
		});
		expect(form[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]).toBe(true);
	});

	it("reads extra costs into editable lines", () => {
		const form = mapGuidePricingFromBackend(
			guideDetails([
				{
					lang: null,
					expenses: {
						typ: "fixed",
						cost: usd(1200),
						fees: null,
						markup: null,
						extra_costs: [
							{
								name: "Guide hotel",
								expense: {
									typ: "per_duration",
									rate: { typ: "fixed", cost: usd(40) }
								}
							}
						]
					}
				}
			])
		);

		expect(form[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]).toEqual([
			{
				...createEmptyExtraCostRow(),
				[ENUM_EXTRA_COST_FIELD.NAME]: "Guide hotel",
				[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE.PER_DAY,
				[ENUM_EXTRA_COST_FIELD.COST]: 40,
				[ENUM_EXTRA_COST_FIELD.CURRENCY]: "USD"
			}
		]);
	});
});
