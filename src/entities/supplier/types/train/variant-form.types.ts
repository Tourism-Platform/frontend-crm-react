import { z } from "zod";

import type { TRAIN_VARIANT_FORM_SCHEMA } from "../../schema/train-variant.schema";

export const ENUM_FORM_TRAIN_VARIANT = {
	NAME: "name",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_TRAIN_VARIANT_TYPE =
	(typeof ENUM_FORM_TRAIN_VARIANT)[keyof typeof ENUM_FORM_TRAIN_VARIANT];

export type TTrainVariantFormSchema = z.infer<typeof TRAIN_VARIANT_FORM_SCHEMA>;
