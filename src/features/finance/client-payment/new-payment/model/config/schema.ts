import { z } from "zod";

export const NEW_PAYMENT_SCHEMA = z.object({
	orderId: z
		.string({
			message: "new_payment.form.errors.order_id.required"
		})
		.min(1, "new_payment.form.errors.order_id.min"),
	amount: z
		.number({
			message: "new_payment.form.errors.amount.required"
		})
		.min(1, "new_payment.form.errors.amount.min"),
	note: z.string().optional()
});
