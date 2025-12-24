import { type TOrderIdPageKeys, type TOrdersPageKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import { ENUM_INVOICE_STATUS, type ENUM_INVOICE_STATUS_TYPE } from "../types";

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TOrdersPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "statuses.invoice.paid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "statuses.invoice.partially_paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "statuses.invoice.unpaid"
};

export const INVOICE_STATUS_LABELS_ID: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TOrderIdPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "statuses.invoice.paid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "statuses.invoice.partially_paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "statuses.invoice.unpaid"
};

export const INVOICE_STATUS_VARIANTS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_INVOICE_STATUS.PAID]: "green",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "yellow",
	[ENUM_INVOICE_STATUS.UNPAID]: "red"
};
