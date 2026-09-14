import { describe, expect, it } from "vitest";

import {
	AmenitiesTypes,
	Currency,
	HousingRoomTypes
} from "@/shared/api/generated/Api";

import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_HOTEL_AMENITY,
	ENUM_HOTEL_PRICING,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE
} from "../../types";

import {
	mapHotelProductFromBackend,
	mapHotelProductToCreate,
	mapHotelVariantToWrite,
	mapSupplierPolicyBandToBackend
} from "./index";

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
			details: {
				pricing: "per_room",
				name: "Hyatt Regency Tashkent",
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

describe("mapHotelVariantToWrite", () => {
	it("writes flat per_room payload with canonical pax and rates", () => {
		const body = mapHotelVariantToWrite(
			{
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
			},
			ENUM_HOTEL_PRICING.PER_ROOM
		);

		expect(body).toMatchObject({
			typ: "hotel",
			pricing: "per_room",
			name: "Deluxe"
		});
		expect(body.rooms?.[0]).toMatchObject({
			id: "68375727-0000-0000-0000-000000000001",
			typ: "double",
			pax: 2,
			rate: {
				base: {
					typ: "fixed",
					cost: { val: 120, currency: "USD" }
				},
				seasons: [
					{
						from_date: "2026-06-01",
						to_date: "2026-08-31",
						charge: {
							typ: "fixed",
							cost: { val: 180, currency: "USD" }
						}
					},
					{
						from_date: "2026-12-20",
						to_date: "2027-01-10",
						charge: {
							typ: "per_duration",
							rate: {
								typ: "fixed",
								cost: { val: 200, currency: "USD" }
							}
						}
					}
				]
			}
		});
		expect(body.rooms?.[1]).toMatchObject({
			id: null,
			typ: "single",
			pax: 1,
			rate: {
				base: {
					typ: "per_duration",
					rate: {
						typ: "fixed",
						cost: { val: 90, currency: "USD" }
					}
				},
				seasons: []
			}
		});
	});

	it("sends explicit pax for suite and defaults it when absent", () => {
		const body = mapHotelVariantToWrite(
			{
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
					},
					{
						typ: ENUM_HOTEL_ROOM_TYPE.FAMILY,
						expenses: {
							typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
							cost: { val: 150, currency: "USD" },
							fees: null,
							markup: null
						}
					}
				]
			},
			ENUM_HOTEL_PRICING.PER_ROOM
		);

		expect(body.rooms?.[0]).toMatchObject({ typ: "suite", pax: 4 });
		expect(body.rooms?.[1]).toMatchObject({ typ: "family", pax: 2 });
	});

	it("omits rates for whole pricing", () => {
		const body = mapHotelVariantToWrite(
			{
				name: "Deluxe",
				rooms: [
					{
						typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
						expenses: {
							typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
							cost: { val: 120, currency: "USD" },
							fees: null,
							markup: null
						}
					}
				]
			},
			ENUM_HOTEL_PRICING.WHOLE
		);

		expect(body).toMatchObject({
			typ: "hotel",
			pricing: "whole",
			name: "Deluxe"
		});
		expect(body.rooms?.[0]).toEqual({
			id: null,
			typ: "double",
			pax: 2
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
	it("maps per_room hotel read from spec", () => {
		const product = mapHotelProductFromBackend({
			typ: "hotel",
			id: "b0c1-hotel",
			supplier_id: "5upp",
			supplier_name: null,
			name: "Hyatt Regency Tashkent",
			image_paths: [],
			primary_image_path: null,
			spec: {
				pricing: "per_room",
				images: [],
				name: "Hyatt Regency Tashkent",
				location: { lat: 41.311, long: 69.279 },
				stars: 5,
				typs: [],
				amenities: [AmenitiesTypes.Wifi, AmenitiesTypes.Pool],
				policy: {
					check_in_from: "14:00",
					check_out_until: "12:00",
					early_check_in: [],
					late_check_out: []
				},
				categories: [
					{
						id: "variant-deluxe",
						name: "Deluxe",
						rooms: [
							{
								id: "68375727-0000-0000-0000-000000000001",
								images: [],
								typ: HousingRoomTypes.Double,
								pax: 2,
								name: null,
								description: null,
								rate: {
									base: {
										typ: "fixed",
										cost: {
											val: 120,
											currency: Currency.USD
										},
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

		expect(product).toMatchObject({
			id: "b0c1-hotel",
			supplierId: "5upp",
			typ: ENUM_SUPPLIER_TYPE.HOTEL,
			name: "Hyatt Regency Tashkent",
			pricing: ENUM_HOTEL_PRICING.PER_ROOM,
			stayRate: null,
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
							pax: 2,
							expenses: {
								typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
								cost: { val: 120, currency: "USD" }
							},
							rates: []
						}
					]
				}
			]
		});
	});

	it("carries the whole-stay price of a whole-priced hotel", () => {
		const price = {
			base: {
				typ: "fixed" as const,
				cost: { val: 500, currency: Currency.USD },
				fees: null,
				extra_costs: [],
				markup: null
			},
			seasons: []
		};

		const product = mapHotelProductFromBackend({
			typ: "hotel",
			id: "b0c1-hotel",
			supplier_id: "5upp",
			supplier_name: null,
			name: "Hyatt Regency Tashkent",
			image_paths: [],
			primary_image_path: null,
			spec: {
				pricing: "whole",
				images: [],
				name: "Hyatt Regency Tashkent",
				location: null,
				stars: null,
				typs: [],
				amenities: [],
				policy: null,
				price,
				categories: [
					{
						id: "variant-deluxe",
						name: "Deluxe",
						rooms: [
							{
								id: "68375727-0000-0000-0000-000000000001",
								images: [],
								typ: HousingRoomTypes.Double,
								pax: 2,
								name: null,
								description: null
							}
						]
					}
				]
			}
		});

		expect(product.pricing).toBe(ENUM_HOTEL_PRICING.WHOLE);
		expect(product.stayRate).toEqual(price);
		expect(product.variants[0]?.rooms[0]).toMatchObject({
			typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
			expenses: null,
			rates: null
		});
	});
});
