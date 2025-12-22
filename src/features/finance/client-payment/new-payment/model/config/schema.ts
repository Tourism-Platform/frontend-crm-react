import { z } from "zod";

export const NEW_PAYMENT_SCHEMA = z.object({
	paymentId: z
		.string({
			message: "new_payment.form.errors.payment_id.required"
		})
		.min(1, "new_payment.form.errors.payment_id.min"),
	amount: z
		.number({
			message: "new_payment.form.errors.amount.required"
		})
		.min(1, "new_payment.form.errors.amount.min"),
	orderId: z.string().optional(),
	note: z.string().optional()
});
