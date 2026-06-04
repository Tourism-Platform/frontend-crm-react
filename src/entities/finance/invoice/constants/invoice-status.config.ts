import { InvoiceStatus } from "@/shared/api";
import { type TOptionsKeys } from "@/shared/config";

import type { ENUM_INVOICE_STATUS_TYPE } from "../types";

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TOptionsKeys
> = {
	[InvoiceStatus.Draft]: "finance.invoice.statuses.draft",
	[InvoiceStatus.Sent]: "finance.invoice.statuses.sent",
	[InvoiceStatus.Partial]: "finance.invoice.statuses.partial",
	[InvoiceStatus.Paid]: "finance.invoice.statuses.paid",
	[InvoiceStatus.Overdue]: "finance.invoice.statuses.overdue",
	[InvoiceStatus.Cancelled]: "finance.invoice.statuses.cancelled"
};

export const INVOICE_STATUS_VARIANTS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	"default" | "green" | "red" | "yellow"
> = {
	[InvoiceStatus.Draft]: "default",
	[InvoiceStatus.Sent]: "default",
	[InvoiceStatus.Partial]: "yellow",
	[InvoiceStatus.Paid]: "green",
	[InvoiceStatus.Overdue]: "red",
	[InvoiceStatus.Cancelled]: "default"
};
