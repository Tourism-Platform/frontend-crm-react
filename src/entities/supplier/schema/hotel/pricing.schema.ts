import { z } from "zod";

import { type THotelProductEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import { ENUM_SUPPLIER_SURCHARGE } from "../../types";
import {
	ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_HOTEL_PRODUCT_EXPENSE_TYP,
	ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD,
	ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD,
	ENUM_HOTEL_PRODUCT_PRICING_FIELD,
	ENUM_HOTEL_PRODUCT_PRICING_TYPE
} from "../../types/hotel/pricing-form.types";

import { HOTEL_VARIANT_FEE_SCHEMA } from "./variant.schema";

const msg = i18nKey<THotelProductEditPageKeys>();

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

const perRoomPriceRowSchema = z.object({
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES]: z.array(
		HOTEL_VARIANT_FEE_SCHEMA
	),
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.NAME]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_room.fields.category_name.errors.required"
		)
	}),
	[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.FEES]: z.array(
		HOTEL_VARIANT_FEE_SCHEMA
	),
	[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perRoomExpensesSchema = z.object({
	typ: z.literal(ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM),
	[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]: z.array(
		perRoomPriceRowSchema
	)
});

const perRoomCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM_CATEGORY),
	[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]: z.array(
		z.object({
			[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: z
				.array(categoryRowSchema)
				.min(1, {
					message: msg(
						"form.pricing.form.per_room.fields.categories.errors.min"
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
			path: [ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_HOTEL_PRODUCT_PRICING_FIELD.CURRENCY]
		});
	}
};

export const HOTEL_PRODUCT_PRICING_SCHEMA = z
	.object({
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_HOTEL_PRODUCT_PRICING_TYPE
		),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: z.boolean(),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.EXPENSES]: z
			.union([perRoomExpensesSchema, perRoomCategoryExpensesSchema])
			.nullable()
			.optional(),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE]:
			nullableNumber.optional(),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.FEES]: z
			.array(HOTEL_VARIANT_FEE_SCHEMA)
			.optional(),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.MARKUP]: markupSchema.optional()
	})
	.superRefine((data, ctx) => {
		if (data.pricing_type === ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_ROOM) {
			const expensesResult = data.price_based_on_class
				? perRoomCategoryExpensesSchema.safeParse(data.expenses)
				: perRoomExpensesSchema.safeParse(data.expenses);

			if (!expensesResult.success) {
				expensesResult.error.issues.forEach((issue) => {
					ctx.addIssue({
						...issue,
						path: [
							ENUM_HOTEL_PRODUCT_PRICING_FIELD.EXPENSES,
							...issue.path
						]
					});
				});
			}

			return;
		}

		if (
			data.pricing_type === ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE ||
			data.pricing_type === ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_PERSON
		) {
			validateFlatOrPerPersonPricing(data, ctx);
		}
	});
