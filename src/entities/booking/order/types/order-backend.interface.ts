import type { BOOKING_ORDER_PATHS, BookingOrderRowOutput } from "@/shared/api";

export type TBookingOrderListItemBackend = BookingOrderRowOutput;

export interface IApplyReviewItemBackend {
	id: string;
	parent_id?: string;
}

export type TBookingOrderBackendResponse =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.response;

export type TBookingOrderPaginatedQuery =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.query;
