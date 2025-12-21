import { type TInvoicesPageKeys } from "@/shared/config/i18n/i18n.config";

export const ENUM_INVOICE_STATUS = {
	PAID: "paid",
	UNPAID: "unpaid",
	PARTIALLY_PAID: "partially_paid"
} as const;

export type ENUM_INVOICE_STATUS_TYPE =
	(typeof ENUM_INVOICE_STATUS)[keyof typeof ENUM_INVOICE_STATUS];

export interface IInvoice {
	paymentId: string; // INV-1234
	orderId: string; // RQA00001
	issueDate: string; // ISO: 2024-10-10
	amount: number; // 10000.00
	paidAmount: number; // 10000.00
	currency: "USD"; // расширяемо
	status: ENUM_INVOICE_STATUS_TYPE;
}

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TInvoicesPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "table.statuses.paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "table.statuses.unpaid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "table.statuses.partially_paid"
};
