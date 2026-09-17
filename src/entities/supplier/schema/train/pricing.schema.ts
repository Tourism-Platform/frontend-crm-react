import { z } from "zod";

import { type TTrainProductEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import { ENUM_SUPPLIER_SURCHARGE } from "../../types";
import {
	ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_TYPE
} from "../../types/train/pricing-form.types";
import { ENUM_TRAIN_VARIANT_CHARGE } from "../../types/train/product.types";

import { TRAIN_VARIANT_FEE_SCHEMA } from "./variant.schema";

const msg = i18nKey<TTrainProductEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const nonNegativeNullableNumber = nullableNumber.refine(
	(value) => value === null || value >= 0
);

const markupSchema = z
	.object({
		typ: z.enum(ENUM_SUPPLIER_SURCHARGE),
		value: z.string()
	})
	.nullable();

const optionalCurrencySchema = z.enum(ENUM_CURRENCY_OPTIONS).optional();

const farePriceRowSchema = z.object({
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.VARIANT_ID]: z.string(),
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP]: z.enum(
		ENUM_TRAIN_VARIANT_CHARGE
	),
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.FEES]: z.array(
		TRAIN_VARIANT_FEE_SCHEMA
	),
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const validateFlatOrPerPersonPricing = (
	data: {
		total_price?: number | null;
		currency?: ENUM_CURRENCY_OPTIONS_TYPE;
	},
	ctx: z.RefinementCtx
) => {
	if (data.total_price == null || data.total_price < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			),
			path: [ENUM_TRAIN_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_TRAIN_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_TRAIN_PRODUCT_PRICING_FIELD.CURRENCY]
		});
	}
};

export const TRAIN_PRODUCT_PRICING_SCHEMA = z
	.object({
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_TRAIN_PRODUCT_PRICING_TYPE
		),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES]: z.array(farePriceRowSchema),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.TOTAL_PRICE]:
			nullableNumber.optional(),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.FEES]: z
			.array(TRAIN_VARIANT_FEE_SCHEMA)
			.optional(),
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_TRAIN_PRODUCT_PRICING_FIELD.MARKUP]: markupSchema.optional()
	})
	.superRefine((data, ctx) => {
		if (data.pricing_type === ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_FARE) {
			const faresResult = z
				.array(farePriceRowSchema)
				.safeParse(data.fares);

			if (!faresResult.success) {
				faresResult.error.issues.forEach((issue) => {
					ctx.addIssue({
						...issue,
						path: [
							ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES,
							...issue.path
						]
					});
				});
			}

			return;
		}

		if (
			data.pricing_type === ENUM_TRAIN_PRODUCT_PRICING_TYPE.FLAT_RATE ||
			data.pricing_type === ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_PERSON
		) {
			validateFlatOrPerPersonPricing(data, ctx);
		}
	});
