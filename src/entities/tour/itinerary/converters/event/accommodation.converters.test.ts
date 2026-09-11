import { describe, expect, it, vi } from "vitest";

import {
	AmenitiesTypes,
	Currency,
	HousingRoomTypes,
	LanguageCode
} from "@/shared/api";

import {
	ENUM_ACCOMMODATION_AMENITY,
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_EVENT_BACKEND,
	ENUM_FORM_ROOMS,
	ENUM_HOUSING_SOURCE,
	type TCustomHousingDetailsInputBackend
} from "../../types";

import { mapRoomsFromBackend } from "./accommodation-rooms.converters";
import {
	mapAccommodationEventToForm,
	mapAccommodationFormToUpdate
} from "./accommodation.converters";

vi.mock("@/shared/config", () => ({
	ENV: { VITE_API_URL: "http://localhost" },
	i18nKey: () => (key: string) => key,
	ENUM_LOCAL_STORAGE: { IS_AUTH: "is_auth" }
}));

vi.mock("@/shared/converters", () => ({
	mapBackendLocationToGeoForm: () => null,
	mapGeoFormToBackendLocation: () => null,
	languageCodeMapper: {
		to: () => LanguageCode.En
	}
}));

vi.mock("@/shared/hooks", () => ({
	getDeviceUtcOffset: () => 0
}));

const ROOM_ID = "68375727-0000-0000-0000-000000000001";

const roomsList = [
	{
		[ENUM_FORM_ROOMS.ROOM_NAME]: "Deluxe",
		[ENUM_FORM_ROOMS.DESCRIPTION]: "Deluxe class"
	}
];

const getHousingExpenses = (
	details: ReturnType<typeof mapAccommodationFormToUpdate>["details"]
) =>
	(details as TCustomHousingDetailsInputBackend | null | undefined)?.expenses;

describe("mapRoomsFromBackend", () => {
	it("maps per_room_category category.name to rooms.rooms[].room_name", () => {
		expect(
			mapRoomsFromBackend(undefined, [
				{
					name: "Deluxe",
					rooms: [
						{
							typ: HousingRoomTypes.Double,
							pax: 2
						}
					]
				}
			])
		).toEqual({
			rooms: [
				{
					room_name: "Deluxe",
					description: ""
				}
			]
		});
	});

	it("does not map room.typ into rooms.rooms[].room_name", () => {
		const result = mapRoomsFromBackend(undefined, [
			{
				name: "Deluxe",
				rooms: [{ typ: HousingRoomTypes.Double }]
			}
		]);

		expect(result.rooms[0]?.room_name).toBe("Deluxe");
		expect(result.rooms[0]?.room_name).not.toBe(HousingRoomTypes.Double);
	});

	it("echoes room id from per_room backend rooms", () => {
		expect(
			mapRoomsFromBackend([
				{
					id: ROOM_ID,
					name: "Deluxe",
					description: "Deluxe class"
				}
			])
		).toEqual({
			rooms: [
				{
					id: ROOM_ID,
					room_name: "Deluxe",
					description: "Deluxe class"
				}
			]
		});
	});
});

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
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 300,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "fixed",
			cost: { val: 300, currency: Currency.USD },
			fees: null,
			markup: null
		});
		expect(result).not.toHaveProperty("day");
		expect(result).not.toHaveProperty("position");
		expect(result.details).not.toHaveProperty("source");
		expect(result.details).not.toHaveProperty("product");
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
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 80,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.EUR
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "per_person",
			cost_per_person: { val: 80, currency: Currency.EUR },
			fees: null,
			markup: null
		});
	});

	it("keeps per_room expenses from pricing tab with class name", () => {
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
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: {
					typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM,
					[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: [
						{
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: 120,
							[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: [],
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
				{
					name: "Deluxe",
					description: "Deluxe class",
					expenses: {
						typ: "fixed",
						cost: { val: 120, currency: Currency.USD },
						fees: null,
						markup: null
					}
				}
			]
		});
	});

	it("echoes room id on per_room fallback without pricing expenses", () => {
		const result = mapAccommodationFormToUpdate({
			name: "Hotel",
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.PART_OF_PACKAGE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 300,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			},
			rooms: {
				[ENUM_FORM_ROOMS.ROOMS_LIST]: [
					{
						[ENUM_FORM_ROOMS.ID]: ROOM_ID,
						[ENUM_FORM_ROOMS.ROOM_NAME]: "Deluxe",
						[ENUM_FORM_ROOMS.DESCRIPTION]: "Deluxe class"
					}
				]
			}
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "per_room",
			rooms: [
				{
					id: ROOM_ID,
					name: "Deluxe",
					description: "Deluxe class"
				}
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
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 300,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			},
			rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: roomsList }
		});

		expect(getHousingExpenses(result.details)).toEqual({
			typ: "per_room",
			rooms: [
				{
					name: "Deluxe",
					description: "Deluxe class"
				}
			]
		});
	});
});

describe("mapAccommodationEventToForm — inherited", () => {
	it("fills product_id/source and does not treat product as custom expenses", () => {
		const form = mapAccommodationEventToForm({
			id: "e11e0000-0000-0000-0000-000000000001",
			tour_option_id: "0pt00000-0000-0000-0000-000000000001",
			event: {
				typ: ENUM_EVENT_BACKEND.HOUSING,
				day: 1,
				position: 0,
				name: "Ночёвка",
				description: null,
				package_id: null,
				details: {
					product_id: "b0c1c0de-0000-0000-0000-000000000001",
					variant_id: "a2f30000-0000-0000-0000-000000000001",
					source: "inherited",
					override: null,
					duration: 2,
					check_in: { time: "11:00:00" },
					check_out: { time: "12:00:00" },
					product: {
						typ: "hotel",
						id: "b0c1c0de-0000-0000-0000-000000000001",
						supplier_id: "5upp0000-0000-0000-0000-000000000001",
						name: "Hyatt",
						location: { lat: 41.311, long: 69.279 },
						amenities: [AmenitiesTypes.Wifi],
						variants: [
							{
								typ: "hotel",
								id: "a2f30000-0000-0000-0000-000000000001",
								name: "Deluxe",
								rooms: [
									{
										id: "68375727-0000-0000-0000-000000000001",
										typ: HousingRoomTypes.Double,
										images: [],
										expenses: null,
										rates: null
									}
								]
							}
						]
					}
				}
			}
		} as never);

		expect(form.product_id).toBe("b0c1c0de-0000-0000-0000-000000000001");
		expect(form.variant_id).toBe("a2f30000-0000-0000-0000-000000000001");
		expect(form.source).toBe(ENUM_HOUSING_SOURCE.INHERITED);
		expect(form.has_override).toBe(false);
		expect(form.general.length_of_stay).toBe(2);
		expect(form.general.check_in_time).toBe("11:00:00");
		expect(form.general.amenities).toEqual([
			ENUM_ACCOMMODATION_AMENITY.WIFI
		]);
		expect(form.rooms.rooms[0]).toMatchObject({
			id: "68375727-0000-0000-0000-000000000001",
			room_name: HousingRoomTypes.Double
		});
		expect(form.pricing.invoicing).toBe(
			ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
		);
	});
});

describe("mapAccommodationFormToUpdate — inherited", () => {
	it("sends tour half only", () => {
		const body = mapAccommodationFormToUpdate({
			name: "Ночёвка",
			product_id: "b0c1c0de-0000-0000-0000-000000000001",
			variant_id: null,
			source: ENUM_HOUSING_SOURCE.INHERITED,
			has_override: false,
			general: {
				property: null,
				amenities: [ENUM_ACCOMMODATION_AMENITY.WIFI],
				description: "у окна",
				length_of_stay: 2,
				check_in_time: "11:00",
				check_in_timezone: "+05:00",
				check_out_time: "12:00",
				check_out_timezone: "+05:00"
			},
			rooms: {
				rooms: [{ room_name: "double", description: "" }]
			},
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 300,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			}
		});

		expect(body.typ).toBe("housing");
		expect(body.details).toMatchObject({
			product_id: "b0c1c0de-0000-0000-0000-000000000001",
			variant_id: null,
			duration: 2
		});
		expect(body.details).not.toHaveProperty("source");
		expect(body.details).not.toHaveProperty("expenses");
		expect(body.details).not.toHaveProperty("location");
		expect(body.details).not.toHaveProperty("amenities");
		expect(body).not.toHaveProperty("day");
		expect(body).not.toHaveProperty("position");
		expect(body.description).toBe("у окна");
	});
});

describe("mapAccommodationFormToUpdate — custom regression", () => {
	it("still sends location without product_id", () => {
		const body = mapAccommodationFormToUpdate({
			name: "Custom",
			source: ENUM_HOUSING_SOURCE.CUSTOM,
			general: {
				property: null,
				amenities: [],
				description: "",
				length_of_stay: 1,
				check_in_time: "14:00",
				check_in_timezone: "0",
				check_out_time: "12:00",
				check_out_timezone: "0"
			},
			rooms: { rooms: roomsList },
			pricing: {
				[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]:
					ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]:
					ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
				[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: null,
				[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: "",
				[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]: 100,
				[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: Currency.USD
			}
		});

		expect(body.details).not.toHaveProperty("product_id");
		expect(body.details).toHaveProperty("location");
	});
});
