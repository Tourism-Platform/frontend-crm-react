import { z } from "zod";

import { type TTrainProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_SUPPLIER_FEE_FIELD, ENUM_TRAIN_VARIANT_CHARGE } from "../types";

const msg = i18nKey<TTrainProductEditPageKeys>();

export const ENUM_FORM_TRAIN_VARIANT = {
	NAME: "name",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_TRAIN_VARIANT_TYPE =
	(typeof ENUM_FORM_TRAIN_VARIANT)[keyof typeof ENUM_FORM_TRAIN_VARIANT];

const TRAIN_VARIANT_FEE_SCHEMA = z.object({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: z.string().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.COST]: z.number().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: z
		.enum(ENUM_CURRENCY_OPTIONS)
		.nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: z.string().nullable()
});

export const TRAIN_VARIANT_FORM_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.errors.name.required")),
	[ENUM_FORM_TRAIN_VARIANT.CHARGE_TYP]: z.enum(ENUM_TRAIN_VARIANT_CHARGE),
	[ENUM_FORM_TRAIN_VARIANT.COST]: z.string(),
	[ENUM_FORM_TRAIN_VARIANT.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_TRAIN_VARIANT.FEES]: z.array(TRAIN_VARIANT_FEE_SCHEMA)
});

export type TTrainVariantFormSchema = z.infer<typeof TRAIN_VARIANT_FORM_SCHEMA>;
