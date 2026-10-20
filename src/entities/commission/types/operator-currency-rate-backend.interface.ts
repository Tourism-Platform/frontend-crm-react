import type {
	FxRateCreateSchema,
	OPERATOR_FX_RATE_PATHS,
	OperatorFxRateModel
} from "@/shared/api";

export type TOperatorCurrencyRateBackend = OperatorFxRateModel;
export type TOperatorCurrencyRateCreateBackend = FxRateCreateSchema;

export type TOperatorCurrencyRateBackendQuery =
	typeof OPERATOR_FX_RATE_PATHS.listFxRates._types.query;

export type TOperatorCurrencyRateResponse =
	typeof OPERATOR_FX_RATE_PATHS.listFxRates._types.response;
