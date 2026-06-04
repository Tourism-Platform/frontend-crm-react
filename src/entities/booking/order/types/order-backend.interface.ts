import type {
	BOOKING_ORDER_PATHS,
	BookingModel,
	BookingOrderDetail,
	BookingOrderListItem
} from "@/shared/api";

export type TBookingOrderBackend = BookingModel;

export type TBookingOrderListItemBackend = BookingOrderListItem;

export type TBookingOrderDetailBackend = BookingOrderDetail;

export interface IApplyReviewItemBackend {
	id: string;
	parent_id?: string;
}

export type TBookingOrderBackendResponse =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.response;

export type TBookingOrderPaginatedQuery =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.query;
