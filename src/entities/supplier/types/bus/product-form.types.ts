import { z } from "zod";

import type { BUS_PRODUCT_PRICING_SCHEMA } from "../../schema/bus/pricing.schema";
import type { BUS_PRODUCT_EDIT_SCHEMA } from "../../schema/bus/product-edit.schema";
import type { BUS_PRODUCT_GENERAL_SCHEMA } from "../../schema/bus/product.schema";

export const ENUM_FORM_BUS_PRODUCT = {
	NAME: "name"
} as const;

export type ENUM_FORM_BUS_PRODUCT_TYPE =
	(typeof ENUM_FORM_BUS_PRODUCT)[keyof typeof ENUM_FORM_BUS_PRODUCT];

export type TBusProductGeneralSchema = z.infer<
	typeof BUS_PRODUCT_GENERAL_SCHEMA
>;
export type TBusProductPricingSchema = z.infer<
	typeof BUS_PRODUCT_PRICING_SCHEMA
>;
export type TBusProductEditSchema = z.infer<typeof BUS_PRODUCT_EDIT_SCHEMA>;
