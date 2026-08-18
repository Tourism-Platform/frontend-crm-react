import { describe, expect, it, vi } from "vitest";

import { Currency } from "@/shared/api";

import {
	ENUM_ACTIVITY_MARKUP_TYP,
	ENUM_ACTIVITY_PRICING_FIELD,
	ENUM_ACTIVITY_PRICING_INVOICING,
	ENUM_ACTIVITY_PRICING_TYPE,
	type TActivityPricingSchema
} from "../../types";

import {
	mapActivityPricingFromBackend,
	mapActivityPricingToBackend
} from "./activity-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

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
	it("returns defaults without expenses", () => {
		expect(mapActivityPricingFromBackend(null)).toEqual({
			invoicing: ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: false,
			markup: null,
			package_id: ""
		});
	});

	it("maps fixed expenses markup from backend", () => {
		expect(
			mapActivityPricingFromBackend({
				expenses: {
					typ: "fixed",
					cost: { val: 100, currency: Currency.USD },
					fees: null,
					markup: {
						typ: "fixed",
						cost: { val: 10, currency: Currency.USD }
					}
				}
			})
		).toMatchObject({
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: true,
			total_price: 100,
			currency: Currency.USD,
			markup: { typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED, value: "10" }
		});
	});

	it("maps per_person expenses markup from backend", () => {
		expect(
			mapActivityPricingFromBackend({
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 50, currency: Currency.EUR },
					fees: {
						typ: "fixed",
						cost: { val: 5, currency: Currency.EUR }
					},
					markup: { typ: "percentage", percentage: 0.15 }
				}
			})
		).toMatchObject({
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON,
			add_margin_separately: true,
			total_price: 50,
			taxes: 5,
			currency: Currency.EUR,
			markup: { typ: ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE, value: "15" }
		});
	});
});

describe("mapActivityPricingToBackend", () => {
	it("writes markup to fixed charge when flag on", () => {
		expect(
			mapActivityPricingToBackend(
				basePricing({
					[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE]: 100,
					[ENUM_ACTIVITY_PRICING_FIELD.TAXES]: 5,
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_ACTIVITY_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
						value: "10"
					}
				})
			).details?.expenses
		).toEqual({
			typ: "fixed",
			cost: { val: 100, currency: Currency.USD },
			fees: {
				typ: "fixed",
				cost: { val: 5, currency: Currency.USD }
			},
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
					[ENUM_ACTIVITY_PRICING_FIELD.TAXES]: 5,
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
						value: "10"
					}
				})
			).details?.expenses
		).toMatchObject({
			typ: "fixed",
			markup: null
		});
	});

	it("writes markup to per_person charge when flag on", () => {
		expect(
			mapActivityPricingToBackend(
				basePricing({
					[ENUM_ACTIVITY_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON,
					[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE]: 80,
					[ENUM_ACTIVITY_PRICING_FIELD.TAXES]: 4,
					[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY]: Currency.EUR,
					[ENUM_ACTIVITY_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE,
						value: "20"
					}
				})
			).details?.expenses
		).toEqual({
			typ: "per_person",
			cost_per_person: { val: 80, currency: Currency.EUR },
			fees: {
				typ: "fixed",
				cost: { val: 4, currency: Currency.EUR }
			},
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
			).details?.expenses
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
