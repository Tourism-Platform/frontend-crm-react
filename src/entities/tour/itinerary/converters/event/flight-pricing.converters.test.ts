import { describe, expect, it, vi } from "vitest";

import { Currency } from "@/shared/api";

import {
	ENUM_FEE_FIELD,
	ENUM_FLIGHT_MARKUP_TYP,
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE,
	type TFlightPricingSchema,
	createEmptyFeeRow
} from "../../types";

import {
	mapFlightPricingFromBackend,
	mapFlightPricingToBackend
} from "./flight-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

const feeRow = (cost: number, currency: string) => ({
	...createEmptyFeeRow(),
	[ENUM_FEE_FIELD.COST]: cost,
	[ENUM_FEE_FIELD.CURRENCY]: currency as "USD" | "EUR"
});

const basePricing = (
	overrides: Partial<TFlightPricingSchema> = {}
): TFlightPricingSchema => ({
	[ENUM_FLIGHT_PRICING_FIELD.INVOICING]:
		ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_FLIGHT_PRICING_FIELD.PRICING_TYPE]:
		ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
	[ENUM_FLIGHT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: null,
	[ENUM_FLIGHT_PRICING_FIELD.PACKAGE_ID]: "",
	...overrides
});

describe("mapFlightPricingFromBackend", () => {
	it("maps fixed expenses markup from backend", () => {
		expect(
			mapFlightPricingFromBackend({
				expenses: {
					typ: "fixed",
					cost: { val: 200, currency: Currency.USD },
					fees: null,
					markup: {
						typ: "fixed",
						cost: { val: 25, currency: Currency.USD }
					}
				}
			})
		).toMatchObject({
			pricing_type: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: true,
			markup: { typ: ENUM_FLIGHT_MARKUP_TYP.FIXED, value: "25" }
		});
	});
});

describe("mapFlightPricingToBackend", () => {
	it("writes markup to fixed charge when flag on", () => {
		expect(
			mapFlightPricingToBackend(
				basePricing({
					[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]: 200,
					[ENUM_FLIGHT_PRICING_FIELD.FEES]: [feeRow(10, "USD")],
					[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_FLIGHT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: {
						typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
						value: "25"
					}
				})
			).details?.expenses
		).toMatchObject({
			typ: "fixed",
			fees: [
				{
					name: null,
					description: null,
					cost: { val: 10, currency: Currency.USD }
				}
			],
			markup: {
				typ: "fixed",
				cost: { val: 25, currency: Currency.USD }
			}
		});
	});

	it("writes markup to per_person charge when flag on", () => {
		expect(
			mapFlightPricingToBackend(
				basePricing({
					[ENUM_FLIGHT_PRICING_FIELD.PRICING_TYPE]:
						ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
					[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]: 90,
					[ENUM_FLIGHT_PRICING_FIELD.FEES]: [feeRow(3, "EUR")],
					[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: Currency.EUR,
					[ENUM_FLIGHT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: {
						typ: ENUM_FLIGHT_MARKUP_TYP.PERCENTAGE,
						value: "10"
					}
				})
			).details?.expenses
		).toMatchObject({
			typ: "per_person",
			markup: { typ: "percentage", percentage: 0.1 }
		});
	});

	it("writes markup without taxes like accommodation", () => {
		expect(
			mapFlightPricingToBackend(
				basePricing({
					[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]: 200,
					[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_FLIGHT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: {
						typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
						value: "25"
					}
				})
			).details?.expenses
		).toEqual({
			typ: "fixed",
			cost: { val: 200, currency: Currency.USD },
			fees: null,
			markup: {
				typ: "fixed",
				cost: { val: 25, currency: Currency.USD }
			}
		});
	});
});
