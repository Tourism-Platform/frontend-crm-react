import { z } from "zod";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE
} from "../../types";

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
		typ: z.enum(ENUM_GUIDE_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

const perGuidePriceRowSchema = z.object({
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: nonNegativeNullableNumber,
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	// Empty lang is allowed — sync creates blank rows when a guide is added
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: z.string(),
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: nonNegativeNullableNumber,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perGuideExpensesSchema = z.object({
	typ: z.literal(ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE),
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: z.array(
		perGuidePriceRowSchema
	)
});

const perGuideCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY),
	[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: z.array(
		z.object({
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]:
				z.array(categoryRowSchema)
		})
	)
});

export const GUIDE_PRICING_SCHEMA = z
	.object({
		[ENUM_GUIDE_PRICING_FIELD.INVOICING]: z.enum(
			ENUM_GUIDE_PRICING_INVOICING
		),
		[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_GUIDE_PRICING_TYPE
		),
		[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: z.boolean(),
		[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: z
			.union([perGuideExpensesSchema, perGuideCategoryExpensesSchema])
			.nullable()
			.optional(),
		[ENUM_GUIDE_PRICING_FIELD.PACKAGE_TYPE]: z.string()
	})
	.superRefine((data, ctx) => {
		if (data.invoicing !== ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL) {
			return;
		}

		if (data.pricing_type !== ENUM_GUIDE_PRICING_TYPE.PER_GUIDE) {
			return;
		}

		// Pricing rows are optional — null/undefined expenses must not block save
		if (data.expenses == null) {
			return;
		}

		const expensesResult = data.price_by_language
			? perGuideCategoryExpensesSchema.safeParse(data.expenses)
			: perGuideExpensesSchema.safeParse(data.expenses);

		if (!expensesResult.success) {
			expensesResult.error.issues.forEach((issue) => {
				ctx.addIssue({
					...issue,
					path: [ENUM_GUIDE_PRICING_FIELD.EXPENSES, ...issue.path]
				});
			});
			return;
		}
	});

export type TGuidePricingSchema = z.infer<typeof GUIDE_PRICING_SCHEMA>;
