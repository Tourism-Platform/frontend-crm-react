import type { FxRateCreateSchema, OperatorFxRateModel } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_FX_RATE_PATHS = {
	listFxRates: {
		url: "/operator/me/fx-rate",
		method: "GET",
		_types: {} as {
			body: void;
			query: void;
			response: OperatorFxRateModel[];
		}
	} as const,
	recordFxRate: {
		url: "/operator/me/fx-rate",
		method: "POST",
		_types: {} as {
			body: FxRateCreateSchema;
			query: void;
			response: OperatorFxRateModel;
		}
	} as const,
	getFxRate: (fxRateId: string) =>
		({
			url: `/operator/me/fx-rate/${fxRateId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorFxRateModel;
			}
		}) as const
} as const;
