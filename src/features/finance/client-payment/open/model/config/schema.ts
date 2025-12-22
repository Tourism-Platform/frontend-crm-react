import { z } from "zod";

export const OPEN_CLIENT_PAYMENT_SCHEMA = z.object({
	paymentId: z.string(),
	orderId: z.string(),
	dateCreated: z.string(),
	amount: z.number(),
	currency: z.string(),
	status: z.string()
});
