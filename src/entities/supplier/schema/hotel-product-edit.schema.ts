import { z } from "zod";

import { ENUM_FORM_HOTEL_SECTION } from "../types/hotel/section.types";

import { HOTEL_PRODUCT_PRICING_SCHEMA } from "./hotel-product-pricing.schema";
import { HOTEL_PRODUCT_GENERAL_SCHEMA } from "./hotel-product.schema";
import { HOTEL_ROOMS_SCHEMA } from "./hotel-rooms.schema";

export const HOTEL_PRODUCT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_HOTEL_SECTION.GENERAL]: HOTEL_PRODUCT_GENERAL_SCHEMA,
	[ENUM_FORM_HOTEL_SECTION.ROOMS]: HOTEL_ROOMS_SCHEMA,
	[ENUM_FORM_HOTEL_SECTION.PRICING]: HOTEL_PRODUCT_PRICING_SCHEMA
});
