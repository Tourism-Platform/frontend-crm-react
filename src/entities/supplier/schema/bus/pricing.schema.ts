import { z } from "zod";

import { type TBusProductEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import { ENUM_SUPPLIER_SURCHARGE } from "../../types";
import {
	ENUM_BUS_PRODUCT_PRICING_FIELD,
	ENUM_BUS_PRODUCT_PRICING_TYPE,
	ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD
} from "../../types/bus/pricing-form.types";

import { BUS_VARIANT_FEE_SCHEMA } from "./variant.schema";

const msg = i18nKey<TBusProductEditPageKeys>();

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

const vehiclePriceRowSchema = z.object({
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.VARIANT_ID]: z.string(),
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.FEES]: z.array(
		BUS_VARIANT_FEE_SCHEMA
	),
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.MARKUP]: markupSchema
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
			path: [ENUM_BUS_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_BUS_PRODUCT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_BUS_PRODUCT_PRICING_FIELD.CURRENCY]
		});
	}
};

export const BUS_PRODUCT_PRICING_SCHEMA = z
	.object({
		[ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_BUS_PRODUCT_PRICING_TYPE
		),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES]: z.array(
			vehiclePriceRowSchema
		),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.TOTAL_PRICE]: nullableNumber.optional(),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.FEES]: z
			.array(BUS_VARIANT_FEE_SCHEMA)
			.optional(),
		[ENUM_BUS_PRODUCT_PRICING_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_BUS_PRODUCT_PRICING_FIELD.MARKUP]: markupSchema.optional()
	})
	.superRefine((data, ctx) => {
		if (data.pricing_type === ENUM_BUS_PRODUCT_PRICING_TYPE.PER_VEHICLE) {
			const vehiclesResult = z
				.array(vehiclePriceRowSchema)
				.safeParse(data.vehicles);

			if (!vehiclesResult.success) {
				vehiclesResult.error.issues.forEach((issue) => {
					ctx.addIssue({
						...issue,
						path: [
							ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES,
							...issue.path
						]
					});
				});
			}

			return;
		}

		if (
			data.pricing_type === ENUM_BUS_PRODUCT_PRICING_TYPE.FLAT_RATE ||
			data.pricing_type === ENUM_BUS_PRODUCT_PRICING_TYPE.PER_PERSON
		) {
			validateFlatOrPerPersonPricing(data, ctx);
		}
	});
