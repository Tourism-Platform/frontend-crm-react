import { ENUM_API_TAGS, OPERATOR_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import type {
	TOperatorFinancialSettingsBackend,
	TOperatorFinancialSettingsUpdateBackend
} from "../types";

export const operatorFinancialApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorFinancials: builder.query<
			TOperatorFinancialSettingsBackend | null,
			void
		>({
			query: () => ({
				...OPERATOR_PATHS.getOperatorFinancials
			}),
			providesTags: [ENUM_API_TAGS.COMMISSION]
		}),
		updateOperatorFinancials: builder.mutation<
			TOperatorFinancialSettingsBackend,
			TOperatorFinancialSettingsUpdateBackend
		>({
			query: (body) => ({
				...OPERATOR_PATHS.updateOperatorFinancials,
				body
			}),
			invalidatesTags: [ENUM_API_TAGS.COMMISSION]
		})
	})
});
