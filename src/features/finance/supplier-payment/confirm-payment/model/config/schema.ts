import { z } from "zod";

export const CONFIRM_PAYMENT_SCHEMA = z.object({
	orderId: z
		.string({
			message: "form.errors.order_id.required"
		})
		.min(1, "form.errors.order_id.min"),
	amount: z
		.number({
			message: "form.errors.amount.required"
		})
		.min(1, "form.errors.amount.min"),
	note: z.string().optional()
});

export type TConfirmPaymentSchema = z.infer<typeof CONFIRM_PAYMENT_SCHEMA>;
