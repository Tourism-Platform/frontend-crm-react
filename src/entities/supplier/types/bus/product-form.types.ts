import { z } from "zod";

import type { BUS_PRODUCT_PRICING_SCHEMA } from "../../schema/bus-product-pricing.schema";
import type { BUS_PRODUCT_GENERAL_SCHEMA } from "../../schema/bus-product.schema";

export const ENUM_FORM_BUS_PRODUCT = {
	NAME: "name"
} as const;

export type ENUM_FORM_BUS_PRODUCT_TYPE =
	(typeof ENUM_FORM_BUS_PRODUCT)[keyof typeof ENUM_FORM_BUS_PRODUCT];

export const ENUM_FORM_BUS_PRICING = {
	PRICING: "pricing",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_BUS_PRICING_TYPE =
	(typeof ENUM_FORM_BUS_PRICING)[keyof typeof ENUM_FORM_BUS_PRICING];

export type TBusProductGeneralSchema = z.infer<
	typeof BUS_PRODUCT_GENERAL_SCHEMA
>;
export type TBusProductPricingSchema = z.infer<
	typeof BUS_PRODUCT_PRICING_SCHEMA
>;
export type TBusChargeFormFields = Pick<
	TBusProductPricingSchema,
	| typeof ENUM_FORM_BUS_PRICING.CHARGE_TYP
	| typeof ENUM_FORM_BUS_PRICING.COST
	| typeof ENUM_FORM_BUS_PRICING.CURRENCY
	| typeof ENUM_FORM_BUS_PRICING.FEES
>;
