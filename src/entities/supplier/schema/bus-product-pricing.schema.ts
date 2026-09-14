import { z } from "zod";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_BUS_PRICING, ENUM_SUPPLIER_VARIANT_CHARGE } from "../types";
import { ENUM_FORM_BUS_PRICING } from "../types/bus/product-form.types";

import { BUS_VARIANT_FEE_SCHEMA } from "./bus-variant.schema";

export const BUS_PRODUCT_PRICING_SCHEMA = z.object({
	[ENUM_FORM_BUS_PRICING.PRICING]: z.enum(ENUM_BUS_PRICING),
	[ENUM_FORM_BUS_PRICING.CHARGE_TYP]: z.enum(ENUM_SUPPLIER_VARIANT_CHARGE),
	[ENUM_FORM_BUS_PRICING.COST]: z.number().nullable(),
	[ENUM_FORM_BUS_PRICING.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_BUS_PRICING.FEES]: z.array(BUS_VARIANT_FEE_SCHEMA)
});
