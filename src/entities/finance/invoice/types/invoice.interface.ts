import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_INVOICE_STATUS_TYPE } from "./invoice-status.types";

export interface IInvoice {
	paymentId: string;
	orderId: string;
	issueDate: string;
	amount: number;
	paidAmount: number;
	status: ENUM_INVOICE_STATUS_TYPE;
}

export type TInvoiceStatusCounts = Record<ENUM_INVOICE_STATUS_TYPE, number>;

export interface IInvoicePaginatedResponse
	extends IPaginationResponse<IInvoice> {
	statusCounts: TInvoiceStatusCounts;
}
