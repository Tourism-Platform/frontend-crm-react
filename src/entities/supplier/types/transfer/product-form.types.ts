import { z } from "zod";

import type { TRANSFER_PRODUCT_PRICING_SCHEMA } from "../../schema/transfer/pricing.schema";
import type { TRANSFER_PRODUCT_EDIT_SCHEMA } from "../../schema/transfer/product-edit.schema";
import type { TRANSFER_PRODUCT_GENERAL_SCHEMA } from "../../schema/transfer/product.schema";

export const ENUM_FORM_TRANSFER_PRODUCT = {
	NAME: "name"
} as const;

export type ENUM_FORM_TRANSFER_PRODUCT_TYPE =
	(typeof ENUM_FORM_TRANSFER_PRODUCT)[keyof typeof ENUM_FORM_TRANSFER_PRODUCT];

export type TTransferProductGeneralSchema = z.infer<
	typeof TRANSFER_PRODUCT_GENERAL_SCHEMA
>;
export type TTransferProductPricingSchema = z.infer<
	typeof TRANSFER_PRODUCT_PRICING_SCHEMA
>;
export type TTransferProductEditSchema = z.infer<
	typeof TRANSFER_PRODUCT_EDIT_SCHEMA
>;
