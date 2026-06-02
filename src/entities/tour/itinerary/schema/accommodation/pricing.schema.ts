import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD,
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_MARKUP_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE
} from "../../types";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const markupSchema = z
	.object({
		typ: z.enum(ENUM_ACCOMMODATION_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

const perRoomPriceRowSchema = z.object({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: nullableNumber,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: nullableNumber,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_room.fields.category_name.errors.required"
		)
	}),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: nullableNumber,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]: nullableNumber,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perRoomExpensesSchema = z.object({
	typ: z.literal(ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM),
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: z.array(
		perRoomPriceRowSchema
	)
});

const perRoomCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY),
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: z.array(
		z.object({
			[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: z
				.array(categoryRowSchema)
				.min(1, {
					message: msg(
						"form.pricing.form.per_room.fields.categories.errors.min"
					)
				})
		})
	)
});

const validateMarkupRows = (
	rows: {
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: z.infer<
			typeof markupSchema
		>;
	}[],
	ctx: z.RefinementCtx,
	pathPrefix: (string | number)[]
) => {
	rows.forEach((row, index) => {
		const markup = row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP];
		if (!markup?.value?.trim()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.per_room.fields.markup.value.errors.required"
				),
				path: [
					...pathPrefix,
					index,
					ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP,
					"value"
				]
			});
		}
	});
};

export const ACCOMMODATION_PRICING_SCHEMA = z
	.object({
		[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]: z.enum(
			ENUM_ACCOMMODATION_PRICING_INVOICING
		),
		[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_ACCOMMODATION_PRICING_TYPE
		),
		[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: z.boolean(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: z
			.union([perRoomExpensesSchema, perRoomCategoryExpensesSchema])
			.nullable()
			.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]:
			nullableNumber.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.TAXES]: nullableNumber.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: z.string().optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE]: z.string()
	})
	.superRefine((data, ctx) => {
		if (
			data.invoicing !== ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
		) {
			return;
		}

		if (data.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM) {
			const expensesResult = data.price_based_on_class
				? perRoomCategoryExpensesSchema.safeParse(data.expenses)
				: perRoomExpensesSchema.safeParse(data.expenses);

			if (!expensesResult.success) {
				expensesResult.error.issues.forEach((issue) => {
					ctx.addIssue({
						...issue,
						path: [
							ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES,
							...issue.path
						]
					});
				});
			}

			if (data.add_margin_separately && expensesResult.success) {
				const expenses = expensesResult.data;
				if (expenses.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM) {
					validateMarkupRows(
						expenses[
							ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS
						],
						ctx,
						[
							ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES,
							ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS
						]
					);
				} else {
					expenses[
						ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS
					].forEach((room, roomIndex) => {
						validateMarkupRows(
							room[
								ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD
									.CATEGORIES
							],
							ctx,
							[
								ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES,
								ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS,
								roomIndex,
								ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES
							]
						);
					});
				}
			}

			return;
		}

		const hasFlatRatePricing =
			data.total_price != null ||
			data.taxes != null ||
			Boolean(data.currency?.trim());

		if (!hasFlatRatePricing) {
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
					path: [ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]
				});
			}
			if (data.total_price != null && data.total_price > 10000) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.pricing_details.fields.total_price.errors.max"
					),
					path: [ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]
				});
			}
			if (!data.currency?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.pricing_details.fields.currency.errors.required"
					),
					path: [ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]
				});
			}
		}
	});

export type TAccommodationPricingSchema = z.infer<
	typeof ACCOMMODATION_PRICING_SCHEMA
>;
