import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_HOTEL_PRICING,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type IHotelVariant
} from "../../types";

import { mapHotelRoomRowToVariantWrite } from "./hotel-product-rooms.converters";

const VARIANT: IHotelVariant = {
	id: "v1",
	name: "Deluxe",
	rooms: [
		{
			id: "r1",
			typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
			pax: 2,
			name: "Deluxe Double",
			description: "Sea view",
			expenses: {
				typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
				cost: { val: 120, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			},
			rates: [
				{
					fromDate: "2026-06-01",
					toDate: "2026-08-31",
					expenses: {
						typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
						cost: { val: 180, currency: DEFAULT_EVENT_CURRENCY },
						fees: null,
						markup: null
					}
				}
			],
			images: []
		}
	]
};

const PRODUCT: IHotelProduct = {
	id: "p1",
	supplierId: "s1",
	typ: ENUM_SUPPLIER_TYPE.HOTEL,
	name: "Hyatt",
	pricing: ENUM_HOTEL_PRICING.PER_ROOM,
	details: {
		location: null,
		stars: 5,
		amenities: [],
		policy: null
	},
	stayRate: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapHotelRoomRowToVariantWrite", () => {
	it("updates the first room name and keeps seasons", () => {
		expect(
			mapHotelRoomRowToVariantWrite(
				{
					[ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID]: "v1",
					[ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOM_NAME]: "King",
					[ENUM_FORM_HOTEL_PRODUCT_ROOMS.DESCRIPTION]: "Garden"
				},
				PRODUCT
			)
		).toMatchObject({
			name: "King",
			rooms: [
				{
					id: "r1",
					typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
					name: "King",
					description: "Garden",
					expenses: {
						cost: { val: 120, currency: DEFAULT_EVENT_CURRENCY }
					},
					rates: [
						{
							fromDate: "2026-06-01",
							toDate: "2026-08-31"
						}
					]
				}
			]
		});
	});
});
