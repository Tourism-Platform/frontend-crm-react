import { ENUM_API_TAGS, FX_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapOperatorCurrencyRateListToFrontend } from "../converters/operator-currency-rate.converters";
import type {
	IOperatorCurrencyRate,
	TOperatorCurrencyRateResponse
} from "../types";

export const operatorCurrencyRateApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorCurrencyRates: builder.query<IOperatorCurrencyRate[], void>({
			query: () => ({
				...FX_PATHS.listOperatorRates
			}),
			transformResponse: (response: TOperatorCurrencyRateResponse) =>
				mapOperatorCurrencyRateListToFrontend(response),
			providesTags: [ENUM_API_TAGS.OPERATOR.CURRENCY_RATES]
		})
	})
});

export const { useGetOperatorCurrencyRatesQuery } = operatorCurrencyRateApi;
