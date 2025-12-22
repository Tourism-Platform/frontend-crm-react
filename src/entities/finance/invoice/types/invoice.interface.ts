import type { ENUM_INVOICE_STATUS_TYPE } from "./invoice.types";

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
