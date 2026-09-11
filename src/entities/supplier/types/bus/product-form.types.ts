import { z } from "zod";

import type { BUS_PRODUCT_GENERAL_SCHEMA } from "../../schema/bus-product.schema";

export const ENUM_FORM_BUS_PRODUCT = {
	NAME: "name"
} as const;

export type ENUM_FORM_BUS_PRODUCT_TYPE =
	(typeof ENUM_FORM_BUS_PRODUCT)[keyof typeof ENUM_FORM_BUS_PRODUCT];

export type TBusProductGeneralSchema = z.infer<
	typeof BUS_PRODUCT_GENERAL_SCHEMA
>;
