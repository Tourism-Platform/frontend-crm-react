import { z } from "zod";

import { type TTourPackageEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_PACKAGE_FIELD,
	ENUM_PACKAGE_MARKUP_TYP,
	ENUM_PACKAGE_PRICING_TYPE
} from "../types/package.types";

const msg = i18nKey<TTourPackageEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const nonNegativeNullableNumber = nullableNumber.refine(
	(value) => value === null || value >= 0
);

const optionalCurrencySchema = z.enum(ENUM_CURRENCY_OPTIONS).optional();

const markupSchema = z
	.object({
		typ: z.enum(ENUM_PACKAGE_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

export const PACKAGE_EDIT_SCHEMA = z
	.object({
		[ENUM_PACKAGE_FIELD.NAME]: z
			.string()
			.min(1, {
				message: msg("input.title.errors.required")
			})
			.max(120, {
				message: msg("input.title.errors.max")
			}),
		[ENUM_PACKAGE_FIELD.PRICING_TYPE]: z.enum(ENUM_PACKAGE_PRICING_TYPE),
		[ENUM_PACKAGE_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_PACKAGE_FIELD.TOTAL_PRICE]: nullableNumber.optional(),
		[ENUM_PACKAGE_FIELD.TAXES]: nonNegativeNullableNumber.optional(),
		[ENUM_PACKAGE_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_PACKAGE_FIELD.MARKUP]: markupSchema.optional(),
		[ENUM_PACKAGE_FIELD.SUPPLIER_ID]: z.string().nullable().optional()
	})
	.superRefine((data, ctx) => {
		if (data.total_price == null) {
			return;
		}

		if (data.total_price < 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.pricing_details.fields.total_price.errors.min"
				),
				path: [ENUM_PACKAGE_FIELD.TOTAL_PRICE]
			});
		}
		if (data.total_price > 100000) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.pricing_details.fields.total_price.errors.max"
				),
				path: [ENUM_PACKAGE_FIELD.TOTAL_PRICE]
			});
		}
		if (!data.currency?.trim()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.pricing_details.fields.currency.errors.required"
				),
				path: [ENUM_PACKAGE_FIELD.CURRENCY]
			});
		}
	});

export type TPackageEditSchema = z.infer<typeof PACKAGE_EDIT_SCHEMA>;
