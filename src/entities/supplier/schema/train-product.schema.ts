import { z } from "zod";

import { type TTrainProductEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

const msg = i18nKey<TTrainProductEditPageKeys>();

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

export const TRAIN_HOP_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_HOP.DEPARTURE_TIME]: z.string(),
	[ENUM_FORM_TRAIN_HOP.ARRIVAL_TIME]: z.string(),
	[ENUM_FORM_TRAIN_HOP.DEPARTURE_LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_TRAIN_HOP.ARRIVAL_LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional()
});

export const TRAIN_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.errors.name.required")),
	[ENUM_FORM_TRAIN_PRODUCT.HOPS]: z
		.array(TRAIN_HOP_SCHEMA)
		.min(1, msg("form.general.errors.hops.required"))
});

export type TTrainHopFormSchema = z.infer<typeof TRAIN_HOP_SCHEMA>;
export type TTrainProductGeneralSchema = z.infer<
	typeof TRAIN_PRODUCT_GENERAL_SCHEMA
>;
