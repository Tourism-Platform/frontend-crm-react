import { z } from "zod";

import { type TTourEventGuideEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE
} from "../../types";
import { feesArraySchema } from "../common/fee.schema";

const msg = i18nKey<TTourEventGuideEditPageKeys>();

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
	// Backend percentage is strictly between 0 and 1 (fe6.4 §12); the form keeps percent.
	.refine(
		(markup) =>
			markup.typ !== ENUM_GUIDE_MARKUP_TYP.PERCENTAGE ||
			markup.value.trim() === "" ||
			(Number(markup.value) > 0 && Number(markup.value) < 100),
		{
			message: msg("markup_errors.percentage_range"),
			path: ["value"]
		}
	)
	.nullable();

const chargeTypSchema = z.enum(ENUM_GUIDE_CHARGE);

const perGuidePriceRowSchema = z.object({
	[ENUM_GUIDE_PRICE_ROW_FIELD.CHARGE_TYP]: chargeTypSchema,
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: feesArraySchema,
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	// Empty lang is allowed — sync creates blank rows when a guide is added
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: z.string(),
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CHARGE_TYP]: chargeTypSchema,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: feesArraySchema,
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
		[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: z.string()
	})
	.superRefine((data, ctx) => {
		if (data.invoicing === ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE) {
			if (!data.package_id?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"form.pricing.form.package.fields.package.errors.required",
					path: [ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]
				});
			}
			return;
		}

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
