import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapTourFiltersToBackend,
	mapTourPaginatedToFrontend
} from "../converters";
import type { ITourBackend, ITourCard, ITourFilters } from "../types";

export const tourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getTours: builder.query<
			IPaginationResponse<ITourCard>,
			ITourFilters | void
		>({
			query: (filters) => ({
				url: "/tours",
				params: filters ? mapTourFiltersToBackend(filters) : undefined
			}),
			transformResponse: (response: IPaginationResponse<ITourBackend>) =>
				mapTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS]
		})
	})
});

export const { useGetToursQuery } = tourApi;
