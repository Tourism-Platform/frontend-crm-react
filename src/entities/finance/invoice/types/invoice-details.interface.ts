import type { IDownloadFile } from "@/shared/hooks";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { IInvoice } from "./invoice.interface";

export interface IInvoiceDetail extends IInvoice {
	dueDate: string;
	remainingAmount: number;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	billingInfo: IBillingInfo;
	bookingInfo: IBookingInfo;
	payments: IInvoicePayment[];
	file?: IDownloadFile;
}

export interface IBillingInfo {
	company: string;
	address: string;
	contact: string;
	email: string;
	phone: string;
}

export interface IBookingInfo {
	tour: string;
	pax: number;
	dates: string;
	duration: string;
}

export interface IInvoicePayment {
	no: number;
	amount: number;
	date: string;
	file?: IDownloadFile;
}
