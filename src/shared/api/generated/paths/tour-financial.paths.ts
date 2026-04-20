import type {
	CreateFinancialSchema,
	TourFinSettingsModel,
	UpdateFinancialSchema
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_FINANCIAL_PATHS = {
	getTourFinancials: (tourId: string) =>
		({
			url: `/tour/${tourId}/finance`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: TourFinSettingsModel;
			}
		}) as const,
	createTourFinancials: (tourId: string) =>
		({
			url: `/tour/${tourId}/finance`,
			method: "POST",
			_types: {} as {
				body: CreateFinancialSchema;
				query: void;
				response: TourFinSettingsModel;
			}
		}) as const,
	updateTourFinancials: (tourId: string) =>
		({
			url: `/tour/${tourId}/finance`,
			method: "PATCH",
			_types: {} as {
				body: UpdateFinancialSchema;
				query: void;
				response: TourFinSettingsModel;
			}
		}) as const
} as const;
