import { z } from "zod";

import { ENUM_FORM_NEW_PAYMENT } from "../types";

export const NEW_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_NEW_PAYMENT.ORDER_ID]: z
		.string({
			message: "new_payment.form.errors.orderId.required"
		})
		.min(1, "new_payment.form.errors.orderId.min"),
	[ENUM_FORM_NEW_PAYMENT.AMOUNT]: z
		.number({
			message: "new_payment.form.errors.amount.required"
		})
		.min(1, "new_payment.form.errors.amount.min"),
	[ENUM_FORM_NEW_PAYMENT.NOTE]: z.string().optional(),
	[ENUM_FORM_NEW_PAYMENT.FILES]: z.any().array().optional()
});
