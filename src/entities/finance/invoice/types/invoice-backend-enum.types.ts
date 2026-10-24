import { InvoiceStatus, InvoiceType } from "@/shared/api";

export const ENUM_INVOICE_STATUS_BACKEND = {
	DRAFT: InvoiceStatus.Draft,
	SENT: InvoiceStatus.Sent,
	PARTIAL: InvoiceStatus.Partial,
	PAID: InvoiceStatus.Paid,
	OVERDUE: InvoiceStatus.Overdue,
	CANCELLED: InvoiceStatus.Cancelled
} as const;

export type ENUM_INVOICE_STATUS_BACKEND_TYPE = InvoiceStatus;

export const ENUM_INVOICE_TYPE_BACKEND = {
	OPERATOR_TO_AGENCY: InvoiceType.OperatorToAgency,
	SUPPLIER_TO_OPERATOR: InvoiceType.SupplierToOperator
} as const;

export type ENUM_INVOICE_TYPE_BACKEND_TYPE = InvoiceType;
