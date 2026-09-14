import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { HOTEL_VARIANT_FORM_SCHEMA } from "../../schema/hotel-variant.schema";
import {
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_SURCHARGE
} from "../../types";

import {
	emptyHotelVariantForm,
	emptyHotelVariantRoom,
	emptyHotelVariantRoomSeason,
	mapHotelVariantFormToWrite,
	mapHotelVariantToForm
} from "./variant-form.converters";

describe("mapHotelVariantToForm", () => {
	it("maps empty variant", () => {
		expect(mapHotelVariantToForm(null)).toEqual(emptyHotelVariantForm());
	});

	it("maps room with season rates", () => {
		const form = mapHotelVariantToForm({
			id: "v1",
			name: "Deluxe",
			rooms: [
				{
					id: "r1",
					typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
					pax: null,
					expenses: {
						typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
						cost: { val: 100, currency: DEFAULT_EVENT_CURRENCY },
						fees: null,
						markup: null
					},
					rates: [
						{
							fromDate: "2026-06-01",
							toDate: "2026-08-31",
							expenses: {
								typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
								rate: {
									typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
									cost: {
										val: 150,
										currency: DEFAULT_EVENT_CURRENCY
									}
								},
								fees: null,
								markup: null
							}
						},
						{
							fromDate: "2026-12-20",
							toDate: "2027-01-10",
							expenses: {
								typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
								cost: {
									val: 200,
									currency: DEFAULT_EVENT_CURRENCY
								},
								fees: null,
								markup: null
							}
						}
					],
					images: []
				}
			]
		});

		expect(form.name).toBe("Deluxe");
		expect(form.rooms[0]).toMatchObject({
			id: "r1",
			typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
			chargeTyp: ENUM_HOTEL_ROOM_CHARGE.FIXED,
			cost: 100,
			seasons: [
				{
					fromDate: "2026-06-01",
					toDate: "2026-08-31",
					chargeTyp: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
					cost: 150
				},
				{
					fromDate: "2026-12-20",
					toDate: "2027-01-10",
					chargeTyp: ENUM_HOTEL_ROOM_CHARGE.FIXED,
					cost: 200
				}
			]
		});
	});
});

describe("mapHotelVariantFormToWrite", () => {
	it("filters rooms without typ", () => {
		const write = mapHotelVariantFormToWrite({
			name: "Deluxe",
			rooms: [
				emptyHotelVariantRoom(),
				{
					...emptyHotelVariantRoom(),
					typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
					cost: 10,
					id: "r1"
				}
			]
		});

		expect(write.rooms).toHaveLength(1);
		expect(write.rooms[0]).toMatchObject({
			id: "r1",
			typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
			expenses: {
				typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
				cost: { val: 10, currency: DEFAULT_EVENT_CURRENCY }
			},
			rates: null
		});
	});

	it("writes complete seasons and skips ones without dates", () => {
		const write = mapHotelVariantFormToWrite({
			name: "Deluxe",
			rooms: [
				{
					...emptyHotelVariantRoom(),
					typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
					cost: 100,
					seasons: [
						{
							...emptyHotelVariantRoomSeason(),
							fromDate: "2026-06-01",
							toDate: "2026-08-31",
							chargeTyp: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
							cost: 150
						},
						emptyHotelVariantRoomSeason()
					]
				}
			]
		});

		expect(write.rooms[0].rates).toEqual([
			{
				fromDate: "2026-06-01",
				toDate: "2026-08-31",
				expenses: {
					typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
					rate: {
						typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
						cost: { val: 150, currency: DEFAULT_EVENT_CURRENCY }
					},
					fees: null,
					markup: null
				}
			}
		]);
	});
});

describe("HOTEL_VARIANT_FORM_SCHEMA", () => {
	it("rejects empty name and rooms without typ", () => {
		expect(
			HOTEL_VARIANT_FORM_SCHEMA.safeParse(emptyHotelVariantForm()).success
		).toBe(false);
	});

	it("accepts a named variant with a typed room", () => {
		const parsed = HOTEL_VARIANT_FORM_SCHEMA.safeParse({
			name: "Deluxe",
			rooms: [
				{
					...emptyHotelVariantRoom(),
					typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
					cost: 122
				}
			]
		});

		expect(parsed.success).toBe(true);
	});
});
