import type {
	BookingCancel,
	BookingCreate,
	BookingModel,
	BookingPaxModel,
	BookingStatus,
	OperatorFilesModel
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_PATHS = {
	listMyBookings: {
		url: "/booking/order/my",
		method: "GET",
		_types: {} as {
			body: void;
			query: { booking_status: BookingStatus | null };
			response: BookingModel[];
		}
	} as const,
	createBookingOrder: {
		url: "/booking/order",
		method: "POST",
		_types: {} as {
			body: BookingCreate;
			query: void;
			response: BookingModel;
		}
	} as const,
	getBookingOrder: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: BookingModel }
		}) as const,
	updateBookingStatus: (bookingId: string) =>
		({
			url: `/booking/order/${bookingId}/status/update`,
			method: "PATCH",
			_types: {} as {
				body: void;
				query: { status: BookingStatus };
				response: BookingModel;
			}
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
		}) as const,
	listPassengerInfo: (bookingId: string) =>
		({
			url: `/booking/pax/${bookingId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: BookingPaxModel[];
			}
		}) as const,
	addPassengerInfo: (bookingId: string) =>
		({
			url: `/booking/pax/${bookingId}`,
			method: "POST",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorFilesModel[];
			}
		}) as const,
	getFileBinary: (fileId: string) =>
		({
			url: `/booking/pax/file/${fileId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	removeFile: (fileId: string) =>
		({
			url: `/booking/pax/file/${fileId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
