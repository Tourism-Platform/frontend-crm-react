import {
	type TInvoiceIdPageKeys,
	type TInvoicesPageKeys
} from "@/shared/config";

import { ENUM_INVOICE_STATUS, type ENUM_INVOICE_STATUS_TYPE } from "../types";

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TInvoicesPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "table.statuses.paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "table.statuses.unpaid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "table.statuses.partially_paid"
};
export const INVOICE_ID_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TInvoiceIdPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "payment_table.table.statuses.paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "payment_table.table.statuses.unpaid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]:
		"payment_table.table.statuses.partially_paid"
};
