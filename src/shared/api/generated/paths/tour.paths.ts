import type {
	TourMetaCreateSchema,
	TourMetaModel,
	TourMetaUpdateSchema
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_PATHS = {
	listTours: {
		url: "/tour/",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number; desc?: boolean };
			response: TourMetaModel[];
		}
	} as const,
	createTour: {
		url: "/tour/",
		method: "POST",
		_types: {} as {
			body: TourMetaCreateSchema;
			query: void;
			response: TourMetaModel;
		}
	} as const,
	getTour: (tourId: string) =>
		({
			url: `/tour/${tourId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: TourMetaModel }
		}) as const,
	updateTour: (tourId: string) =>
		({
			url: `/tour/${tourId}`,
			method: "PATCH",
			_types: {} as {
				body: TourMetaUpdateSchema;
				query: void;
				response: TourMetaModel;
			}
		}) as const,
	deleteTour: (tourId: string) =>
		({
			url: `/tour/${tourId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
