import { describe, expect, it, vi } from "vitest";

import {
	AmenitiesTypes,
	Currency,
	HousingRoomTypes,
	LanguageCode,
	TranslationState
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
	ENUM_HOUSING_SOURCE
} from "../../../types";

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

const ZERO_FIXED = {
	typ: "fixed" as const,
	cost: { val: 0, currency: Currency.USD },
	fees: null,
	extra_costs: [] as [],
	markup: null
};

const inlineSpec = (
	details: ReturnType<typeof mapAccommodationFormToUpdate>["details"]
) => {
	const supply = details?.pool?.[0]?.supply;
	return supply?.source === "inline" ? supply.spec : undefined;
};

const classSpec = {
	pricing: "per_room" as const,
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
					id: ROOM_ID,
					images: [],
					typ: HousingRoomTypes.Double,
					pax: 2,
					name: null,
					description: null,
					rate: { base: ZERO_FIXED, seasons: [] }
				}
			]
		}
	]
};

const flatPerRoomSpec = {
	pricing: "per_room" as const,
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
			name: null,
			rooms: [
				{
					id: ROOM_ID,
					images: [],
					typ: HousingRoomTypes.Double,
					pax: 2,
					name: "Deluxe",
					description: "Deluxe class",
					rate: { base: ZERO_FIXED, seasons: [] }
				}
			]
		}
	]
};

describe("mapRoomsFromBackend", () => {
	it("maps a named category to rooms.rooms[].room_name (class mode)", () => {
		expect(mapRoomsFromBackend(classSpec)).toEqual({
			rooms: [
				{
					id: "cat-1",
					room_name: "Deluxe",
					description: ""
				}
			]
		});
	});

	it("does not map room.typ into rooms.rooms[].room_name in class mode", () => {
		const result = mapRoomsFromBackend(classSpec);

		expect(result.rooms[0]?.room_name).toBe("Deluxe");
		expect(result.rooms[0]?.room_name).not.toBe(HousingRoomTypes.Double);
	});

	it("echoes room id from a flat (unnamed) per_room spec", () => {
		expect(mapRoomsFromBackend(flatPerRoomSpec)).toEqual({
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
	it("keeps flat_rate charge when rooms are also in the form", () => {
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

		expect(inlineSpec(result.details)).toMatchObject({
			pricing: "whole",
			price: {
				base: {
					typ: "fixed",
					cost: { val: 300, currency: Currency.USD },
					fees: null,
					markup: null
				}
			}
		});
		expect(result).not.toHaveProperty("day");
		expect(result).not.toHaveProperty("position");
		expect(result.details).not.toHaveProperty("source");
		expect(result.details).not.toHaveProperty("spec");
	});

	it("keeps per_person charge when rooms are also in the form", () => {
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

		expect(inlineSpec(result.details)).toMatchObject({
			pricing: "whole",
			price: {
				base: {
					typ: "per_person",
					cost_per_person: { val: 80, currency: Currency.EUR },
					fees: null,
					markup: null
				}
			}
		});
	});

	it("keeps per_room rates from the pricing tab with class name", () => {
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

		expect(inlineSpec(result.details)).toMatchObject({
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
									cost: { val: 120, currency: Currency.USD }
								}
							}
						}
					]
				}
			]
		});
	});

	it("echoes room id on a rooms-only spec when invoicing is part of package", () => {
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

		expect(inlineSpec(result.details)).toMatchObject({
			pricing: "per_room",
			categories: [
				{
					name: null,
					rooms: [
						{
							id: ROOM_ID,
							name: "Deluxe",
							description: "Deluxe class"
						}
					]
				}
			]
		});
	});
});

describe("mapAccommodationEventToForm — inherited", () => {
	it("fills product_id/scope and reads amenities/rooms from the scoped spec", () => {
		const form = mapAccommodationEventToForm({
			id: "e11e0000-0000-0000-0000-000000000001",
			tour_option_id: "0pt00000-0000-0000-0000-000000000001",
			translation: TranslationState.Source,
			event: {
				id: "opt-0000-0000-0000-000000000001",
				typ: ENUM_EVENT_BACKEND.HOUSING,
				day: 1,
				position: 0,
				is_optional: false,
				images: [],
				name: "Ночёвка",
				description: null,
				package_id: null,
				details: {
					plan: {
						duration: 2,
						check_in: { time: "11:00:00" },
						check_out: { time: "12:00:00" }
					},
					pool: [
						{
							id: "11111111-1111-1111-1111-111111111111",
							is_main: true,
							supply: {
								source: "product",
								product_id:
									"b0c1c0de-0000-0000-0000-000000000001",
								supplier: {
									id: "5upp0000-0000-0000-0000-000000000001",
									name: "Hyatt"
								},
								scope: {
									typ: "only",
									ids: [
										"a2f30000-0000-0000-0000-000000000001"
									]
								},
								override: null
							},
							spec: {
								pricing: "per_room",
								images: [],
								name: "Hyatt",
								location: { lat: 41.311, long: 69.279 },
								stars: 5,
								typs: [],
								amenities: [AmenitiesTypes.Wifi],
								policy: null,
								categories: [
									{
										id: "cat-1",
										name: null,
										rooms: [
											{
												id: ROOM_ID,
												images: [],
												typ: HousingRoomTypes.Double,
												pax: 2,
												name: null,
												description: null,
												rate: {
													base: ZERO_FIXED,
													seasons: []
												}
											}
										]
									}
								]
							}
						}
					]
				}
			}
		});

		expect(form.product_id).toBe("b0c1c0de-0000-0000-0000-000000000001");
		expect(form.variant_id).toBe("a2f30000-0000-0000-0000-000000000001");
		expect(form.source).toBe(ENUM_HOUSING_SOURCE.INHERITED);
		expect(form.has_override).toBe(false);
		expect(form.general.length_of_stay).toBe(2);
		expect(form.general.check_in_time).toBe("11:00:00");
		expect(form.general.amenities).toEqual([
			ENUM_ACCOMMODATION_AMENITY.WIFI
		]);
		expect(form.general.stars).toBe(5);
		expect(form.rooms.rooms[0]).toMatchObject({
			id: ROOM_ID,
			room_name: HousingRoomTypes.Double
		});
		expect(form.pricing.invoicing).toBe(
			ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
		);
	});
});

describe("mapAccommodationFormToUpdate — inherited", () => {
	it("sends the stay plan only (supply omitted so the link is kept)", () => {
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
			plan: {
				duration: 2,
				check_in: { time: "11:00" },
				check_out: { time: "12:00" }
			}
		});
		expect(body.details).not.toHaveProperty("supply");
		expect(body.details).not.toHaveProperty("spec");
		expect(body).not.toHaveProperty("day");
		expect(body).not.toHaveProperty("position");
		expect(body.description).toBe("у окна");
	});
});

describe("mapAccommodationFormToUpdate — custom", () => {
	it("sends location and stars on the inline spec, not as flat details", () => {
		const body = mapAccommodationFormToUpdate({
			name: "Custom",
			source: ENUM_HOUSING_SOURCE.CUSTOM,
			general: {
				property: null,
				stars: 4,
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
		expect(inlineSpec(body.details)).toMatchObject({
			stars: 4,
			location: null
		});
		expect(body.details?.pool?.[0]?.supply?.source).toBe("inline");
	});
});
