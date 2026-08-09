import type { BOOKING_ORDER_OPERATOR_PATHS } from "@/shared/api";

export type TOperatorOrderDetailBackend = ReturnType<
	typeof BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingOrder
>["_types"]["response"];

export type TOperatorBookingItineraryBackend = ReturnType<
	typeof BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingItinerary
>["_types"]["response"];

export type TOperatorBookingStatusResponseBackend = ReturnType<
	typeof BOOKING_ORDER_OPERATOR_PATHS.transitionBookingStatus
>["_types"]["response"];

export type TOperatorDeclineBookingResponseBackend = ReturnType<
	typeof BOOKING_ORDER_OPERATOR_PATHS.declineBooking
>["_types"]["response"];
