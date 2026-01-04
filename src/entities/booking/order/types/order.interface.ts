import type { IDownloadFile } from "@/shared/hooks";
import { type IPaginationResponse } from "@/shared/types";

import { type ENUM_CLIENT_TYPE_OPTIONS_TYPE } from "./client-type.types";
import { type ENUM_GENDER_OPTIONS_TYPE } from "./gender.types";
import { type ENUM_INVOICE_STATUS_TYPE } from "./invoice-status.types";
import { type ENUM_ORDER_STATUS_TYPE } from "./order-status.types";
import { type ENUM_ORDER_TYPE_OPTIONS_TYPE } from "./order-type.types";
import type { ISupplierPaymentItem } from "./supplier-payment.interface";
import type { ITourReviewItem, ITourSummary } from "./tour.interface";

export interface IPaxReviewDetail {
	id: string;
	type: string;
	value: string;
	file?: IDownloadFile;
}

export interface IPaxReviewItem {
	id: string;
	fullName: string;
	gender: ENUM_GENDER_OPTIONS_TYPE;
	nationality: string;
	dateOfBirth: string;
	passportNumber: string;
	expiredDate: string;
	items: IPaxReviewDetail[];
}

export interface IOrderDates {
	from: string;
	to: string;
}

export interface IOrder {
	orderId: string;
	orderType: ENUM_ORDER_TYPE_OPTIONS_TYPE;
	dateCreated: string;
	client: string;
	clientType: ENUM_CLIENT_TYPE_OPTIONS_TYPE;
	pax: number;
	dates: IOrderDates;
	tourName: string;
	manager?: string;
	invoiceStatus?: ENUM_INVOICE_STATUS_TYPE;
	status: ENUM_ORDER_STATUS_TYPE;
}

export interface IOrderDetail extends IOrder {
	duration: string;
	route: string;
	comment?: string;
	email: string;
	phone: string;
	roomType?: string;
	carClass?: string;
	isAvailable?: boolean;
	report?: string;
	paxDetails?: IPaxReviewItem[];
	tourReview: ITourReviewItem[];
	supplierPayments?: ISupplierPaymentItem[];
	tourSummary: ITourSummary;
}

export type TBookingOrderPaginatedResponse = IPaginationResponse<IOrder>;
