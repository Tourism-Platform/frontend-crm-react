import type { IDownloadFile } from "@/shared/hooks";
import { type IPaginationResponse } from "@/shared/types";

import type { ITourSummary } from "@/entities/tour/tour/types/tour-review.interface";

import { type ENUM_CLIENT_TYPE_OPTIONS_TYPE } from "./client-type.types";
import { type ENUM_GENDER_OPTIONS_TYPE } from "./gender.types";
import { type ENUM_INVOICE_STATUS_TYPE } from "./invoice-status.types";
import { type ENUM_ORDER_STATUS_TYPE } from "./order-status.types";
import type { IOrderTourReviewItem } from "./order-tour-review.types";
import { type ENUM_ORDER_TYPE_OPTIONS_TYPE } from "./order-type.types";
import type { ISupplierPaymentItem } from "./supplier-payment.interface";

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

export interface IOrderTourInfo {
	name: string;
	type: ENUM_ORDER_TYPE_OPTIONS_TYPE;
	days: number;
	nights: number;
	route: string;
	duration: string;
}

export interface IOrderAgencyInfo {
	id: string;
	name: string;
	businessName?: string | null;
	contactPerson?: string | null;
	contactEmail?: string | null;
	contactPhone?: string | null;
}

export interface IOrder {
	orderId: string;
	orderNumber?: string;
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
	agencyId: string;
	agency: IOrderAgencyInfo;
	tourOptionId: string;
	tour: IOrderTourInfo;
	duration: string;
	route: string;
	comment?: string;
	tourAmount: string;
	paidAmount: string;
	email?: string;
	phone?: string;
	roomType?: string;
	carClass?: string;
	isAvailable?: boolean;
	report?: string;
	paxDetails?: IPaxReviewItem[];
	tourReview?: IOrderTourReviewItem[];
	supplierPayments?: ISupplierPaymentItem[];
	tourSummary?: ITourSummary;
}

export type TBookingOrderPaginatedResponse = IPaginationResponse<IOrder>;
