import { describe, expect, it, vi } from "vitest";

import { Currency, HousingRoomTypes } from "@/shared/api";
import type { HousingDetailsOutput } from "@/shared/api";

import {
	ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD,
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_MARKUP_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FORM_ROOMS,
	ENUM_HOUSING_ROOM_TYPE,
	type TAccommodationPricingSchema
} from "../../../types";

import {
	mapAccommodationPricingFromBackend,
	mapAccommodationPricingToBackend
} from "./accommodation-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

vi.mock("@/entities/commission", () => ({
	DEFAULT_EVENT_CURRENCY: "USD",
	ENUM_CURRENCY_OPTIONS: {
		UZS: "UZS",
		USD: "USD",
		EUR: "EUR",
		RUB: "RUB",
		GBP: "GBP"
	},
	currencyConverter: {
		from: (v: unknown) => v,
		to: (v: unknown) => v
	}
}));

const roomsList = [
	{
		[ENUM_FORM_ROOMS.ROOM_NAME]: "Deluxe",
		[ENUM_FORM_ROOMS.DESCRIPTION]: "Deluxe class"
	}
];

const roomsOnlySpec = {
	spec: {
		pricing: "per_room" as const,
		categories: [
			{
				name: null,
				rooms: [
					{
						typ: HousingRoomTypes.Double,
						pax: 2,
						name: "Deluxe",
						description: "Deluxe class",
						rate: {
							base: {
								typ: "fixed" as const,
								cost: { val: 0, currency: Currency.USD }
							}
						}
					}
				]
			}
		]
	}
};

const namedCategoryDetails = (): HousingDetailsOutput => ({
	plan: {},
	supply: { source: "inline", supplier_id: null },
	spec: {
		pricing: "per_room",
		images: [],
		name: null,
		location: null,
		stars: null,
		typs: [],
		amenities: [],
		policy: null,
		categories: [
			{
				id: "cat-1",
				name: "Deluxe",
				rooms: [
					{
						id: "room-1",
						images: [],
						typ: HousingRoomTypes.Double,
						pax: 2,
						name: null,
						description: null,
						rate: {
							base: {
								typ: "fixed",
								cost: { val: 200, currency: Currency.USD },
								fees: null,
								extra_costs: [],
								markup: null
							},
							seasons: []
						}
					}
				]
			}
		]
	}
});

const basePricing = (
	overrides: Partial<TAccommodationPricingSchema> = {}
): TAccommodationPricingSchema => ({
	[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
		ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
		ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
	[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
	[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
	[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
	...overrides
});

describe("mapAccommodationPricingFromBackend", () => {
	it("maps a named category into class-priced per-room rows", () => {
		const result = mapAccommodationPricingFromBackend(
			namedCategoryDetails(),
			roomsList
		);

		expect(result.price_based_on_class).toBe(true);
		expect(result.expenses).toMatchObject({
			typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY,
			[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: [
				{
					[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: [
						{
							[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]:
								ENUM_HOUSING_ROOM_TYPE.DOUBLE,
							[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: 200
						}
					]
				}
			]
		});
	});
});

describe("mapAccommodationPricingToBackend", () => {
	it("returns a rooms-only spec without pricing", () => {
		expect(mapAccommodationPricingToBackend(undefined, roomsList)).toEqual(
			roomsOnlySpec
		);
	});

	it("returns a rooms-only spec for part_of_package invoicing", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
						ENUM_ACCOMMODATION_PRICING_INVOICING.PART_OF_PACKAGE,
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 100,
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
				}),
				roomsList
			)
		).toEqual(roomsOnlySpec);
	});

	it("maps flat_rate to a whole spec with price.base", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: [
						{
							name: null,
							cost: 20,
							currency: "USD",
							description: null
						}
					],
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
				}),
				roomsList
			)
		).toMatchObject({
			spec: {
				pricing: "whole",
				price: {
					base: {
						typ: "fixed",
						cost: { val: 250, currency: Currency.USD },
						fees: [
							{
								name: null,
								description: null,
								cost: { val: 20, currency: Currency.USD }
							}
						],
						markup: null
					}
				}
			}
		});
	});

	it("maps flat_rate with unique markup", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
					[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: true,
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD,
					[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: {
						typ: ENUM_ACCOMMODATION_MARKUP_TYP.FIXED,
						value: "30"
					}
				}),
				roomsList
			)
		).toMatchObject({
			spec: {
				pricing: "whole",
				price: {
					base: {
						typ: "fixed",
						cost: { val: 250, currency: Currency.USD },
						fees: null,
						markup: {
							typ: "fixed",
							cost: { val: 30, currency: Currency.USD }
						}
					}
				}
			}
		});
	});

	it("returns a rooms-only spec for flat_rate without currency", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: undefined
				}),
				roomsList
			)
		).toEqual(roomsOnlySpec);
	});

	it("returns a rooms-only spec for flat_rate without total_price", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
				}),
				roomsList
			)
		).toEqual(roomsOnlySpec);
	});

	it("maps per_person to a whole spec", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON,
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 80,
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.EUR
				}),
				roomsList
			)
		).toMatchObject({
			spec: {
				pricing: "whole",
				price: {
					base: {
						typ: "per_person",
						cost_per_person: { val: 80, currency: Currency.EUR },
						fees: null,
						markup: null
					}
				}
			}
		});
	});

	it("maps per_room with class name and currency", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM,
					[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: {
						typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM,
						[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: [
							{
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: 150,
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: [
									{
										name: null,
										cost: 10,
										currency: "USD",
										description: null
									}
								],
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
									Currency.USD,
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]:
									null
							}
						]
					}
				}),
				roomsList
			)
		).toMatchObject({
			spec: {
				pricing: "per_room",
				categories: [
					{
						name: null,
						rooms: [
							{
								name: "Deluxe",
								description: "Deluxe class",
								rate: {
									base: {
										typ: "fixed",
										cost: {
											val: 150,
											currency: Currency.USD
										}
									}
								}
							}
						]
					}
				]
			}
		});
	});

	it("never puts HousingRoomTypes into backend category.name", () => {
		const result = mapAccommodationPricingToBackend(
			basePricing({
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: true,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY,
					[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: [
						{
							[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]:
								[
									{
										[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]:
											ENUM_HOUSING_ROOM_TYPE.DOUBLE,
										[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: 100,
										[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]:
											[],
										[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]:
											Currency.USD,
										[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]:
											null
									}
								]
						}
					]
				}
			}),
			roomsList
		);

		expect(result.spec).toMatchObject({ pricing: "per_room" });
		if (result.spec?.pricing === "per_room") {
			expect(result.spec.categories?.[0]?.name).toBe("Deluxe");
			expect(result.spec.categories?.[0]?.name).not.toBe(
				HousingRoomTypes.Double
			);
			expect(result.spec.categories?.[0]?.rooms?.[0]?.typ).toBe(
				HousingRoomTypes.Double
			);
		}
	});

	it("does not send a whole-arm charge when the active tab is per_room", () => {
		const result = mapAccommodationPricingToBackend(
			basePricing({
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM,
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 999,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM,
					[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: [
						{
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: 40,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: [],
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
								Currency.USD,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			}),
			roomsList
		);

		expect(result.spec?.pricing).toBe("per_room");
		expect(result.spec).not.toMatchObject({ pricing: "whole" });
	});
});
