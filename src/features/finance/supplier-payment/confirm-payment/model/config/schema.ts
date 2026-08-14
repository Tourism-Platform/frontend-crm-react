import { z } from "zod";

import { type TSupplierPaymentsPageKeys, i18nKey } from "@/shared/config";

import { ENUM_SUPPLIER_PAYMENT_STATUS } from "@/entities/finance";

import { ENUM_FORM_CONFIRM_PAYMENT } from "../types";

const msg = i18nKey<TSupplierPaymentsPageKeys>();

export const CONFIRM_PAYMENT_SCHEMA = z.object({
	[ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID]: z
		.string({
			message: msg("form.errors.orderId.required")
		})
		.min(1, msg("form.errors.orderId.min")),
	[ENUM_FORM_CONFIRM_PAYMENT.AMOUNT]: z
		.number({
			message: msg("form.errors.amount.required")
		})
		.min(1, msg("form.errors.amount.min")),
	[ENUM_FORM_CONFIRM_PAYMENT.STATUS]: z.enum(ENUM_SUPPLIER_PAYMENT_STATUS, {
		message: msg("form.errors.status.required")
	}),
	[ENUM_FORM_CONFIRM_PAYMENT.NOTE]: z.string().optional()
});
