import { describe, expect, it, vi } from "vitest";

import { Currency, HousingRoomTypes } from "@/shared/api";

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
	type TAccommodationPricingSchema
} from "../../types";

import { mapAccommodationPricingToBackend } from "./accommodation-pricing.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

vi.mock("@/entities/commission", () => ({
	DEFAULT_EVENT_CURRENCY: "USD"
}));

const roomsList = [
	{
		[ENUM_FORM_ROOMS.ROOM_NAME]: HousingRoomTypes.Double,
		[ENUM_FORM_ROOMS.DESCRIPTION]: "Double"
	}
];

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
	[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE]: "",
	...overrides
});

describe("mapAccommodationPricingToBackend", () => {
	it("returns empty payload without pricing", () => {
		expect(mapAccommodationPricingToBackend(undefined, roomsList)).toEqual(
			{}
		);
	});

	it("returns empty payload for part_of_package invoicing", () => {
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
		).toEqual({});
	});

	it("maps flat_rate with total_price, taxes and currency", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
						ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_ACCOMMODATION_PRICING_FIELD.TAXES]: 20,
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
				}),
				roomsList
			)
		).toEqual({
			details: {
				expenses: {
					typ: "fixed",
					cost: { val: 250, currency: Currency.USD },
					fees: {
						typ: "fixed",
						cost: { val: 20, currency: Currency.USD }
					},
					markup: null
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
		).toEqual({
			details: {
				expenses: {
					typ: "fixed",
					cost: { val: 250, currency: Currency.USD },
					fees: null,
					markup: {
						typ: "fixed",
						cost: { val: 30, currency: Currency.USD }
					}
				}
			}
		});
	});

	it("returns empty payload for flat_rate without currency", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 250,
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: ""
				}),
				roomsList
			)
		).toEqual({});
	});

	it("returns empty payload for flat_rate without total_price", () => {
		expect(
			mapAccommodationPricingToBackend(
				basePricing({
					[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
				}),
				roomsList
			)
		).toEqual({});
	});

	it("maps per_person with total_price and currency", () => {
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
		).toEqual({
			details: {
				expenses: {
					typ: "per_person",
					cost_per_person: { val: 80, currency: Currency.EUR },
					fees: null,
					markup: null
				}
			}
		});
	});

	it("maps per_room with cost and currency", () => {
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
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: 10,
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
		).toEqual({
			details: {
				expenses: {
					typ: "per_room",
					rooms: [
						{
							typ: HousingRoomTypes.Double,
							description: "Double",
							expenses: {
								typ: "fixed",
								cost: { val: 150, currency: Currency.USD },
								fees: {
									typ: "fixed",
									cost: { val: 10, currency: Currency.USD }
								},
								markup: null
							}
						}
					]
				}
			}
		});
	});

	it("omits per_room expenses when cost is set without currency", () => {
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
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: null,
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
									"",
								[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]:
									null
							}
						]
					}
				}),
				roomsList
			)
		).toEqual({
			details: {
				expenses: {
					typ: "per_room",
					rooms: [
						{
							typ: HousingRoomTypes.Double,
							description: "Double",
							expenses: undefined
						}
					]
				}
			}
		});
	});

	it("maps per_room by class into per_room_category", () => {
		expect(
			mapAccommodationPricingToBackend(
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
												"Standard",
											[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: 200,
											[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]:
												null,
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
			)
		).toEqual({
			details: {
				expenses: {
					typ: "per_room_category",
					rooms: [
						{
							typ: HousingRoomTypes.Double,
							description: "Double",
							categories: [
								{
									name: "Standard",
									expenses: {
										typ: "fixed",
										cost: {
											val: 200,
											currency: Currency.USD
										},
										fees: null,
										markup: null
									}
								}
							]
						}
					]
				}
			}
		});
	});

	it("does not send flat_rate fields when active tab is per_room", () => {
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
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
								Currency.USD,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			}),
			roomsList
		);

		expect(result.details?.expenses).toMatchObject({ typ: "per_room" });
		expect(result.details?.expenses).not.toMatchObject({ typ: "fixed" });
	});
});
