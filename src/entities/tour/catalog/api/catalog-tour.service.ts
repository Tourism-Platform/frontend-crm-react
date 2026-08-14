import { ENUM_API_TAGS, TOUR_CATALOG_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapCatalogListFiltersToFrontend,
	mapCatalogTourFiltersToPublicCatalogQuery,
	mapCatalogTourPaginatedToFrontend,
	mapLocationSuggestParamsToBackend,
	mapLocationSuggestionsToOptions,
	mapRecentlySearchesToFrontend
} from "../converters";
import type {
	ICatalogListFilters,
	ICatalogTourCard,
	ICatalogTourFilters,
	IRecentSearch,
	IRecentSearchBackend,
	TCatalogFiltersBackend,
	TCatalogFiltersQuery,
	TListCatalogToursBackendResponse,
	TLocationSuggestOption,
	TLocationSuggestParams,
	TSuggestLocationsBackend
} from "../types";

export const catalogTourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getCatalogTours: builder.query<
			IPaginationResponse<ICatalogTourCard>,
			ICatalogTourFilters
		>({
			query: (filters) => ({
				...TOUR_CATALOG_PATHS.listPublicCatalog,
				params: mapCatalogTourFiltersToPublicCatalogQuery(filters)
			}),
			transformResponse: (response: TListCatalogToursBackendResponse) =>
				mapCatalogTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogFilters: builder.query<
			ICatalogListFilters,
			TCatalogFiltersQuery
		>({
			query: (params) => ({
				...TOUR_CATALOG_PATHS.listFilters,
				params
			}),
			transformResponse: (response: TCatalogFiltersBackend) =>
				mapCatalogListFiltersToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		suggestLocations: builder.query<
			TLocationSuggestOption[],
			TLocationSuggestParams
		>({
			query: (params) => ({
				...TOUR_CATALOG_PATHS.suggestLocations,
				params: mapLocationSuggestParamsToBackend(params)
			}),
			transformResponse: (response: TSuggestLocationsBackend) =>
				mapLocationSuggestionsToOptions(response)
		}),
		getRecentlySearchedTours: builder.query<IRecentSearch[], void>({
			query: () => ({
				url: "/tours/recently-searched"
			}),
			transformResponse: (response: IRecentSearchBackend[]) =>
				mapRecentlySearchesToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getPopularTours: builder.query<
			IPaginationResponse<ICatalogTourCard>,
			void
		>({
			query: () => ({
				url: "/tours/popular"
			}),
			transformResponse: (response: TListCatalogToursBackendResponse) =>
				mapCatalogTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		})
	})
});

export const {
	useGetCatalogToursQuery,
	useGetCatalogFiltersQuery,
	useSuggestLocationsQuery,
	useGetRecentlySearchedToursQuery,
	useGetPopularToursQuery
} = catalogTourApi;
