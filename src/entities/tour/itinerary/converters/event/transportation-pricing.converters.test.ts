import { describe, expect, it, vi } from "vitest";

import { Currency } from "@/shared/api";

import {
	ENUM_TRANSPORTATION_MARKUP_TYP,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type TTransportationPricingSchema
} from "../../types";

import {
	mapTransportationPricingFromBackend,
	mapTransportationPricingToBackend
} from "./transportation-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

const basePricing = (
	overrides: Partial<TTransportationPricingSchema> = {}
): TTransportationPricingSchema => ({
	[ENUM_TRANSPORTATION_PRICING_FIELD.INVOICING]:
		ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE]:
		ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
	[ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
	[ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES]: null,
	[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: null,
	[ENUM_TRANSPORTATION_PRICING_FIELD.PACKAGE_ID]: "",
	...overrides
});

describe("transportation flat/per_person markup", () => {
	it("maps fixed expenses markup from backend", () => {
		expect(
			mapTransportationPricingFromBackend({
				expenses: {
					typ: "fixed",
					cost: { val: 150, currency: Currency.USD },
					fees: null,
					markup: {
						typ: "fixed",
						cost: { val: 12, currency: Currency.USD }
					}
				}
			})
		).toMatchObject({
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: true,
			markup: { typ: ENUM_TRANSPORTATION_MARKUP_TYP.FIXED, value: "12" }
		});
	});

	it("writes markup to fixed charge when flag on", () => {
		expect(
			mapTransportationPricingToBackend(
				basePricing({
					[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]: 150,
					[ENUM_TRANSPORTATION_PRICING_FIELD.TAXES]: 8,
					[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: {
						typ: ENUM_TRANSPORTATION_MARKUP_TYP.FIXED,
						value: "12"
					}
				})
			).details?.expenses
		).toMatchObject({
			typ: "fixed",
			markup: {
				typ: "fixed",
				cost: { val: 12, currency: Currency.USD }
			}
		});
	});

	it("writes markup to per_person charge when flag on", () => {
		expect(
			mapTransportationPricingToBackend(
				basePricing({
					[ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_TRANSPORTATION_PRICING_TYPE.PER_PERSON,
					[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]: 40,
					[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]: Currency.EUR,
					[ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: {
						typ: ENUM_TRANSPORTATION_MARKUP_TYP.PERCENTAGE,
						value: "5"
					}
				})
			).details?.expenses
		).toMatchObject({
			typ: "per_person",
			markup: { typ: "percentage", percentage: 0.05 }
		});
	});
});
