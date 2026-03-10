import type { CurrencyType, TourSummaryResponse } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const PRICING_REVIEW_PATHS = {
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
