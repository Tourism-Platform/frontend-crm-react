import { z } from "zod";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_NEW_CURRENCY_RATE } from "../types";

export const NEW_CURRENCY_RATE_SCHEMA = z.object({
	[ENUM_FORM_NEW_CURRENCY_RATE.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS, {
		message: "commission_type.new_currency.form.errors.currency.required"
	}),
	[ENUM_FORM_NEW_CURRENCY_RATE.RATE]: z
		.number({
			message: "commission_type.new_currency.form.errors.rate.required"
		})
		.min(0.01, "commission_type.new_currency.form.errors.rate.min")
		.max(1000, "commission_type.new_currency.form.errors.rate.max")
});
