import { z } from "zod";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_EDIT_COMMISSION_TYPE } from "../types";

export const EDIT_COMMISSION_TYPE_SCHEMA = z.object({
	[ENUM_FORM_EDIT_COMMISSION_TYPE.FROM_CURRENCY]: z.enum(
		ENUM_CURRENCY_OPTIONS
	),
	[ENUM_FORM_EDIT_COMMISSION_TYPE.TO_CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_EDIT_COMMISSION_TYPE.RATE]: z
		.number({
			message:
				"currency.commission_type.menu.edit.form.errors.rate.required"
		})
		.min(0.000001, {
			message: "currency.currency_rate.form.fields.rate.errors.min"
		})
});
