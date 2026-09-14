import { z } from "zod";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FLIGHT_PRICING, ENUM_SUPPLIER_VARIANT_CHARGE } from "../types";
import { ENUM_FORM_FLIGHT_PRICING } from "../types/flight/product-form.types";

import { FLIGHT_VARIANT_FEE_SCHEMA } from "./flight-variant.schema";

export const FLIGHT_PRODUCT_PRICING_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_PRICING.PRICING]: z.enum(ENUM_FLIGHT_PRICING),
	[ENUM_FORM_FLIGHT_PRICING.CHARGE_TYP]: z.enum(ENUM_SUPPLIER_VARIANT_CHARGE),
	[ENUM_FORM_FLIGHT_PRICING.COST]: z.number().nullable(),
	[ENUM_FORM_FLIGHT_PRICING.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_FLIGHT_PRICING.FEES]: z.array(FLIGHT_VARIANT_FEE_SCHEMA)
});
