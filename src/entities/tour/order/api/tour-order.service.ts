import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapTourOrderFiltersToBackend,
	mapTourOrderPaginatedToFrontend
} from "../converters";
import {
	type ITourOrderFilters,
	type TTourOrderPaginatedResponse,
	type TTourOrderPaginatedResponseBackend
} from "../types";

export const tourOrderApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getTourOrders: builder.query<
			TTourOrderPaginatedResponse,
			ITourOrderFilters | void
		>({
			query: (filters) => ({
				url: "/tours/orders",
				params: filters
					? mapTourOrderFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (response: TTourOrderPaginatedResponseBackend) =>
				mapTourOrderPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOUR_ORDER_HISTORY]
		})
	})
});

export const { useGetTourOrdersQuery } = tourOrderApi;
