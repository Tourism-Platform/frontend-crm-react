import type {
	CurrencyType,
	TourOptionModel,
	TourSummaryResponse
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_OPTION_PATHS = {
	listAllTourOptions: (tourId: string) =>
		({
			url: `/tour/${tourId}/option/all`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: TourOptionModel[];
			}
		}) as const,
	createTourOption: (tourId: string) =>
		({
			url: `/tour/${tourId}/option/create`,
			method: "POST",
			_types: {} as { body: void; query: void; response: TourOptionModel }
		}) as const,
	deleteOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	getTourSummary: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/summary`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { currency?: CurrencyType };
				response: TourSummaryResponse;
			}
		}) as const
} as const;
