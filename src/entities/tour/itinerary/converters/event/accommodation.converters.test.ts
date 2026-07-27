import { describe, expect, it, vi } from "vitest";

import {
	Currency,
	type HousingDetailsSchemaInput,
	HousingRoomTypes
} from "@/shared/api";

import {
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FORM_ROOMS
} from "../../types";

import { mapAccommodationFormToUpdate } from "./accommodation.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key
}));

vi.mock("@/shared/converters", () => ({
	mapBackendLocationToGeoForm: () => null,
	mapGeoFormToBackendLocation: () => null
}));

vi.mock("@/shared/hooks", () => ({
	getDeviceUtcOffset: () => 0
}));

const roomsList = [
	{
		[ENUM_FORM_ROOMS.ROOM_NAME]: HousingRoomTypes.Double,
		[ENUM_FORM_ROOMS.DESCRIPTION]: "Double"
	}
];

const getHousingExpenses = (
	details: ReturnType<typeof mapAccommodationFormToUpdate>["details"]
) => (details as HousingDetailsSchemaInput | null | undefined)?.expenses;

describe("mapAccommodationFormToUpdate — pricing by active tab", () => {
	it("keeps flat_rate expenses when rooms are also in the form", () => {
		const result = mapAccommodationFormToUpdate({
			name: "Hotel",
			day: 1,
			position: 0,
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 300,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "fixed",
			cost: { val: 300, currency: Currency.USD }
		});
	});

	it("keeps per_person expenses when rooms are also in the form", () => {
		const result = mapAccommodationFormToUpdate({
			name: "Hotel",
			day: 1,
			position: 0,
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 80,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.EUR
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "per_person",
			cost_per_person: { val: 80, currency: Currency.EUR }
		});
	});

	it("keeps per_room expenses from pricing tab", () => {
		const result = mapAccommodationFormToUpdate({
			name: "Hotel",
			day: 1,
			position: 0,
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM,
					[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: [
						{
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: 120,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: null,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
								Currency.USD,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
						}
					]
				}
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toMatchObject({
			typ: "per_room",
			rooms: [
				expect.objectContaining({
					expenses: {
						typ: "fixed",
						cost: { val: 120, currency: Currency.USD }
					}
				})
			]
		});
	});

	it("falls back to rooms shell when package invoicing has no pricing expenses", () => {
		const result = mapAccommodationFormToUpdate({
			name: "Hotel",
			day: 1,
			position: 0,
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.PART_OF_PACKAGE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 300,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "per_room",
			rooms: [
				{
					typ: HousingRoomTypes.Double,
					description: "Double"
				}
			]
		});
	});
});
