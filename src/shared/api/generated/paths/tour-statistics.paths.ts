import type { TourStatisticsResponse } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_STATISTICS_PATHS = {
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
