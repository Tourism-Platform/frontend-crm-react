import { z } from "zod";

import { type TClientPaymentsPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_NEW_PAYMENT } from "../types";

const msg = i18nKey<TClientPaymentsPageKeys>();

export const NEW_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_NEW_PAYMENT.ORDER_ID]: z
		.string({
			message: msg("new_payment.form.errors.orderId.required")
		})
		.min(1, msg("new_payment.form.errors.orderId.min")),
	[ENUM_FORM_NEW_PAYMENT.AMOUNT]: z
		.number({
			message: msg("new_payment.form.errors.amount.required")
		})
		.min(1, msg("new_payment.form.errors.amount.min")),
	[ENUM_FORM_NEW_PAYMENT.RATE]: z
		.number({
			message: msg("new_payment.form.errors.rate.required")
		})
		.min(1, msg("new_payment.form.errors.rate.min")),
	[ENUM_FORM_NEW_PAYMENT.NOTE]: z.string().optional(),
	[ENUM_FORM_NEW_PAYMENT.FILES]: z.any().array().optional()
});
