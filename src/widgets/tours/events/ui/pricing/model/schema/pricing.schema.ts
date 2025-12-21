import { z } from "zod";

import { ENUM_FORM_PRICE_DETAILS } from "../types";

export const PRICING_SCHEMA = z.object({
	[ENUM_FORM_PRICE_DETAILS.TOTAL_PRICE]: z
		.number()
		.min(1, {
			message:
				"pricing.form.pricing_details.fields.total_price.errors.min"
		})
		.max(10000, {
			message:
				"pricing.form.pricing_details.fields.total_price.errors.max"
		}),
	[ENUM_FORM_PRICE_DETAILS.TAXES]: z
		.number()
		.min(1, {
			message:
				"pricing.form.pricing_details.fields.taxes_and_fees.errors.min"
		})
		.max(100, {
			message:
				"pricing.form.pricing_details.fields.taxes_and_fees.errors.max"
		}),
	[ENUM_FORM_PRICE_DETAILS.CURRENCY]: z.string()
});
