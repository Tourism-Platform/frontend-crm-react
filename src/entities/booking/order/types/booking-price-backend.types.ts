import type { BOOKING_ORDER_PATHS } from "@/shared/api";

export type TBookingQuoteQueryBackend =
	typeof BOOKING_ORDER_PATHS.getBookingQuote._types.query;

export type TBookingQuoteBackend =
	typeof BOOKING_ORDER_PATHS.getBookingQuote._types.response;

export type TBookingPriceQueryBackend = ReturnType<
	typeof BOOKING_ORDER_PATHS.getBookingPrice
>["_types"]["query"];

export type TBookingPriceBackend = ReturnType<
	typeof BOOKING_ORDER_PATHS.getBookingPrice
>["_types"]["response"];
