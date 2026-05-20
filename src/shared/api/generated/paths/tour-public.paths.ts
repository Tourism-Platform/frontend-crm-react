import type { Currency, TourOptionPublicResponse } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_PUBLIC_PATHS = {
	getPublicTourOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/public/${tourId}/option/${optionId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { currency?: Currency };
				response: TourOptionPublicResponse;
			}
		}) as const
} as const;
