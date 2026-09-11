import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import { ENUM_HOTEL_AMENITY } from "../types";
import { ENUM_FORM_HOTEL_PRODUCT } from "../types/hotel/product-form.types";

const msg = i18nKey<THotelProductEditPageKeys>();

export const HOTEL_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.fields.name.errors.required")),
	[ENUM_FORM_HOTEL_PRODUCT.LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_HOTEL_PRODUCT.STARS]: z
		.number()
		.int()
		.min(1, msg("form.general.fields.stars.errors.min"))
		.max(5, msg("form.general.fields.stars.errors.max"))
		.nullable()
		.optional(),
	[ENUM_FORM_HOTEL_PRODUCT.AMENITIES]: z
		.array(z.enum(ENUM_HOTEL_AMENITY))
		.default([]),
	[ENUM_FORM_HOTEL_PRODUCT.CHECK_IN_FROM]: z.string().default(""),
	[ENUM_FORM_HOTEL_PRODUCT.CHECK_OUT_UNTIL]: z.string().default("")
});
