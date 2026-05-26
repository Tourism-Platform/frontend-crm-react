import {
	OPERATOR_PATHS,
	type OperatorCreateSchema,
	type OperatorModel
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

export const operatorApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createOperator: builder.mutation<OperatorModel, OperatorCreateSchema>({
			query: (body) => ({
				...OPERATOR_PATHS.createOperator,
				body
			})
		}),
		getOperator: builder.query<OperatorModel, string>({
			query: (id) => ({
				...OPERATOR_PATHS.getOperator(id)
			})
		}),
		updateOperator: builder.mutation<
			void,
			{ id: string; body: OperatorCreateSchema }
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
