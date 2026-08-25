import { describe, expect, it } from "vitest";

import {
	AmenitiesTypes,
	Currency,
	HousingRoomTypes
} from "@/shared/api/generated/Api";

import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_HOTEL_AMENITY,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE
} from "../../types";

import {
	mapHotelProductDetailsToUpdate,
	mapHotelProductFromBackend,
	mapHotelProductNameToUpdate,
	mapHotelProductToCreate,
	mapHotelVariantToWrite,
	mapSupplierPolicyBandToBackend
} from "./index";

describe("mapHotelProductNameToUpdate", () => {
	it("omits details on rename", () => {
		expect(mapHotelProductNameToUpdate("Новое имя")).toEqual({
			typ: "hotel",
			name: "Новое имя"
		});
	});
});

describe("mapHotelProductToCreate", () => {
	it("maps Hyatt create payload from audit", () => {
		const body = mapHotelProductToCreate({
			name: "Hyatt Regency Tashkent",
			location: { lat: 41.311, long: 69.279 },
			stars: 5,
			amenities: [
				ENUM_HOTEL_AMENITY.WIFI,
				ENUM_HOTEL_AMENITY.POOL,
				ENUM_HOTEL_AMENITY.BREAKFAST,
				ENUM_HOTEL_AMENITY.SPA
			],
			policy: {
				checkInFrom: "14:00",
				checkOutUntil: "12:00",
				earlyCheckIn: [
					{
						fromTime: "06:00",
						toTime: "10:00",
						surcharge: {
							typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
							cost: { val: 100, currency: "USD" }
						},
						note: "полные сутки"
					},
					{
						fromTime: "10:00",
						toTime: "14:00",
						surcharge: {
							typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
							percentage: 0.5
						},
						note: "полсуток"
					}
				],
				lateCheckOut: [
					{
						fromTime: "12:00",
						toTime: null,
						surcharge: {
							typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
							percentage: 0.5
						},
						note: null
					}
				]
			}
		});

		expect(body).toEqual({
			typ: "hotel",
			name: "Hyatt Regency Tashkent",
			details: {
				typ: "hotel",
				location: { lat: 41.311, long: 69.279 },
				stars: 5,
				amenities: ["wifi", "pool", "breakfast", "spa"],
				policy: {
					check_in_from: "14:00",
					check_out_until: "12:00",
					early_check_in: [
						{
							from_time: "06:00",
							to_time: "10:00",
							surcharge: {
								typ: "fixed",
								cost: { val: 100, currency: "USD" }
							},
							note: "полные сутки"
						},
						{
							from_time: "10:00",
							to_time: "14:00",
							surcharge: {
								typ: "percentage",
								percentage: 0.5
							},
							note: "полсуток"
						}
					],
					late_check_out: [
						{
							from_time: "12:00",
							to_time: null,
							surcharge: {
								typ: "percentage",
								percentage: 0.5
							},
							note: null
						}
					]
				}
			}
		});
	});
});

describe("mapHotelProductDetailsToUpdate", () => {
	it("sends details as a full replace", () => {
		const body = mapHotelProductDetailsToUpdate({
			location: { lat: 41.311, long: 69.279 },
			stars: 5,
			amenities: [ENUM_HOTEL_AMENITY.WIFI],
			policy: {
				checkInFrom: "14:00",
				checkOutUntil: "12:00",
				earlyCheckIn: [],
				lateCheckOut: []
			}
		});

		expect(body.typ).toBe("hotel");
		expect(body).toHaveProperty("details");
		expect(body).not.toHaveProperty("name");
	});
});

describe("mapHotelVariantToWrite", () => {
	it("echoes room id and omits pax/images for double", () => {
		const body = mapHotelVariantToWrite({
			name: "Deluxe",
			rooms: [
				{
					[ENUM_FORM_HOTEL_ROOMS.ID]:
						"68375727-0000-0000-0000-000000000001",
					typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
					expenses: {
						typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
						cost: { val: 120, currency: "USD" },
						fees: null,
						markup: null
					},
					rates: [
						{
							fromDate: "2026-06-01",
							toDate: "2026-08-31",
							expenses: {
								typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
								cost: { val: 180, currency: "USD" },
								fees: null,
								markup: null
							}
						},
						{
							fromDate: "2026-12-20",
							toDate: "2027-01-10",
							expenses: {
								typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
								rate: {
									typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
									cost: { val: 200, currency: "USD" }
								},
								fees: null,
								markup: null
							}
						}
					]
				},
				{
					typ: ENUM_HOTEL_ROOM_TYPE.SINGLE,
					expenses: {
						typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
						rate: {
							typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
							cost: { val: 90, currency: "USD" }
						},
						fees: null,
						markup: null
					}
				}
			]
		});

		expect(body.details?.rooms?.[0]).toMatchObject({
			id: "68375727-0000-0000-0000-000000000001",
			typ: "double",
			expenses: {
				typ: "fixed",
				cost: { val: 120, currency: "USD" }
			}
		});
		expect(body.details?.rooms?.[0]).not.toHaveProperty("pax");
		expect(body.details?.rooms?.[0]).not.toHaveProperty("images");
		expect(body.details?.rooms?.[1]).toMatchObject({
			typ: "single",
			expenses: {
				typ: "per_duration",
				rate: {
					typ: "fixed",
					cost: { val: 90, currency: "USD" }
				}
			}
		});
		expect(body.details?.rooms?.[1]).not.toHaveProperty("id");
	});

	it("sends pax for suite", () => {
		const body = mapHotelVariantToWrite({
			name: "Suite",
			rooms: [
				{
					typ: ENUM_HOTEL_ROOM_TYPE.SUITE,
					pax: 4,
					expenses: {
						typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
						cost: { val: 300, currency: "USD" },
						fees: null,
						markup: null
					}
				}
			]
		});

		expect(body.details?.rooms?.[0]).toMatchObject({
			typ: "suite",
			pax: 4
		});
	});
});

describe("mapSupplierPolicyBandToBackend", () => {
	it("maps policy band from_time/to_time", () => {
		expect(
			mapSupplierPolicyBandToBackend({
				fromTime: "10:00",
				toTime: "14:00",
				surcharge: {
					typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
					cost: { val: 20, currency: "USD" }
				},
				note: null
			})
		).toEqual({
			from_time: "10:00",
			to_time: "14:00",
			surcharge: {
				typ: "fixed",
				cost: { val: 20, currency: "USD" }
			},
			note: null
		});
	});
});

describe("mapHotelProductFromBackend", () => {
	it("maps flattened hotel read", () => {
		const product = mapHotelProductFromBackend({
			typ: "hotel",
			id: "b0c1-hotel",
			supplier_id: "5upp",
			name: "Hyatt Regency Tashkent",
			location: { lat: 41.311, long: 69.279 },
			stars: 5,
			amenities: [AmenitiesTypes.Wifi, AmenitiesTypes.Pool],
			policy: {
				check_in_from: "14:00",
				check_out_until: "12:00",
				early_check_in: [],
				late_check_out: []
			},
			variants: [
				{
					typ: "hotel",
					id: "variant-deluxe",
					name: "Deluxe",
					rooms: [
						{
							id: "68375727-0000-0000-0000-000000000001",
							images: [],
							typ: HousingRoomTypes.Double,
							pax: 2,
							expenses: {
								typ: "fixed",
								cost: { val: 120, currency: Currency.USD },
								fees: null,
								markup: null
							},
							rates: null
						}
					]
				}
			],
			image_paths: [],
			primary_image_path: null
		});

		expect(product).toMatchObject({
			id: "b0c1-hotel",
			supplierId: "5upp",
			typ: ENUM_SUPPLIER_TYPE.HOTEL,
			name: "Hyatt Regency Tashkent",
			details: {
				location: { lat: 41.311, long: 69.279 },
				stars: 5,
				amenities: [ENUM_HOTEL_AMENITY.WIFI, ENUM_HOTEL_AMENITY.POOL]
			},
			variants: [
				{
					id: "variant-deluxe",
					name: "Deluxe",
					rooms: [
						{
							id: "68375727-0000-0000-0000-000000000001",
							typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
							pax: 2
						}
					]
				}
			]
		});
	});
});
