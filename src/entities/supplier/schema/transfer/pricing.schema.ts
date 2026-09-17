import { z } from "zod";

import { type TTransferProductEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import { ENUM_SUPPLIER_SURCHARGE } from "../../types";
import {
	ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_EXPENSE_TYP,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_TYPE
} from "../../types/transfer/pricing-form.types";

import { TRANSFER_VARIANT_FEE_SCHEMA } from "./variant.schema";

const msg = i18nKey<TTransferProductEditPageKeys>();

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

const perCarPriceRowSchema = z.object({
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.FEES]: z.array(
		TRANSFER_VARIANT_FEE_SCHEMA
	),
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_car.fields.category_name.errors.required"
		)
	}),
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES]: z.array(
		TRANSFER_VARIANT_FEE_SCHEMA
	),
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perCarExpensesSchema = z.object({
	typ: z.literal(ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR),
	[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]:
		z.array(perCarPriceRowSchema)
});

const perCarCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY),
	[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: z.array(
		z.object({
			[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]: z
				.array(categoryRowSchema)
				.min(1, {
					message: msg(
						"form.pricing.form.per_car.fields.categories.errors.min"
					)
				})
		})
	)
});

const validateFlatOrPerPersonPricing = (
	data: {
		total_price?: number | null;
		currency?: ENUM_CURRENCY_OPTIONS_TYPE;
		add_margin_separately: boolean;
	},
	ctx: z.RefinementCtx
) => {
	if (data.total_price == null || data.total_price < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			),
			path: [ENUM_TRANSFER_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_TRANSFER_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_TRANSFER_PRODUCT_PRICING_FIELD.CURRENCY]
		});
	}
};

export const TRANSFER_PRODUCT_PRICING_SCHEMA = z
	.object({
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_TRANSFER_PRODUCT_PRICING_TYPE
		),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: z.boolean(),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
			z.boolean(),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES]: z
			.union([perCarExpensesSchema, perCarCategoryExpensesSchema])
			.nullable()
			.optional(),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.TOTAL_PRICE]:
			nullableNumber.optional(),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FEES]: z
			.array(TRANSFER_VARIANT_FEE_SCHEMA)
			.optional(),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.MARKUP]: markupSchema.optional()
	})
	.superRefine((data, ctx) => {
		if (data.pricing_type === ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR) {
			const expensesResult = data.price_based_on_class
				? perCarCategoryExpensesSchema.safeParse(data.expenses)
				: perCarExpensesSchema.safeParse(data.expenses);

			if (!expensesResult.success) {
				expensesResult.error.issues.forEach((issue) => {
					ctx.addIssue({
						...issue,
						path: [
							ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES,
							...issue.path
						]
					});
				});
			}

			return;
		}

		if (
			data.pricing_type ===
				ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE ||
			data.pricing_type === ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_PERSON
		) {
			validateFlatOrPerPersonPricing(data, ctx);
		}
	});
