import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_FLIGHT_MARKUP_TYP,
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	ENUM_FLIGHT_PRICING_TYPE,
	type IFlightPriceRowMarkup
} from "../../types";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const markupSchema = z
	.object({
		typ: z.enum(ENUM_FLIGHT_MARKUP_TYP),
		value: z.string()
	})
	.nullable();

const validateFlatOrPerPersonPricing = (
	data: {
		total_price?: number | null;
		currency?: string;
		add_margin_separately: boolean;
		markup?: IFlightPriceRowMarkup | null;
	},
	ctx: z.RefinementCtx
) => {
	if (data.total_price == null || data.total_price < 1) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			),
			path: [ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_FLIGHT_PRICING_FIELD.CURRENCY]
		});
	}
	if (data.add_margin_separately && !data.markup?.value?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.markup.value.errors.required"
			),
			path: [ENUM_FLIGHT_PRICING_FIELD.MARKUP, "value"]
		});
	}
};

export const FLIGHT_PRICING_SCHEMA = z
	.object({
		[ENUM_FLIGHT_PRICING_FIELD.INVOICING]: z.enum(
			ENUM_FLIGHT_PRICING_INVOICING
		),
		[ENUM_FLIGHT_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_FLIGHT_PRICING_TYPE
		),
		[ENUM_FLIGHT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE]: nullableNumber.optional(),
		[ENUM_FLIGHT_PRICING_FIELD.TAXES]: nullableNumber.optional(),
		[ENUM_FLIGHT_PRICING_FIELD.CURRENCY]: z.string().optional(),
		[ENUM_FLIGHT_PRICING_FIELD.MARKUP]: markupSchema.optional(),
		[ENUM_FLIGHT_PRICING_FIELD.PACKAGE_TYPE]: z.string()
	})
	.superRefine((data, ctx) => {
		if (data.invoicing !== ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL) {
			return;
		}

		validateFlatOrPerPersonPricing(data, ctx);
	});

export type TFlightPricingSchema = z.infer<typeof FLIGHT_PRICING_SCHEMA>;
