import { z } from "zod";

import type { HOTEL_ROOMS_SCHEMA } from "../../schema/hotel-rooms.schema";

export const ENUM_FORM_HOTEL_PRODUCT_ROOMS = {
	ROOMS_LIST: "rooms",
	VARIANT_ID: "variant_id",
	ROOM_NAME: "room_name",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_HOTEL_PRODUCT_ROOMS_TYPE =
	(typeof ENUM_FORM_HOTEL_PRODUCT_ROOMS)[keyof typeof ENUM_FORM_HOTEL_PRODUCT_ROOMS];

export type THotelRoomsSchema = z.infer<typeof HOTEL_ROOMS_SCHEMA>;
export type THotelRoomsList =
	THotelRoomsSchema[typeof ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST];
export type THotelRoomRow = THotelRoomsList[number];
