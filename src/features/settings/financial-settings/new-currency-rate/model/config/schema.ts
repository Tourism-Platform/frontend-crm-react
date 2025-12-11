import { z } from "zod";

export const NEW_CURRENCY_RATE_SCHEMA = z.object({
	name: z.string({
		message: "commission_type.new_currency.form.errors.name.required"
	}),
	rate: z
		.number({
			message: "commission_type.new_currency.form.errors.rate.required"
		})
		.min(0.01, "commission_type.new_currency.form.errors.rate.min")
		.max(1000, "commission_type.new_currency.form.errors.rate.max")
});
