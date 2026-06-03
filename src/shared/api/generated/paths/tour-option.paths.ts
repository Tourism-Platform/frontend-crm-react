import type {
	BodyUploadOptionCoverTourTourIdOptionOptionIdCoverPost,
	Currency,
	TourOptionCreateSchema,
	TourOptionModel,
	TourOptionUpdateSchema,
	TourSummaryResponse
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_OPTION_PATHS = {
	getTourSummary: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/summary`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { currency?: Currency };
				response: TourSummaryResponse;
			}
		}) as const,
	listAllTourOptions: (tourId: string) =>
		({
			url: `/tour/${tourId}/option/all`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { skip?: number; limit?: number };
				response: TourOptionModel[];
			}
		}) as const,
	createTourOption: (tourId: string) =>
		({
			url: `/tour/${tourId}/option/create`,
			method: "POST",
			_types: {} as {
				body: TourOptionCreateSchema | null;
				query: void;
				response: TourOptionModel;
			}
		}) as const,
	updateTourOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}`,
			method: "PATCH",
			_types: {} as {
				body: TourOptionUpdateSchema;
				query: void;
				response: TourOptionModel;
			}
		}) as const,
	deleteOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	uploadOptionCover: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/cover`,
			method: "POST",
			_types: {} as {
				body: BodyUploadOptionCoverTourTourIdOptionOptionIdCoverPost;
				query: void;
				response: TourOptionModel;
			}
		}) as const,
	deleteOptionCover: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/cover`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
