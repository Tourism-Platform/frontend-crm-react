import { type TInvoicesPageKeys } from "@/shared/config";

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
	dueDate: string; // ISO: 2024-10-20
	amount: number; // 10000.00
	paidAmount: number; // 10000.00
	remainingAmount: number; // 0.00
	currency: "USD"; // расширяемо
	status: ENUM_INVOICE_STATUS_TYPE;
	billingInfo: {
		company: string;
		address: string;
		contact: string;
		email: string;
		phone: string;
	};
	bookingInfo: {
		tour: string;
		pax: number;
		dates: string;
		duration: string;
	};
	payments: {
		no: number;
		amount: number;
		date: string;
		documentUrl?: string;
	}[];
}

export const INVOICE_STATUS_LABELS: Record<
	ENUM_INVOICE_STATUS_TYPE,
	TInvoicesPageKeys
> = {
	[ENUM_INVOICE_STATUS.PAID]: "table.statuses.paid",
	[ENUM_INVOICE_STATUS.UNPAID]: "table.statuses.unpaid",
	[ENUM_INVOICE_STATUS.PARTIALLY_PAID]: "table.statuses.partially_paid"
};
