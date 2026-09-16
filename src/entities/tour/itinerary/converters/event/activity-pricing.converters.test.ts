import { describe, expect, it, vi } from "vitest";

import { Currency } from "@/shared/api";
import type { ActivityDetailsOutput } from "@/shared/api";

import {
	ENUM_ACTIVITY_MARKUP_TYP,
	ENUM_ACTIVITY_PRICING_FIELD,
	ENUM_ACTIVITY_PRICING_INVOICING,
	ENUM_ACTIVITY_PRICING_TYPE,
	ENUM_FEE_FIELD,
	type TActivityPricingSchema,
	createEmptyFeeRow
} from "../../types";

import {
	mapActivityPricingFromBackend,
	mapActivityPricingToBackend
} from "./activity-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

const feeRow = (cost: number, currency: string) => ({
	...createEmptyFeeRow(),
	[ENUM_FEE_FIELD.COST]: cost,
	[ENUM_FEE_FIELD.CURRENCY]: currency as "USD" | "EUR"
});

type TActivityPoolSpec = ActivityDetailsOutput["pool"][number]["spec"];

const activityDetails = (
	charge: NonNullable<TActivityPoolSpec> extends {
		offerings: infer O;
	}
		? O extends Array<infer I>
			? I extends { charge: infer C }
				? C
				: never
			: never
		: never
): ActivityDetailsOutput => ({
	plan: {},
	pool: [
		{
			id: "supply-1",
			is_main: true,
			supply: { source: "inline", supplier_id: null },
			spec: {
				sub_typ: "food",
				images: [],
				name: null,
				location: null,
				offerings: [
					{
						id: "off-1",
						name: null,
						charge,
						menu: []
					}
				]
			}
		}
	]
});

const basePricing = (
	overrides: Partial<TActivityPricingSchema> = {}
): TActivityPricingSchema => ({
	[ENUM_ACTIVITY_PRICING_FIELD.INVOICING]:
		ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_ACTIVITY_PRICING_FIELD.PRICING_TYPE]:
		ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
	[ENUM_ACTIVITY_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: null,
	[ENUM_ACTIVITY_PRICING_FIELD.PACKAGE_ID]: "",
	...overrides
});

describe("mapActivityPricingFromBackend", () => {
	it("returns defaults without a charge", () => {
		expect(mapActivityPricingFromBackend(null)).toEqual({
			invoicing: ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: false,
			markup: null,
			package_id: ""
		});
	});

	it("maps a fixed offering charge from spec.offerings[0]", () => {
		expect(
			mapActivityPricingFromBackend(
				activityDetails({
					typ: "fixed",
					cost: { val: 100, currency: Currency.USD },
					fees: null,
					extra_costs: [],
					markup: {
						typ: "fixed",
						cost: { val: 10, currency: Currency.USD }
					}
				})
			)
		).toMatchObject({
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: true,
			total_price: 100,
			currency: Currency.USD,
			markup: { typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED, value: "10" }
		});
	});

	it("maps a per_person offering charge from spec.offerings[0]", () => {
		expect(
			mapActivityPricingFromBackend(
				activityDetails({
					typ: "per_person",
					cost_per_person: { val: 50, currency: Currency.EUR },
					fees: [
						{
							name: null,
							description: null,
							cost: { val: 5, currency: Currency.EUR }
						}
					],
					extra_costs: [],
					markup: { typ: "percentage", percentage: 0.15 }
				})
			)
		).toMatchObject({
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON,
			add_margin_separately: true,
			total_price: 50,
			fees: [feeRow(5, "EUR")],
			currency: Currency.EUR,
			markup: { typ: ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE, value: "15" }
		});
	});
});

describe("mapActivityPricingToBackend", () => {
	it("writes markup to a fixed charge when flag on", () => {
		expect(
			mapActivityPricingToBackend(
				basePricing({
					[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE]: 100,
					[ENUM_ACTIVITY_PRICING_FIELD.FEES]: [feeRow(5, "USD")],
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_ACTIVITY_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
						value: "10"
					}
				})
			).charge
		).toEqual({
			typ: "fixed",
			cost: { val: 100, currency: Currency.USD },
			fees: [
				{
					name: null,
					description: null,
					cost: { val: 5, currency: Currency.USD }
				}
			],
			markup: {
				typ: "fixed",
				cost: { val: 10, currency: Currency.USD }
			}
		});
	});

	it("writes null markup when flag off", () => {
		expect(
			mapActivityPricingToBackend(
				basePricing({
					[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE]: 100,
					[ENUM_ACTIVITY_PRICING_FIELD.FEES]: [feeRow(5, "USD")],
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
						value: "10"
					}
				})
			).charge
		).toMatchObject({
			typ: "fixed",
			markup: null
		});
	});

	it("writes markup to a per_person charge when flag on", () => {
		expect(
			mapActivityPricingToBackend(
				basePricing({
					[ENUM_ACTIVITY_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON,
					[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE]: 80,
					[ENUM_ACTIVITY_PRICING_FIELD.FEES]: [feeRow(4, "EUR")],
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.EUR,
					[ENUM_ACTIVITY_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE,
						value: "20"
					}
				})
			).charge
		).toEqual({
			typ: "per_person",
			cost_per_person: { val: 80, currency: Currency.EUR },
			fees: [
				{
					name: null,
					description: null,
					cost: { val: 4, currency: Currency.EUR }
				}
			],
			markup: { typ: "percentage", percentage: 0.2 }
		});
	});

	it("writes markup without taxes like accommodation", () => {
		expect(
			mapActivityPricingToBackend(
				basePricing({
					[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE]: 100,
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_ACTIVITY_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
						value: "10"
					}
				})
			).charge
		).toEqual({
			typ: "fixed",
			cost: { val: 100, currency: Currency.USD },
			fees: null,
			markup: {
				typ: "fixed",
				cost: { val: 10, currency: Currency.USD }
			}
		});
	});
});
