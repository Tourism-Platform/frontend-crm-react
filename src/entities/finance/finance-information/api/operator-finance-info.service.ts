import { ENUM_API_TAGS, OPERATOR_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorFinanceInfoToBackend,
	mapOperatorFinanceInfoToFrontend
} from "../converters";
import type {
	TOperatorFinanceInfo,
	TOperatorFinanceInfoBackend
} from "../types";

export const operatorFinanceInfoApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorFinanceInfo: builder.query<TOperatorFinanceInfo, void>({
			query: () => ({
				...OPERATOR_PATHS.getOperatorFinancials
			}),
			transformResponse: (response: TOperatorFinanceInfoBackend) =>
				mapOperatorFinanceInfoToFrontend(response),
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
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.FINANCIAL_INFORMATION]
		})
	})
});

export const {
	useGetOperatorFinanceInfoQuery,
	useUpdateOperatorFinanceInfoMutation
} = operatorFinanceInfoApi;
