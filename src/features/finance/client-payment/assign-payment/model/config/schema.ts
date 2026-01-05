import { z } from "zod";

import { ENUM_FORM_ASSIGN_PAYMENT } from "../types";

export const ASSIGN_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_ASSIGN_PAYMENT.ORDER_ID]: z
		.string({
			message: "menu.assign.form.errors.orderId.required"
		})
		.min(1, "menu.assign.form.errors.orderId.min"),
	[ENUM_FORM_ASSIGN_PAYMENT.AMOUNT]: z
		.number({
			message: "menu.assign.form.errors.amount.required"
		})
		.min(1, "menu.assign.form.errors.amount.min"),
	[ENUM_FORM_ASSIGN_PAYMENT.NOTE]: z.string().optional(),
	[ENUM_FORM_ASSIGN_PAYMENT.FILES]: z.any().array().optional()
});
