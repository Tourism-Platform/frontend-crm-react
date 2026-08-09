import { z } from "zod";

import { type TClientPaymentsPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_UPDATE_PAYMENT } from "../types";

const msg = i18nKey<TClientPaymentsPageKeys>();

export const UPDATE_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_UPDATE_PAYMENT.ORDER_ID]: z.string().optional(),
	[ENUM_FORM_UPDATE_PAYMENT.AMOUNT]: z
		.number({
			message: msg("menu.update.form.errors.amount.required")
		})
		.min(1, msg("menu.update.form.errors.amount.min")),
	[ENUM_FORM_UPDATE_PAYMENT.NOTE]: z.string().optional(),
	[ENUM_FORM_UPDATE_PAYMENT.FILES]: z.any().array().optional()
});
