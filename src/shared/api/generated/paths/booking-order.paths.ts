import type {
	BookingCancel,
	BookingCreate,
	BookingItineraryResponse,
	BookingOrderListResponse,
	BookingOrderResponse,
	BookingStatus,
	BookingUpdate
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
			response: BookingOrderResponse;
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
				q?: string | null;
				date_from?: string | null;
				date_to?: string | null;
				skip?: number;
				limit?: number;
			};
			response: BookingOrderListResponse;
		}
	} as const,
	getBookingItinerary: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/itinerary`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: BookingItineraryResponse;
			}
		}) as const,
	submitBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/submit`,
			method: "PATCH",
			_types: {} as {
				body: void;
				query: void;
				response: BookingOrderResponse;
			}
		}) as const,
	updateBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}`,
			method: "PATCH",
			_types: {} as {
				body: BookingUpdate;
				query: void;
				response: BookingOrderResponse;
			}
		}) as const,
	deleteBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	cancelBooking: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/cancel`,
			method: "POST",
			_types: {} as {
				body: BookingCancel;
				query: void;
				response: BookingOrderResponse;
			}
		}) as const
} as const;
