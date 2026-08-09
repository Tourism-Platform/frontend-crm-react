import { z } from "zod";

import {
	type TTourEventSupplementEditPageKeys,
	i18nKey
} from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_SUPPLEMENT_MARKUP_TYP,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICE_ROW_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	ENUM_SUPPLEMENT_PRICING_INVOICING,
	ENUM_SUPPLEMENT_PRICING_TYPE
} from "../../types";

const msg = i18nKey<TTourEventSupplementEditPageKeys>();

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
		typ: z.enum(ENUM_SUPPLEMENT_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

const perItemPriceRowSchema = z.object({
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]: nonNegativeNullableNumber,
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const perItemExpensesSchema = z.object({
	typ: z.literal(ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM),
	[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: z.array(
		perItemPriceRowSchema
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
	if (data.total_price == null || !Number.isFinite(data.total_price)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.required"
			),
			path: [ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			),
			path: [ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]
		});
	}
};

export const SUPPLEMENT_PRICING_SCHEMA = z
	.object({
		[ENUM_SUPPLEMENT_PRICING_FIELD.INVOICING]: z.enum(
			ENUM_SUPPLEMENT_PRICING_INVOICING
		),
		[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_SUPPLEMENT_PRICING_TYPE
		),
		[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]:
			perItemExpensesSchema.optional(),
		[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]: nullableNumber.optional(),
		[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES]:
			nonNegativeNullableNumber.optional(),
		[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: markupSchema.optional(),
		[ENUM_SUPPLEMENT_PRICING_FIELD.PACKAGE_TYPE]: z.string()
	})
	.superRefine((data, ctx) => {
		if (data.invoicing !== ENUM_SUPPLEMENT_PRICING_INVOICING.INDIVIDUAL) {
			return;
		}

		if (data.pricing_type === ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM) {
			const items =
				data.expenses?.[
					ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS
				] ?? [];
			if (items.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg("form.pricing.form.per_item.empty_items"),
					path: [ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]
				});
			}
			return;
		}

		if (
			data.pricing_type === ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE ||
			data.pricing_type === ENUM_SUPPLEMENT_PRICING_TYPE.PER_PERSON
		) {
			validateFlatOrPerPersonPricing(data, ctx);
		}
	});

export type TSupplementPricingSchema = z.infer<
	typeof SUPPLEMENT_PRICING_SCHEMA
>;
