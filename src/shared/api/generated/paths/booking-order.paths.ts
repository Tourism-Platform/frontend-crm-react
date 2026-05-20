import type {
	BookingCancel,
	BookingCreate,
	BookingModel,
	BookingStatus
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_ORDER_PATHS = {
	createBookingOrder: {
		url: "/booking/order",
		method: "POST",
		_types: {} as {
			body: BookingCreate;
			query: void;
			response: BookingModel;
		}
	} as const,
	listMyBookings: {
		url: "/booking/order/my",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				booking_status?: BookingStatus | null;
				tour_id?: string | null;
			};
			response: BookingModel[];
		}
	} as const,
	getBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: BookingModel }
		}) as const,
	transitionBookingStatus: (bookingId: string, transition: string) =>
		({
			url: `/booking/order/${bookingId}/status/${transition}`,
			method: "PATCH",
			_types: {} as { body: void; query: void; response: BookingModel }
		}) as const,
	cancelBooking: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/cancel`,
			method: "POST",
			_types: {} as {
				body: BookingCancel;
				query: void;
				response: BookingModel;
			}
		}) as const
} as const;
