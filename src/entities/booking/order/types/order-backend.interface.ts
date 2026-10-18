import type { BOOKING_ORDER_PATHS, BookingOrderRow } from "@/shared/api";

export type TBookingOrderListItemBackend = BookingOrderRow;

export type TBookingOrderBackendResponse =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.response;

export type TBookingOrderPaginatedQuery =
	typeof BOOKING_ORDER_PATHS.listMyBookings._types.query;
