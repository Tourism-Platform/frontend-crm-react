import type {
	TourListResponse,
	TourListSortField,
	TourMetaCreateSchema,
	TourMetaModel,
	TourMetaUpdateSchema,
	TourStatus
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_PATHS = {
	listTours: {
		url: "/tour/",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				skip?: number;
				limit?: number;
				desc?: boolean;
				status?: TourStatus | null;
				q?: string | null;
				sort_by?: TourListSortField;
			};
			response: TourListResponse;
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
		}) as const,
	uploadTourCover: (tourId: string) =>
		({
			url: `/tour/${tourId}/cover`,
			method: "POST",
			_types: {} as { body: void; query: void; response: TourMetaModel }
		}) as const,
	deleteTourCover: (tourId: string) =>
		({
			url: `/tour/${tourId}/cover`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
