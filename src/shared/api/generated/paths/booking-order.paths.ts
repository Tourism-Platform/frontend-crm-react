import type {
	BookingCancel,
	BookingCreate,
	BookingItineraryResponse,
	BookingOrderClientDetail,
	BookingOrderDetail,
	BookingOrderListResponse,
	BookingOrderResponse,
	BookingStatus,
	BookingUpdate,
	LanguageCode,
	OperatorItineraryResponse,
	OperatorOrderOverview
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_ORDER_PATHS = {
	getUserBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/user/${bookingId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { lang?: LanguageCode };
				response: BookingOrderClientDetail;
			}
		}) as const,
	getAgencyBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/agency/${bookingId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { lang?: LanguageCode };
				response: BookingOrderClientDetail;
			}
		}) as const,
	getOperatorBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/operator/${bookingId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { lang?: LanguageCode };
				response: BookingOrderDetail;
			}
		}) as const,
	getOperatorOrderOverview: (bookingId: string) =>
		({
			url: `/booking/order/operator/${bookingId}/overview`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorOrderOverview;
			}
		}) as const,
	getOperatorBookingItinerary: (bookingId: string) =>
		({
			url: `/booking/order/operator/${bookingId}/itinerary`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorItineraryResponse;
			}
		}) as const,
	transitionBookingStatus: (bookingId: string, transition: string) =>
		({
			url: `/booking/order/operator/${bookingId}/status/${transition}`,
			method: "PATCH",
			_types: {} as {
				body: void;
				query: void;
				response: BookingOrderResponse;
			}
		}) as const,
	declineBooking: (bookingId: string) =>
		({
			url: `/booking/order/operator/${bookingId}/decline`,
			method: "POST",
			_types: {} as {
				body: BookingCancel;
				query: void;
				response: BookingOrderResponse;
			}
		}) as const,
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
