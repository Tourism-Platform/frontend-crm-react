import type { FX_PATHS } from "@/shared/api";

export type TOperatorCurrencyRateResponse =
	typeof FX_PATHS.listOperatorRates._types.response;

export type TOperatorCurrencyRateBackend =
	TOperatorCurrencyRateResponse[number];
