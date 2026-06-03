import type {
	BodyUploadTourCoverTourTourIdCoverPost,
	TourListResponse,
	TourListSortField,
	TourMetaCreateSchema,
	TourMetaModel,
	TourMetaUpdateSchema,
	TourStatisticsResponse,
	TourStatus,
	TourType
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
				desc?: boolean;
				status?: TourStatus | null;
				typ?: TourType | null;
				q?: string | null;
				sort_by?: TourListSortField;
				skip?: number;
				limit?: number;
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
	listOneDayTours: {
		url: "/tour/one-day",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number };
			response: TourMetaModel[];
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
	publishTour: (tourId: string) =>
		({
			url: `/tour/${tourId}/publish`,
			method: "POST",
			_types: {} as { body: void; query: void; response: TourMetaModel }
		}) as const,
	archiveTour: (tourId: string) =>
		({
			url: `/tour/${tourId}/archive`,
			method: "POST",
			_types: {} as { body: void; query: void; response: TourMetaModel }
		}) as const,
	refreshTourProjection: (tourId: string) =>
		({
			url: `/tour/${tourId}/refresh`,
			method: "POST",
			_types: {} as { body: void; query: void; response: TourMetaModel }
		}) as const,
	uploadTourCover: (tourId: string) =>
		({
			url: `/tour/${tourId}/cover`,
			method: "POST",
			_types: {} as {
				body: BodyUploadTourCoverTourTourIdCoverPost;
				query: void;
				response: TourMetaModel;
			}
		}) as const,
	deleteTourCover: (tourId: string) =>
		({
			url: `/tour/${tourId}/cover`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	getTourStatistics: (tourId: string) =>
		({
			url: `/tour/${tourId}/statistics`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: TourStatisticsResponse;
			}
		}) as const
} as const;
