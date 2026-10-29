import { type TOptionsKeys } from "@/shared/config";

import {
	ENUM_INVOICE_PAYMENT_METHOD,
	type ENUM_INVOICE_PAYMENT_METHOD_TYPE
} from "../types";

export const INVOICE_PAYMENT_METHOD_LABELS: Record<
	ENUM_INVOICE_PAYMENT_METHOD_TYPE,
	TOptionsKeys
> = {
	[ENUM_INVOICE_PAYMENT_METHOD.BANK]: "finance.invoice.payment_methods.bank",
	[ENUM_INVOICE_PAYMENT_METHOD.WIRE]: "finance.invoice.payment_methods.wire",
	[ENUM_INVOICE_PAYMENT_METHOD.CHECK]:
		"finance.invoice.payment_methods.check",
	[ENUM_INVOICE_PAYMENT_METHOD.CASH]: "finance.invoice.payment_methods.cash",
	[ENUM_INVOICE_PAYMENT_METHOD.CREDIT_CARD]:
		"finance.invoice.payment_methods.credit_card",
	[ENUM_INVOICE_PAYMENT_METHOD.OTHER]: "finance.invoice.payment_methods.other"
};
