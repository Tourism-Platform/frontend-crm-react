import type {
	BodyUploadPassengerPassportBookingOrderBookingIdPaxPaxIdPassportPost,
	BookingPaxFilesModel,
	BookingPaxModel,
	PaxCreate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_PASSENGER_PATHS = {
	listPassengerInfo: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/pax`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { skip?: number; limit?: number };
				response: BookingPaxModel[];
			}
		}) as const,
	addPassengerInfo: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/pax`,
			method: "POST",
			_types: {} as {
				body: PaxCreate;
				query: void;
				response: BookingPaxModel;
			}
		}) as const,
	uploadPassengerPassport: (bookingId: string, paxId: string) =>
		({
			url: `/booking/order/${bookingId}/pax/${paxId}/passport`,
			method: "POST",
			_types: {} as {
				body: BodyUploadPassengerPassportBookingOrderBookingIdPaxPaxIdPassportPost;
				query: void;
				response: BookingPaxFilesModel;
			}
		}) as const
} as const;
