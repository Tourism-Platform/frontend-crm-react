import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_PRICE_DETAILS } from "../../types";

import { feesArraySchema } from "./fee.schema";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

export const PRICING_SCHEMA = z.object({
	[ENUM_FORM_PRICE_DETAILS.TOTAL_PRICE]: z
		.number()
		.min(0, {
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			)
		})
		.max(10000, {
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			)
		}),
	[ENUM_FORM_PRICE_DETAILS.FEES]: feesArraySchema,
	[ENUM_FORM_PRICE_DETAILS.CURRENCY]: z
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
});
