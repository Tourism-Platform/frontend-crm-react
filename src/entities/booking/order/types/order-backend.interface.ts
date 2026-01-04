import { type IPaginationResponse } from "@/shared/types";

import { type IOrderDates, type IPaxReviewItem } from "./order.interface";
import type { ISupplierPaymentItem } from "./supplier-payment.interface";
import type { ITourReviewItem, ITourSummary } from "./tour.interface";

export interface IBookingOrderBackend {
	order_id: string;
	order_type: string;
	date_created: string;
	client: string;
	client_type: string;
	pax: number;
	dates: IOrderDates;
	tour_name: string;
	manager: string | null;
	invoice_status: string | null;
	status: string;
}

export interface IBookingOrderDetailBackend extends IBookingOrderBackend {
	duration: string;
	route: string;
	comment: string | null;
	email: string;
	phone: string;
	room_type: string | null;
	car_class: string | null;
	is_available: boolean;
	report: string | null;
	pax_details: IPaxReviewItem[] | null;
	tour_review: ITourReviewItem[];
	supplier_payments: ISupplierPaymentItem[] | null;
	tour_summary: ITourSummary;
}

export type TBookingOrderPaginatedResponseBackend =
	IPaginationResponse<IBookingOrderBackend>;

export interface IApplyReviewItemBackend {
	id: string;
	parent_id?: string;
}
