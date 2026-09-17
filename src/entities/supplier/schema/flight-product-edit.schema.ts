import { z } from "zod";

import { ENUM_FORM_FLIGHT_SECTION } from "../types/flight/section.types";

import { FLIGHT_FARES_SCHEMA } from "./flight-fares.schema";
import { FLIGHT_PRODUCT_PRICING_SCHEMA } from "./flight-product-pricing.schema";
import { FLIGHT_PRODUCT_GENERAL_SCHEMA } from "./flight-product.schema";

export const FLIGHT_PRODUCT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_SECTION.GENERAL]: FLIGHT_PRODUCT_GENERAL_SCHEMA,
	[ENUM_FORM_FLIGHT_SECTION.FARES]: FLIGHT_FARES_SCHEMA,
	[ENUM_FORM_FLIGHT_SECTION.PRICING]: FLIGHT_PRODUCT_PRICING_SCHEMA
});
