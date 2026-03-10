import type { BookingPaxModel, OperatorFilesModel } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_PASSENGER_PATHS = {
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
