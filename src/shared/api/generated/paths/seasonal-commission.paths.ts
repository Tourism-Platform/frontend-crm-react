import type {
	SeasonalityCommissionCreate,
	SeasonalityCommissionModel
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const SEASONAL_COMMISSION_PATHS = {
	getTourCommissions: (tourId: string) =>
		({
			url: `/tour/${tourId}/seasonality/`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: SeasonalityCommissionModel[];
			}
		}) as const,
	createTourSeasonCommission: (tourId: string) =>
		({
			url: `/tour/${tourId}/seasonality/create/`,
			method: "POST",
			_types: {} as {
				body: SeasonalityCommissionCreate;
				query: void;
				response: SeasonalityCommissionModel;
			}
		}) as const,
	updateTourCommissions: (tourId: string, commissionId: string) =>
		({
			url: `/tour/${tourId}/seasonality/update/${commissionId}`,
			method: "PATCH",
			_types: {} as {
				body: SeasonalityCommissionCreate;
				query: void;
				response: SeasonalityCommissionModel;
			}
		}) as const,
	removeCommission: (tourId: string, commissionId: string) =>
		({
			url: `/tour/${tourId}/seasonality/remove/${commissionId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
