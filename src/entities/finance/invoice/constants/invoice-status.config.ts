import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_INVOICE_STATUS_BACKEND,
	type ENUM_INVOICE_STATUS_TYPE
} from "../types";

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_INVOICE_STATUS_BACKEND.DRAFT]: "finance.invoice.statuses.draft",
	[ENUM_INVOICE_STATUS_BACKEND.SENT]: "finance.invoice.statuses.sent",
	[ENUM_INVOICE_STATUS_BACKEND.PARTIAL]: "finance.invoice.statuses.partial",
	[ENUM_INVOICE_STATUS_BACKEND.PAID]: "finance.invoice.statuses.paid",
	[ENUM_INVOICE_STATUS_BACKEND.OVERDUE]: "finance.invoice.statuses.overdue",
	[ENUM_INVOICE_STATUS_BACKEND.CANCELLED]:
		"finance.invoice.statuses.cancelled"
};

export const INVOICE_STATUS_VARIANTS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_INVOICE_STATUS_BACKEND.DRAFT]: "outline",
	[ENUM_INVOICE_STATUS_BACKEND.SENT]: "blue",
	[ENUM_INVOICE_STATUS_BACKEND.PARTIAL]: "yellow",
	[ENUM_INVOICE_STATUS_BACKEND.PAID]: "green",
	[ENUM_INVOICE_STATUS_BACKEND.OVERDUE]: "red",
	[ENUM_INVOICE_STATUS_BACKEND.CANCELLED]: "secondary"
};
