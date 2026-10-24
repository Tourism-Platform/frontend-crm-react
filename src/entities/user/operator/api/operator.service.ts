import { OPERATOR_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import type {
	TOperatorCreateSchemaBackend,
	TOperatorModelBackend
} from "../types";

export const operatorApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createOperator: builder.mutation<
			TOperatorModelBackend,
			TOperatorCreateSchemaBackend
		>({
			query: (body) => ({
				...OPERATOR_PATHS.createOperator,
				body
			})
		}),
		getOperator: builder.query<TOperatorModelBackend, string>({
			query: (id) => ({
				...OPERATOR_PATHS.getOperator(id)
			})
		}),
		updateOperator: builder.mutation<
			void,
			{ id: string; body: TOperatorCreateSchemaBackend }
		>({
			query: ({ id, body }) => ({
				...OPERATOR_PATHS.udpateOperator(id),
				body
			})
		}),
		deleteOperator: builder.mutation<void, string>({
			query: (id) => ({
				...OPERATOR_PATHS.deleteOperator(id)
			})
		})
	})
});
