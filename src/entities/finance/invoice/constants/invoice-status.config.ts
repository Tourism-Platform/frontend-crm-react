import { type TOptionsKeys } from "@/shared/config";

import { ENUM_INVOICE_STATUS, type ENUM_INVOICE_STATUS_TYPE } from "../types";

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "finance.invoice.statuses.paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "finance.invoice.statuses.unpaid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]:
		"finance.invoice.statuses.partially_paid"
};

export const INVOICE_STATUS_VARIANTS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	"default" | "green" | "red" | "yellow"
> = {
	[ENUM_INVOICE_STATUS.PAID]: "green",
	[ENUM_INVOICE_STATUS.UNPAID]: "red",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "yellow"
};
