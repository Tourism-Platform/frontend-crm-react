import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ENUM_INVOICE_STATUS_TYPE } from "./invoice-status.types";
import type { TInvoiceStatusCounts } from "./invoice.interface";

export interface IInvoiceBackend {
	payment_id: string;
	order_id: string;
	issue_date: string;
	amount: number;
	paid_amount: number;
	status: ENUM_INVOICE_STATUS_TYPE;
}

export interface IInvoicePaginatedResponseBackend
	extends IPaginationResponse<IInvoiceBackend> {
	status_counts: TInvoiceStatusCounts;
}

export interface IInvoiceDetailBackend extends IInvoiceBackend {
	due_date: string;
	remaining_amount: number;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	billing_info: {
		company: string;
		address: string;
		contact: string;
		email: string;
		phone: string;
	};
	booking_info: {
		tour: string;
		pax: number;
		dates: string;
		duration: string;
	};
	payments: {
		no: number;
		amount: number;
		date: string;
		file?: {
			url: string;
			file_name: string;
		};
	}[];
	export_file?: {
		url: string;
		file_name: string;
	};
}
