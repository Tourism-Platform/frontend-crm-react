import { z } from "zod";

import { type TInvoiceIdPageKeys, i18nKey } from "@/shared/config";

import { ENUM_INVOICE_PAYMENT_METHOD } from "@/entities/finance";

import { ENUM_FORM_RECORD_PAYMENT } from "../types";

const msg = i18nKey<TInvoiceIdPageKeys>();

export const RECORD_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_RECORD_PAYMENT.AMOUNT]: z
		.number({
			message: msg("record_payment.form.errors.amount.required")
		})
		.positive(msg("record_payment.form.errors.amount.min")),
	[ENUM_FORM_RECORD_PAYMENT.METHOD]: z.enum(ENUM_INVOICE_PAYMENT_METHOD, {
		message: msg("record_payment.form.errors.method.required")
	})
});
