import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_FEE_FIELD
} from "../types";

const msg = i18nKey<THotelProductEditPageKeys>();

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
	FROM_DATE: "fromDate",
	TO_DATE: "toDate",
	SEASON_CHARGE_TYP: "seasonChargeTyp",
	SEASON_COST: "seasonCost",
	SEASON_CURRENCY: "seasonCurrency",
	SEASON_FEES: "seasonFees"
} as const;

export type ENUM_FORM_HOTEL_VARIANT_ROOM_TYPE =
	(typeof ENUM_FORM_HOTEL_VARIANT_ROOM)[keyof typeof ENUM_FORM_HOTEL_VARIANT_ROOM];

const HOTEL_VARIANT_FEE_SCHEMA = z.object({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: z.string().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.COST]: z.number().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: z
		.enum(ENUM_CURRENCY_OPTIONS)
		.nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: z.string().nullable()
});

export const HOTEL_VARIANT_ROOM_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_VARIANT_ROOM.ID]: z.string().optional(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP]: z.union([
		z.enum(ENUM_HOTEL_ROOM_TYPE),
		z.literal("")
	]),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP]: z.enum(ENUM_HOTEL_ROOM_CHARGE),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]: z.string(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]: z.array(HOTEL_VARIANT_FEE_SCHEMA),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.FROM_DATE]: z.string(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TO_DATE]: z.string(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CHARGE_TYP]: z.enum(
		ENUM_HOTEL_ROOM_CHARGE
	),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_COST]: z.string(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CURRENCY]: z.enum(
		ENUM_CURRENCY_OPTIONS
	),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_FEES]: z.array(
		HOTEL_VARIANT_FEE_SCHEMA
	)
});

export const HOTEL_VARIANT_FORM_SCHEMA = z
	.object({
		[ENUM_FORM_HOTEL_VARIANT.NAME]: z
			.string()
			.trim()
			.min(1, msg("form.variants.errors.name.required")),
		[ENUM_FORM_HOTEL_VARIANT.ROOMS]: z
			.array(HOTEL_VARIANT_ROOM_SCHEMA)
			.min(1)
	})
	.superRefine((data, ctx) => {
		const hasTypedRoom = data[ENUM_FORM_HOTEL_VARIANT.ROOMS].some(
			(room) => room[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP] !== ""
		);

		if (!hasTypedRoom) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: [ENUM_FORM_HOTEL_VARIANT.ROOMS],
				message: msg("form.variants.errors.roomTyp.required")
			});
		}
	});

export type THotelVariantRoomFormSchema = z.infer<
	typeof HOTEL_VARIANT_ROOM_SCHEMA
>;
export type THotelVariantFormSchema = z.infer<typeof HOTEL_VARIANT_FORM_SCHEMA>;
