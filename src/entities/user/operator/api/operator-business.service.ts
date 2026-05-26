import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorBusinessInfoToBackend,
	mapOperatorBusinessInfoToFrontend
} from "../converters";
import type {
	IOperatorBusinessInfoBackend,
	TOperatorBusinessSchema
} from "../types";

export const operatorBusinessApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorBusinessInfo: builder.query<TOperatorBusinessSchema, void>({
			query: () => "/user/business-info",
			transformResponse: (response: IOperatorBusinessInfoBackend) =>
				mapOperatorBusinessInfoToFrontend(response),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		updateOperatorBusinessInfo: builder.mutation<
			TOperatorBusinessSchema,
			TOperatorBusinessSchema
		>({
			query: (patch) => ({
				url: "/user/business-info",
				method: "PATCH",
				body: mapOperatorBusinessInfoToBackend(patch)
			}),
			transformResponse: (response: IOperatorBusinessInfoBackend) =>
				mapOperatorBusinessInfoToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		})
	})
});

export const {
	useGetOperatorBusinessInfoQuery,
	useUpdateOperatorBusinessInfoMutation
} = operatorBusinessApi;
