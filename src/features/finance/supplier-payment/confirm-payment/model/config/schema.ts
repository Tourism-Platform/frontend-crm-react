import { z } from "zod";

import { ENUM_FORM_CONFIRM_PAYMENT } from "../types";

export const CONFIRM_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID]: z
		.string({
			message: "form.errors.orderId.required"
		})
		.min(1, "form.errors.orderId.min"),
	[ENUM_FORM_CONFIRM_PAYMENT.AMOUNT]: z
		.number({
			message: "form.errors.amount.required"
		})
		.min(1, "form.errors.amount.min"),
	[ENUM_FORM_CONFIRM_PAYMENT.NOTE]: z.string().optional(),
	[ENUM_FORM_CONFIRM_PAYMENT.FILES]: z.any().array().optional()
});
