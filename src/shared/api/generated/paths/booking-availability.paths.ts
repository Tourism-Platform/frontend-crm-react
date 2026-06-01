import type { AvailabilityApply, BookingEventAvailabilityModel } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_AVAILABILITY_PATHS = {
	listBookingAvailability: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/availability`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: BookingEventAvailabilityModel[];
			}
		}) as const,
	applyEventAvailability: (bookingId: string, eventId: string) =>
		({
			url: `/booking/order/${bookingId}/events/${eventId}/availability`,
			method: "PATCH",
			_types: {} as {
				body: AvailabilityApply;
				query: void;
				response: BookingEventAvailabilityModel;
			}
		}) as const
} as const;
