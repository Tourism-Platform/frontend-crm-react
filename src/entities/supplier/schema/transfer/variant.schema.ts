import { z } from "zod";

import { type TTransferProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_SUPPLIER_FEE_FIELD,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";
import {
	ENUM_FORM_TRANSFER_CATEGORY,
	ENUM_FORM_TRANSFER_MARKUP,
	ENUM_FORM_TRANSFER_VARIANT
} from "../../types/transfer/variant-form.types";

const msg = i18nKey<TTransferProductEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const nonNegativeNullableNumber = nullableNumber.refine(
	(value) => value === null || value >= 0
);

export const TRANSFER_VARIANT_FEE_SCHEMA = z
	.object({
		[ENUM_SUPPLIER_FEE_FIELD.NAME]: z.string().nullable(),
		[ENUM_SUPPLIER_FEE_FIELD.COST]: nonNegativeNullableNumber,
		[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: z
			.enum(ENUM_CURRENCY_OPTIONS)
			.nullable(),
		[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: z.string().nullable()
	})
	.superRefine((data, ctx) => {
		if (
			data[ENUM_SUPPLIER_FEE_FIELD.COST] != null &&
			data[ENUM_SUPPLIER_FEE_FIELD.CURRENCY] == null
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "currency required when cost is set",
				path: [ENUM_SUPPLIER_FEE_FIELD.CURRENCY]
			});
		}
	});

export const TRANSFER_MARKUP_FORM_SCHEMA = z
	.object({
		[ENUM_FORM_TRANSFER_MARKUP.TYP]: z.enum(ENUM_SUPPLIER_SURCHARGE),
		[ENUM_FORM_TRANSFER_MARKUP.VALUE]: z.string()
	})
	.nullable();

export const TRANSFER_VARIANT_CATEGORY_SCHEMA = z.object({
	[ENUM_FORM_TRANSFER_CATEGORY.ID]: z.string().optional(),
	[ENUM_FORM_TRANSFER_CATEGORY.NAME]: z.string(),
	[ENUM_FORM_TRANSFER_CATEGORY.COST]: z.number().nullable(),
	[ENUM_FORM_TRANSFER_CATEGORY.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_TRANSFER_CATEGORY.FEES]: z.array(TRANSFER_VARIANT_FEE_SCHEMA),
	[ENUM_FORM_TRANSFER_CATEGORY.MARKUP]: TRANSFER_MARKUP_FORM_SCHEMA
});

export const TRANSFER_VARIANT_CREATE_SCHEMA = z.object({
	[ENUM_FORM_TRANSFER_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.fields.name.errors.required"))
});

export const TRANSFER_VARIANT_FORM_SCHEMA = z.object({
	[ENUM_FORM_TRANSFER_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.fields.name.errors.required")),
	[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE]: z.enum(ENUM_VEHICLE_BODY_TYPE),
	[ENUM_FORM_TRANSFER_VARIANT.PAX]: z
		.number()
		.int()
		.min(1, msg("form.variants.fields.pax.errors.min")),
	[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION]: z.string(),
	[ENUM_FORM_TRANSFER_VARIANT.COST]: z.number().nullable(),
	[ENUM_FORM_TRANSFER_VARIANT.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_TRANSFER_VARIANT.FEES]: z.array(TRANSFER_VARIANT_FEE_SCHEMA),
	[ENUM_FORM_TRANSFER_VARIANT.CATEGORIES]: z.array(
		TRANSFER_VARIANT_CATEGORY_SCHEMA
	),
	[ENUM_FORM_TRANSFER_VARIANT.ADD_MARGIN_SEPARATELY]: z.boolean(),
	[ENUM_FORM_TRANSFER_VARIANT.MARKUP]: TRANSFER_MARKUP_FORM_SCHEMA
});
