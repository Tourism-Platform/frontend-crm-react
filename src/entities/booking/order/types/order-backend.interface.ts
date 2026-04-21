import type { BOOKING_ORDER_PATHS, BookingModel } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { type IPaxReviewItem } from "./order.interface";
import type { ISupplierPaymentItem } from "./supplier-payment.interface";
import type { ITourReviewItem, ITourSummary } from "./tour.interface";

export type TBookingOrderBackend = BookingModel;

export interface IBookingOrderDetailBackend extends TBookingOrderBackend {
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
	IPaginationResponse<TBookingOrderBackend>;

export interface IApplyReviewItemBackend {
	id: string;
	parent_id?: string;
}

export type TBookingOrderBackendResponse =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.response;
