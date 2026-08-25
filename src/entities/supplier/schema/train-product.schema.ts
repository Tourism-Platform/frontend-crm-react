import { z } from "zod";

import { type TTrainProductEditPageKeys, i18nKey } from "@/shared/config";

const msg = i18nKey<TTrainProductEditPageKeys>();

export const ENUM_FORM_TRAIN_PRODUCT = {
	NAME: "name"
} as const;

export type ENUM_FORM_TRAIN_PRODUCT_TYPE =
	(typeof ENUM_FORM_TRAIN_PRODUCT)[keyof typeof ENUM_FORM_TRAIN_PRODUCT];

export const TRAIN_PRODUCT_NAME_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.errors.name.required"))
});

export type TTrainProductNameSchema = z.infer<typeof TRAIN_PRODUCT_NAME_SCHEMA>;
