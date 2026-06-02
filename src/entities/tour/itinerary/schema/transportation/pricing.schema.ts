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

const markupSchema = z
	.object({
		typ: z.enum(ENUM_TRANSPORTATION_MARKUP_TYP),
		value: z.string().min(1, {
			message: msg(
				"form.pricing.form.per_car.fields.markup.value.errors.required"
			)
		})
	})
	.nullable();

const perCarPriceRowSchema = z.object({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: z.number().nullable(),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: z.number().nullable(),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_car.fields.category_name.errors.required"
		)
	}),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: z.number().nullable(),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: z.number().nullable(),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]: z.string(),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perCarByClassPriceRowSchema = z.object({
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: z
		.array(categoryRowSchema)
		.min(1, {
			message: msg(
				"form.pricing.form.per_car.fields.categories.errors.min"
			)
		})
});

const perCarExpensesSchema = z.object({
	typ: z.literal(ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR),
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]:
		z.array(perCarPriceRowSchema)
});

const perCarCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY),
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]: z.array(
		perCarByClassPriceRowSchema
	)
});

export const TRANSPORTATION_PRICING_SCHEMA = z.object({
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
	[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE]: z
		.number()
		.min(1, {
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			)
		})
		.max(10000, {
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			)
		})
		.optional(),
	[ENUM_TRANSPORTATION_PRICING_FIELD.TAXES]: z
		.number()
		.min(0, {
			message: msg(
				"form.pricing.form.pricing_details.fields.taxes_and_fees.errors.min"
			)
		})
		.max(100, {
			message: msg(
				"form.pricing.form.pricing_details.fields.taxes_and_fees.errors.max"
			)
		})
		.optional(),
	[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY]: z
		.string()
		.min(1, {
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			)
		})
		.max(3, {
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.max"
			)
		})
		.optional(),
	[ENUM_TRANSPORTATION_PRICING_FIELD.PACKAGE_TYPE]: z.string()
});

export type TTransportationPricingSchema = z.infer<
	typeof TRANSPORTATION_PRICING_SCHEMA
>;
