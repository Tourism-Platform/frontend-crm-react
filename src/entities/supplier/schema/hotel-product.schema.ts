import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import { ENUM_HOTEL_AMENITY } from "../types";

const msg = i18nKey<THotelProductEditPageKeys>();

export const ENUM_FORM_HOTEL_PRODUCT = {
	NAME: "name",
	LOCATION: "location",
	STARS: "stars",
	AMENITIES: "amenities",
	CHECK_IN_FROM: "checkInFrom",
	CHECK_OUT_UNTIL: "checkOutUntil"
} as const;

export type ENUM_FORM_HOTEL_PRODUCT_TYPE =
	(typeof ENUM_FORM_HOTEL_PRODUCT)[keyof typeof ENUM_FORM_HOTEL_PRODUCT];

export const HOTEL_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.errors.name.required")),
	[ENUM_FORM_HOTEL_PRODUCT.LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_HOTEL_PRODUCT.STARS]: z
		.number()
		.int()
		.min(1)
		.max(5)
		.nullable()
		.optional(),
	[ENUM_FORM_HOTEL_PRODUCT.AMENITIES]: z
		.array(z.enum(ENUM_HOTEL_AMENITY))
		.default([]),
	[ENUM_FORM_HOTEL_PRODUCT.CHECK_IN_FROM]: z.string().default(""),
	[ENUM_FORM_HOTEL_PRODUCT.CHECK_OUT_UNTIL]: z.string().default("")
});

export type THotelProductGeneralFormInput = z.input<
	typeof HOTEL_PRODUCT_GENERAL_SCHEMA
>;

export type THotelProductGeneralSchema = z.output<
	typeof HOTEL_PRODUCT_GENERAL_SCHEMA
>;

/** @deprecated Use HOTEL_PRODUCT_GENERAL_SCHEMA */
export const HOTEL_PRODUCT_NAME_SCHEMA = HOTEL_PRODUCT_GENERAL_SCHEMA.pick({
	[ENUM_FORM_HOTEL_PRODUCT.NAME]: true
});

/** @deprecated Use THotelProductGeneralSchema */
export type THotelProductNameSchema = Pick<
	THotelProductGeneralSchema,
	typeof ENUM_FORM_HOTEL_PRODUCT.NAME
>;
