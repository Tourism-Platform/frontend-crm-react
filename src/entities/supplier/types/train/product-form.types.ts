import { z } from "zod";

import type { TRAIN_PRODUCT_EDIT_SCHEMA } from "../../schema/train-product-edit.schema";
import type { TRAIN_PRODUCT_PRICING_SCHEMA } from "../../schema/train-product-pricing.schema";
import type {
	TRAIN_HOP_SCHEMA,
	TRAIN_PRODUCT_GENERAL_SCHEMA
} from "../../schema/train-product.schema";

export const ENUM_FORM_TRAIN_PRODUCT = {
	NAME: "name",
	HOPS: "hops"
} as const;

export type ENUM_FORM_TRAIN_PRODUCT_TYPE =
	(typeof ENUM_FORM_TRAIN_PRODUCT)[keyof typeof ENUM_FORM_TRAIN_PRODUCT];

export const ENUM_FORM_TRAIN_HOP = {
	DEPARTURE_STATION: "departure_station",
	ARRIVAL_STATION: "arrival_station"
} as const;

export type ENUM_FORM_TRAIN_HOP_TYPE =
	(typeof ENUM_FORM_TRAIN_HOP)[keyof typeof ENUM_FORM_TRAIN_HOP];

export type TTrainHopFormSchema = z.infer<typeof TRAIN_HOP_SCHEMA>;
export type TTrainProductGeneralSchema = z.infer<
	typeof TRAIN_PRODUCT_GENERAL_SCHEMA
>;
export type TTrainProductPricingSchema = z.infer<
	typeof TRAIN_PRODUCT_PRICING_SCHEMA
>;
export type TTrainProductEditSchema = z.infer<typeof TRAIN_PRODUCT_EDIT_SCHEMA>;
