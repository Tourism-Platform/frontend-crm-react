import { z } from "zod";

export const ASSIGN_PAYMENT_SCHEMA = z.object({
	orderId: z
		.string({
			message: "menu.assign.form.errors.order_id.required"
		})
		.min(1, "menu.assign.form.errors.order_id.min"),
	amount: z
		.number({
			message: "menu.assign.form.errors.amount.required"
		})
		.min(1, "menu.assign.form.errors.amount.min"),
	note: z.string().optional()
});
