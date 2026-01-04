import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_PRICE_DETAILS } from "../types";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

export const PRICING_SCHEMA = z.object({
	[ENUM_FORM_PRICE_DETAILS.TOTAL_PRICE]: z
		.number()
		.min(1, {
			message: msg(
				"pricing.form.pricing_details.fields.total_price.errors.min"
			)
		})
		.max(10000, {
			message: msg(
				"pricing.form.pricing_details.fields.total_price.errors.max"
			)
		}),
	[ENUM_FORM_PRICE_DETAILS.TAXES]: z
		.number()
		.min(1, {
			message: msg(
				"pricing.form.pricing_details.fields.taxes_and_fees.errors.min"
			)
		})
		.max(100, {
			message: msg(
				"pricing.form.pricing_details.fields.taxes_and_fees.errors.max"
			)
		}),
	[ENUM_FORM_PRICE_DETAILS.CURRENCY]: z
		.string()
		.min(1, {
			message: msg(
				"pricing.form.pricing_details.fields.currency.errors.required"
			)
		})
		.max(3, {
			message: msg(
				"pricing.form.pricing_details.fields.currency.errors.max"
			)
		})
});
