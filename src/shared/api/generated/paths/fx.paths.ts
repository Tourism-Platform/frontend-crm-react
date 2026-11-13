import type {
	Currency,
	FxRateScope,
	FxSyncRead,
	OperatorFxRateReadOutput
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const FX_PATHS = {
	syncReferenceRates: {
		url: "/fx/admin/sync",
		method: "POST",
		_types: {} as { body: void; query: void; response: FxSyncRead }
	} as const,
	listOperatorRates: {
		url: "/fx/operator/rate",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				from_currency?: Currency[] | null;
				to_currency?: Currency[] | null;
				scope?: FxRateScope;
			};
			response: OperatorFxRateReadOutput[];
		}
	} as const
} as const;
