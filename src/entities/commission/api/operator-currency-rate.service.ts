import { ENUM_API_TAGS, OPERATOR_FX_RATE_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorCurrencyRateFiltersToBackend,
	mapOperatorCurrencyRateListToFrontend,
	mapOperatorCurrencyRateToBackend,
	mapOperatorCurrencyRateToFrontend
} from "../converters/operator-currency-rate.converters";
import type {
	IOperatorCurrencyRate,
	IOperatorCurrencyRateFilters,
	TOperatorCurrencyRateCreateSchema,
	TOperatorCurrencyRateResponse,
	TOperatorCurrencyRateUpdateSchema
} from "../types";
import type { TOperatorCurrencyRateBackend } from "../types/operator-currency-rate-backend.interface";

export const operatorCurrencyRateApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorCurrencyRates: builder.query<
			IPaginationResponse<IOperatorCurrencyRate>,
			IOperatorCurrencyRateFilters
		>({
			query: (filters) => ({
				...OPERATOR_FX_RATE_PATHS.listFxRates,
				params: mapOperatorCurrencyRateFiltersToBackend(filters)
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
		}),
		updateOperatorCurrencyRate: builder.mutation<
			IOperatorCurrencyRate,
			{ id: string; data: TOperatorCurrencyRateUpdateSchema }
		>({
			query: ({ id, data }) => ({
				...OPERATOR_FX_RATE_PATHS.updateFxRate(id),
				body: data
			}),
			transformResponse: (response: TOperatorCurrencyRateBackend) =>
				mapOperatorCurrencyRateToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.CURRENCY_RATES]
		}),
		deleteOperatorCurrencyRate: builder.mutation<void, string>({
			query: (id) => ({
				...OPERATOR_FX_RATE_PATHS.deleteFxRate(id)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.CURRENCY_RATES]
		})
	})
});

export const {
	useGetOperatorCurrencyRatesQuery,
	useCreateOperatorCurrencyRateMutation,
	useUpdateOperatorCurrencyRateMutation,
	useDeleteOperatorCurrencyRateMutation
} = operatorCurrencyRateApi;
