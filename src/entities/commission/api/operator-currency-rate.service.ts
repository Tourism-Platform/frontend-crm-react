import { ENUM_API_TAGS, OPERATOR_FX_RATE_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorCurrencyRateListToFrontend,
	mapOperatorCurrencyRateToBackend
} from "../converters/operator-currency-rate.converters";
import type {
	IOperatorCurrencyRate,
	TOperatorCurrencyRateCreateSchema,
	TOperatorCurrencyRateResponse
} from "../types";

export const operatorCurrencyRateApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorCurrencyRates: builder.query<
			IPaginationResponse<IOperatorCurrencyRate>,
			void
		>({
			query: () => ({
				...OPERATOR_FX_RATE_PATHS.listFxRates
			}),
			transformResponse: (response: TOperatorCurrencyRateResponse) =>
				mapOperatorCurrencyRateListToFrontend(response),
			providesTags: [ENUM_API_TAGS.OPERATOR.CURRENCY_RATES]
		}),
		createOperatorCurrencyRate: builder.mutation<
			void,
			TOperatorCurrencyRateCreateSchema
		>({
			query: (data) => ({
				...OPERATOR_FX_RATE_PATHS.recordFxRate,
				body: mapOperatorCurrencyRateToBackend(data)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.CURRENCY_RATES]
		})
	})
});

export const {
	useGetOperatorCurrencyRatesQuery,
	useCreateOperatorCurrencyRateMutation
} = operatorCurrencyRateApi;
