import { z } from "zod";

export const ASSIGN_CLIENT_PAYMENT_SCHEMA = z.object({
	orderId: z
		.string({
			message: "client_payment.menu.assign.form.errors.order_id.required"
		})
		.min(1, "client_payment.menu.assign.form.errors.order_id.min")
});
