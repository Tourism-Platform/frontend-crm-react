import type { BOOKING_ORDER_PATHS } from "@/shared/api";

type TGetBookingPrice = ReturnType<typeof BOOKING_ORDER_PATHS.getBookingPrice>;

export type TBookingQuoteBackend =
	typeof BOOKING_ORDER_PATHS.getBookingQuote._types.response;

export type TBookingQuoteQueryBackend =
	typeof BOOKING_ORDER_PATHS.getBookingQuote._types.query;

export type TBookingPriceBackend = TGetBookingPrice["_types"]["response"];

export type TBookingPriceQueryBackend = TGetBookingPrice["_types"]["query"];
