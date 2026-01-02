import { ENUM_API_TAGS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapTourFiltersToBackend,
	mapTourPaginatedToFrontend,
	mapTourToBackend,
	mapTourToFrontend
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
		}),
		createTour: builder.mutation<ITourCard, Partial<ITourCard>>({
			query: (tour) => ({
				url: "/tours",
				method: "POST",
				body: mapTourToBackend(tour)
			}),
			transformResponse: (response: ITourBackend) =>
				mapTourToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.TOURS]
		})
	})
});

export const { useGetToursQuery, useCreateTourMutation } = tourApi;
