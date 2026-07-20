import type { Currency, FxRateCreateSchema, OperatorFxRateModel } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_FX_RATE_PATHS = {
	listFxRates: {
		url: "/operator/fx-rate",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				from_currency?: Currency | null;
				to_currency?: Currency | null;
				skip?: number;
				limit?: number;
			};
			response: OperatorFxRateModel[];
		}
	} as const,
	recordFxRate: {
		url: "/operator/fx-rate",
		method: "POST",
		_types: {} as {
			body: FxRateCreateSchema;
			query: void;
			response: OperatorFxRateModel | null;
		}
	} as const,
	getFxRate: (fxRateId: string) =>
		({
			url: `/operator/fx-rate/${fxRateId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorFxRateModel;
			}
		}) as const
} as const;
