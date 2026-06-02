import { z } from "zod";

import {
	type TTourEventTransportationEditPageKeys,
	i18nKey
} from "@/shared/config";

import {
	ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD,
	ENUM_TRANSPORTATION_EXPENSE_TYP,
	ENUM_TRANSPORTATION_MARKUP_TYP,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICE_ROW_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE
} from "../../types";

const msg = i18nKey<TTourEventTransportationEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const markupSchema = z
	.object({
		typ: z.enum(ENUM_TRANSPORTATION_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

const perCarPriceRowSchema = z.object({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: nullableNumber,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: nullableNumber,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_car.fields.category_name.errors.required"
		)
	}),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: nullableNumber,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: nullableNumber,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perCarExpensesSchema = z.object({
	typ: z.literal(ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR),
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]:
		z.array(perCarPriceRowSchema)
});

const perCarCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY),
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]: z.array(
		z.object({
			[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: z
				.array(categoryRowSchema)
				.min(1, {
					message: msg(
						"form.pricing.form.per_car.fields.categories.errors.min"
					)
				})
		})
	)
});

const validateMarkupRows = (
	rows: {
		[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: z.infer<
			typeof markupSchema
		>;
	}[],
	ctx: z.RefinementCtx,
	pathPrefix: (string | number)[]
) => {
	rows.forEach((row, index) => {
		const markup = row[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP];
		if (!markup?.value?.trim()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.per_car.fields.markup.value.errors.required"
				),
				path: [
					...pathPrefix,
					index,
					ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP,
					"value"
				]
			});
		}
	});
};

export const TRANSPORTATION_PRICING_SCHEMA = z
	.object({
		[ENUM_TRANSPORTATION_PRICING_FIELD.INVOICING]: z.enum(
			ENUM_TRANSPORTATION_PRICING_INVOICING
		),
		[ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_TRANSPORTATION_PRICING_TYPE
		),
		[ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: z.boolean(),
		[ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES]: z
			.union([perCarExpensesSchema, perCarCategoryExpensesSchema])
			.nullable()
			.optional(),
		[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]:
			nullableNumber.optional(),
		[ENUM_TRANSPORTATION_PRICING_FIELD.TAXES]: nullableNumber.optional(),
		[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]: z.string().optional(),
		[ENUM_TRANSPORTATION_PRICING_FIELD.PACKAGE_TYPE]: z.string()
	})
	.superRefine((data, ctx) => {
		if (
			data.invoicing !== ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL
		) {
			return;
		}

		if (data.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR) {
			const expensesResult = data.price_based_on_class
				? perCarCategoryExpensesSchema.safeParse(data.expenses)
				: perCarExpensesSchema.safeParse(data.expenses);

			if (!expensesResult.success) {
				expensesResult.error.issues.forEach((issue) => {
					ctx.addIssue({
						...issue,
						path: [
							ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES,
							...issue.path
						]
					});
				});
			}

			if (data.add_margin_separately && expensesResult.success) {
				const expenses = expensesResult.data;
				if (expenses.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR) {
					validateMarkupRows(
						expenses[
							ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS
						],
						ctx,
						[
							ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES,
							ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS
						]
					);
				} else {
					expenses[
						ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS
					].forEach((car, carIndex) => {
						validateMarkupRows(
							car[
								ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD
									.CATEGORIES
							],
							ctx,
							[
								ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES,
								ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS,
								carIndex,
								ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES
							]
						);
					});
				}
			}

			return;
		}

		if (
			data.total_price == null ||
			data.total_price < 1 ||
			data.total_price > 10000 ||
			!data.currency?.trim()
		) {
			if (data.total_price == null || data.total_price < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.pricing_details.fields.total_price.errors.min"
					),
					path: [ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]
				});
			}
			if (data.total_price != null && data.total_price > 10000) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.pricing_details.fields.total_price.errors.max"
					),
					path: [ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]
				});
			}
			if (!data.currency?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.pricing_details.fields.currency.errors.required"
					),
					path: [ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]
				});
			}
		}
	});

export type TTransportationPricingSchema = z.infer<
	typeof TRANSPORTATION_PRICING_SCHEMA
>;
