// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_PASSENGER_FILES_PATHS = {
	getFileBinary: (fileId: string) =>
		({
			url: `/booking/order/pax/file/${fileId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	removeFile: (fileId: string) =>
		({
			url: `/booking/order/pax/file/${fileId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
