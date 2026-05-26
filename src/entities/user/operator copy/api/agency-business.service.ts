import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAgencyBusinessInfoToBackend,
	mapAgencyBusinessInfoToFrontend
} from "../converters";
import type {
	IAgencyBusinessInfoBackend,
	TAgencyBusinessSchema
} from "../types";

export const agencyBusinessApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAgencyBusinessInfo: builder.query<TAgencyBusinessSchema, void>({
			query: () => "/user/business-info",
			transformResponse: (response: IAgencyBusinessInfoBackend) =>
				mapAgencyBusinessInfoToFrontend(response),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		updateAgencyBusinessInfo: builder.mutation<
			TAgencyBusinessSchema,
			TAgencyBusinessSchema
		>({
			query: (patch) => ({
				url: "/user/business-info",
				method: "PATCH",
				body: mapAgencyBusinessInfoToBackend(patch)
			}),
			transformResponse: (response: IAgencyBusinessInfoBackend) =>
				mapAgencyBusinessInfoToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		})
	})
});

export const {
	useGetAgencyBusinessInfoQuery,
	useUpdateAgencyBusinessInfoMutation
} = agencyBusinessApi;
