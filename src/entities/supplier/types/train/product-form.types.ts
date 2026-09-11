import { z } from "zod";

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
	DEPARTURE_TIME: "departureTime",
	ARRIVAL_TIME: "arrivalTime",
	DEPARTURE_LOCATION: "departureLocation",
	ARRIVAL_LOCATION: "arrivalLocation"
} as const;

export type ENUM_FORM_TRAIN_HOP_TYPE =
	(typeof ENUM_FORM_TRAIN_HOP)[keyof typeof ENUM_FORM_TRAIN_HOP];

export type TTrainHopFormSchema = z.infer<typeof TRAIN_HOP_SCHEMA>;
export type TTrainProductGeneralSchema = z.infer<
	typeof TRAIN_PRODUCT_GENERAL_SCHEMA
>;
