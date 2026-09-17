import { z } from "zod";

import type { HOTEL_PRODUCT_PRICING_SCHEMA } from "../../schema/hotel/pricing.schema";
import type { HOTEL_PRODUCT_EDIT_SCHEMA } from "../../schema/hotel/product-edit.schema";
import type { HOTEL_PRODUCT_GENERAL_SCHEMA } from "../../schema/hotel/product.schema";

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

export type THotelProductGeneralFormInput = z.input<
	typeof HOTEL_PRODUCT_GENERAL_SCHEMA
>;

export type THotelProductGeneralSchema = z.output<
	typeof HOTEL_PRODUCT_GENERAL_SCHEMA
>;

export type THotelProductPricingSchema = z.infer<
	typeof HOTEL_PRODUCT_PRICING_SCHEMA
>;

export type THotelProductEditSchema = z.infer<typeof HOTEL_PRODUCT_EDIT_SCHEMA>;
