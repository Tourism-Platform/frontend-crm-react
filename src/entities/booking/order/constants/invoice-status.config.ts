import { type TOrdersPageKeys } from "@/shared/config";

import { ENUM_INVOICE_STATUS, type ENUM_INVOICE_STATUS_TYPE } from "../types";

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TOrdersPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "table.invoiceStatus.paid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "table.invoiceStatus.partiallyPaid",
	[ENUM_INVOICE_STATUS.UNPAID]: "table.invoiceStatus.unpaid"
};
