import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapBusinessInfoToBackend,
	mapBusinessInfoToFrontend
} from "../converters";
import type { IBusinessInfoBackend, TBusinessSchema } from "../types";

export const businessApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBusinessInfo: builder.query<TBusinessSchema, void>({
			query: () => "/user/business-info",
			transformResponse: (response: IBusinessInfoBackend) =>
				mapBusinessInfoToFrontend(response),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		updateBusinessInfo: builder.mutation<TBusinessSchema, TBusinessSchema>({
			query: (patch) => ({
				url: "/user/business-info",
				method: "PATCH",
				body: mapBusinessInfoToBackend(patch)
			}),
			transformResponse: (response: IBusinessInfoBackend) =>
				mapBusinessInfoToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		})
	})
});

export const { useGetBusinessInfoQuery, useUpdateBusinessInfoMutation } =
	businessApi;
