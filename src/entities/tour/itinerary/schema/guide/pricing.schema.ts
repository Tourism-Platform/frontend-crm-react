import { z } from "zod";

import { type TTourEventGuideEditPageKeys, i18nKey } from "@/shared/config";

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

const msg = i18nKey<TTourEventGuideEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const markupSchema = z
	.object({
		typ: z.enum(ENUM_GUIDE_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

const perGuidePriceRowSchema = z.object({
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: nullableNumber,
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: nullableNumber,
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_guide.fields.language.errors.required"
		)
	}),
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: nullableNumber,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: nullableNumber,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: z.string(),
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
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: z
				.array(categoryRowSchema)
				.min(1, {
					message: msg(
						"form.pricing.form.per_guide.fields.categories.errors.min"
					)
				})
		})
	)
});

const validateMarkupRows = (
	rows: {
		[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: z.infer<typeof markupSchema>;
	}[],
	ctx: z.RefinementCtx,
	pathPrefix: (string | number)[]
) => {
	rows.forEach((row, index) => {
		const markup = row[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP];
		if (!markup?.value?.trim()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.per_guide.fields.markup.value.errors.required"
				),
				path: [
					...pathPrefix,
					index,
					ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP,
					"value"
				]
			});
		}
	});
};

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
		}

		if (data.add_margin_separately && expensesResult.success) {
			const expenses = expensesResult.data;
			if (expenses.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE) {
				validateMarkupRows(
					expenses[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES],
					ctx,
					[
						ENUM_GUIDE_PRICING_FIELD.EXPENSES,
						ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES
					]
				);
			} else {
				expenses[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES].forEach(
					(guide, guideIndex) => {
						validateMarkupRows(
							guide[
								ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES
							],
							ctx,
							[
								ENUM_GUIDE_PRICING_FIELD.EXPENSES,
								ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES,
								guideIndex,
								ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES
							]
						);
					}
				);
			}
		}
	});

export type TGuidePricingSchema = z.infer<typeof GUIDE_PRICING_SCHEMA>;
