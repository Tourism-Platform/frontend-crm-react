import type {
	BookingCancel,
	BookingFinancialsResponse,
	BookingOrderDetail,
	BookingOrderResponse,
	EventVarianceResponse,
	LanguageCode,
	OperatorItineraryResponse
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_ORDER_OPERATOR_PATHS = {
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
	getOperatorOrderFinancials: (bookingId: string) =>
		({
			url: `/booking/order/operator/${bookingId}/financials`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: BookingFinancialsResponse;
			}
		}) as const,
	getOperatorOrderVariance: (bookingId: string) =>
		({
			url: `/booking/order/operator/${bookingId}/variance`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: EventVarianceResponse;
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
		}) as const
} as const;
