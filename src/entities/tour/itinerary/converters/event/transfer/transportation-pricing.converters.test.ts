import { describe, expect, it, vi } from "vitest";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import {
	ENUM_TRANSPORTATION_MARKUP_TYP,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type TTransferDetailsBackend,
	type TTransportationPricingSchema
} from "../../../types";

import {
	mapTransportationPricingFromBackend,
	mapTransportationPricingToBackend
} from "./transportation-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

type TTransferPoolSpec = TTransferDetailsBackend["pool"][number]["spec"];

const wholeTransferDetails = (
	charge: Extract<TTransferPoolSpec, { pricing: "whole" }>["charge"]
): TTransferDetailsBackend => ({
	plan: { typ: null, departure: null, arrival: null },
	pool: [
		{
			id: "supply-1",
			is_main: true,
			supply: { source: "inline", supplier_id: null },
			spec: {
				pricing: "whole",
				images: [],
				name: null,
				cars: [],
				charge
			}
		}
	]
});

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
	it("maps a whole-ride fixed charge from spec.charge", () => {
		expect(
			mapTransportationPricingFromBackend(
				wholeTransferDetails({
					typ: "fixed",
					cost: { val: 150, currency: ENUM_CURRENCY_BACKEND.USD },
					fees: null,
					extra_costs: [],
					markup: {
						typ: "fixed",
						cost: { val: 12, currency: ENUM_CURRENCY_BACKEND.USD }
					}
				})
			)
		).toMatchObject({
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: true,
			markup: { typ: ENUM_TRANSPORTATION_MARKUP_TYP.FIXED, value: "12" }
		});
	});

	it("writes markup to a whole-ride fixed charge when flag on", () => {
		expect(
			mapTransportationPricingToBackend(
				basePricing({
					[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]: 150,
					[ENUM_TRANSPORTATION_PRICING_FIELD.FEES]: [
						{
							name: null,
							cost: 8,
							currency: "USD",
							description: null
						}
					],
					[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]:
						ENUM_CURRENCY_BACKEND.USD,
					[ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: {
						typ: ENUM_TRANSPORTATION_MARKUP_TYP.FIXED,
						value: "12"
					}
				})
			).spec
		).toMatchObject({
			pricing: "whole",
			charge: {
				typ: "fixed",
				markup: {
					typ: "fixed",
					cost: { val: 12, currency: ENUM_CURRENCY_BACKEND.USD }
				}
			}
		});
	});

	it("writes markup to a whole-ride per_person charge when flag on", () => {
		expect(
			mapTransportationPricingToBackend(
				basePricing({
					[ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_TRANSPORTATION_PRICING_TYPE.PER_PERSON,
					[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]: 40,
					[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]:
						ENUM_CURRENCY_BACKEND.EUR,
					[ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: {
						typ: ENUM_TRANSPORTATION_MARKUP_TYP.PERCENTAGE,
						value: "5"
					}
				})
			).spec
		).toMatchObject({
			pricing: "whole",
			charge: {
				typ: "per_person",
				markup: { typ: "percentage", percentage: 0.05 }
			}
		});
	});
});

describe("transportation per_car write (fe6.4 §5, §6)", () => {
	const cars = [
		{ id: "car-1", car_name: "sedan", pax: 3, description: "" },
		{ car_name: "minivan", pax: 6, description: "" }
	] as Parameters<typeof mapTransportationPricingToBackend>[1];

	const perCarPricing = (costs: (number | null)[]) =>
		basePricing({
			[ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR,
			[ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES]: {
				typ: "per_car",
				cars: costs.map((cost) => ({
					cost,
					fees: [],
					currency: "USD",
					markup: null
				}))
			}
		} as Partial<TTransportationPricingSchema>);

	it("echoes the car id and never invents pax", () => {
		const { spec } = mapTransportationPricingToBackend(
			perCarPricing([50, 80]),
			cars
		);

		expect(spec).toMatchObject({
			pricing: "per_car",
			cars: [
				{ id: "car-1", pax: 3, charge: { cost: { val: 50 } } },
				{ pax: 6, charge: { cost: { val: 80 } } }
			]
		});
		expect((spec as { cars: object[] }).cars[1]).not.toHaveProperty("id");
	});

	it("falls back to the unpriced category arm instead of a zero price", () => {
		const { spec } = mapTransportationPricingToBackend(
			perCarPricing([50, null]),
			cars
		);

		expect(spec).toMatchObject({
			pricing: "per_car_category",
			cars: [{ id: "car-1", pax: 3 }, { pax: 6 }]
		});
		expect(JSON.stringify(spec)).not.toContain('"val":0');
	});
});
