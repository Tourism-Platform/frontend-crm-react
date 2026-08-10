import type {
	BOOKING_ORDER_PATHS,
	BookingCancel,
	BookingCreate,
	BookingUpdate
} from "@/shared/api";

export type TBookingModelBackend =
	typeof BOOKING_ORDER_PATHS.createBookingOrder._types.response;

export type TBookingCancelBackend = BookingCancel;

export type TBookingCreateBackend = BookingCreate;

export type TBookingUpdateBackend = BookingUpdate;
