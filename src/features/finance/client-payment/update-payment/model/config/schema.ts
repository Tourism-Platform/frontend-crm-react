import { z } from "zod";

import { ENUM_FORM_UPDATE_PAYMENT } from "../types";

export const UPDATE_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_UPDATE_PAYMENT.ORDER_ID]: z.string().optional(),
	[ENUM_FORM_UPDATE_PAYMENT.AMOUNT]: z
		.number({
			message: "menu.update.form.errors.amount.required"
		})
		.min(1, "menu.update.form.errors.amount.min"),
	[ENUM_FORM_UPDATE_PAYMENT.NOTE]: z.string().optional(),
	[ENUM_FORM_UPDATE_PAYMENT.FILES]: z.any().array().optional()
});
