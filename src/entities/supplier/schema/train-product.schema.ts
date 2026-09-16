import { z } from "zod";

import { type TTrainProductEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import {
	ENUM_FORM_TRAIN_HOP,
	ENUM_FORM_TRAIN_PRODUCT
} from "../types/train/product-form.types";

const msg = i18nKey<TTrainProductEditPageKeys>();

export const TRAIN_HOP_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_HOP.DEPARTURE_STATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_TRAIN_HOP.ARRIVAL_STATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional()
});

export const TRAIN_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.fields.name.errors.required"))
		.max(10, msg("form.general.fields.name.errors.max")),
	[ENUM_FORM_TRAIN_PRODUCT.HOPS]: z
		.array(TRAIN_HOP_SCHEMA)
		.min(1, msg("form.general.flights.form.errors.min_segments"))
});
