import { z } from "zod";

import type {
	HOTEL_VARIANT_CREATE_SCHEMA,
	HOTEL_VARIANT_FORM_SCHEMA,
	HOTEL_VARIANT_ROOM_SCHEMA,
	HOTEL_VARIANT_ROOM_SEASON_SCHEMA
} from "../../schema/hotel/variant.schema";

export const ENUM_FORM_HOTEL_VARIANT = {
	NAME: "name",
	ROOMS: "rooms"
} as const;

export type ENUM_FORM_HOTEL_VARIANT_TYPE =
	(typeof ENUM_FORM_HOTEL_VARIANT)[keyof typeof ENUM_FORM_HOTEL_VARIANT];

export const ENUM_FORM_HOTEL_VARIANT_ROOM = {
	ID: "id",
	TYP: "typ",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees",
	SEASONS: "seasons"
} as const;

export type ENUM_FORM_HOTEL_VARIANT_ROOM_TYPE =
	(typeof ENUM_FORM_HOTEL_VARIANT_ROOM)[keyof typeof ENUM_FORM_HOTEL_VARIANT_ROOM];

export const ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON = {
	FROM_DATE: "fromDate",
	TO_DATE: "toDate",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON_TYPE =
	(typeof ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON)[keyof typeof ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON];

export type THotelVariantRoomSeasonFormSchema = z.infer<
	typeof HOTEL_VARIANT_ROOM_SEASON_SCHEMA
>;
export type THotelVariantRoomFormSchema = z.infer<
	typeof HOTEL_VARIANT_ROOM_SCHEMA
>;
export type THotelVariantFormSchema = z.infer<typeof HOTEL_VARIANT_FORM_SCHEMA>;
export type THotelVariantCreateSchema = z.infer<
	typeof HOTEL_VARIANT_CREATE_SCHEMA
>;
