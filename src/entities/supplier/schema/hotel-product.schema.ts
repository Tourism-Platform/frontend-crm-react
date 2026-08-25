import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";

const msg = i18nKey<THotelProductEditPageKeys>();

export const ENUM_FORM_HOTEL_PRODUCT = {
	NAME: "name"
} as const;

export type ENUM_FORM_HOTEL_PRODUCT_TYPE =
	(typeof ENUM_FORM_HOTEL_PRODUCT)[keyof typeof ENUM_FORM_HOTEL_PRODUCT];

export const HOTEL_PRODUCT_NAME_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.errors.name.required"))
});

export type THotelProductNameSchema = z.infer<typeof HOTEL_PRODUCT_NAME_SCHEMA>;
