import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_FEE_FIELD
} from "../types";
import {
	ENUM_FORM_HOTEL_VARIANT,
	ENUM_FORM_HOTEL_VARIANT_ROOM,
	ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON
} from "../types/hotel/variant-form.types";

const msg = i18nKey<THotelProductEditPageKeys>();

export const HOTEL_VARIANT_FEE_SCHEMA = z.object({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: z.string().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.COST]: z.number().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: z
		.enum(ENUM_CURRENCY_OPTIONS)
		.nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: z.string().nullable()
});

const HOTEL_VARIANT_ROOM_CHARGE_SCHEMA = {
	[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP]: z.enum(ENUM_HOTEL_ROOM_CHARGE),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]: z.number().nullable(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]: z.array(HOTEL_VARIANT_FEE_SCHEMA)
};

export const HOTEL_VARIANT_ROOM_SEASON_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.FROM_DATE]: z.string(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.TO_DATE]: z.string(),
	...HOTEL_VARIANT_ROOM_CHARGE_SCHEMA
});

export const HOTEL_VARIANT_ROOM_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_VARIANT_ROOM.ID]: z.string().optional(),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP]: z.union([
		z.enum(ENUM_HOTEL_ROOM_TYPE),
		z.literal("")
	]),
	...HOTEL_VARIANT_ROOM_CHARGE_SCHEMA,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASONS]: z.array(
		HOTEL_VARIANT_ROOM_SEASON_SCHEMA
	)
});

export const HOTEL_VARIANT_CREATE_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.fields.name.errors.required"))
});

export const HOTEL_VARIANT_FORM_SCHEMA = z
	.object({
		[ENUM_FORM_HOTEL_VARIANT.NAME]: z
			.string()
			.trim()
			.min(1, msg("form.variants.fields.name.errors.required")),
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
				message: msg("form.variants.fields.room_name.errors.required")
			});
		}
	});
