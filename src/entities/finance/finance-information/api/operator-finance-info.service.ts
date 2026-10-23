import { ENUM_API_TAGS, OPERATOR_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorFinanceInfoToBackend,
	mapOperatorFinanceInfoToFrontend
} from "../converters";
import type {
	TOperatorFinanceInfo,
	TOperatorFinanceInfoBackendResponse
} from "../types";

export const operatorFinanceInfoApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorFinanceInfo: builder.query<
			TOperatorFinanceInfo | null,
			void
		>({
			query: () => ({
				...OPERATOR_PATHS.getOperatorFinancials
			}),
			// Бэкенд возвращает null, пока оператор не создал финансовые настройки
			transformResponse: (
				response: TOperatorFinanceInfoBackendResponse
			) => (response ? mapOperatorFinanceInfoToFrontend(response) : null),
			providesTags: [ENUM_API_TAGS.OPERATOR.FINANCIAL_INFORMATION]
		}),
		updateOperatorFinanceInfo: builder.mutation<
			void,
			Partial<TOperatorFinanceInfo>
		>({
			query: (data) => ({
				...OPERATOR_PATHS.updateOperatorFinancials,
				body: mapOperatorFinanceInfoToBackend(data)
			}),
			// Курсы зависят от default_currency и fx_margin
			invalidatesTags: [
				ENUM_API_TAGS.OPERATOR.FINANCIAL_INFORMATION,
				ENUM_API_TAGS.OPERATOR.CURRENCY_RATES
			]
		})
	})
});

export const {
	useGetOperatorFinanceInfoQuery,
	useUpdateOperatorFinanceInfoMutation
} = operatorFinanceInfoApi;
