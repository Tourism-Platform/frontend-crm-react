import { ENUM_API_TAGS } from "@/shared/api";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapCatalogFilterPaginatedToFrontend,
	mapCatalogTourFiltersToBackend,
	mapCatalogTourPaginatedToFrontend,
	mapPriceHistogramToFrontend,
	mapRecentlySearchesToFrontend
} from "../converters";
import type {
	ICatalogTourBackend,
	ICatalogTourCard,
	ICatalogTourFilters,
	IFilterOption,
	IFilterOptionBackend,
	IPriceHistogramItem,
	IPriceHistogramItemBackend,
	IPriceHistogramRequest,
	IRecentSearch,
	IRecentSearchBackend
} from "../types";

export const catalogTourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getCatalogTours: builder.query<
			IPaginationResponse<ICatalogTourCard>,
			ICatalogTourFilters | void
		>({
			query: (filters) => ({
				url: "/tours/catalog",
				params: filters
					? mapCatalogTourFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (
				response: IPaginationResponse<ICatalogTourBackend>
			) => mapCatalogTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogRegions: builder.query<
			IPaginationResponse<IFilterOption>,
			IPaginationRequest
		>({
			query: (params) => ({
				url: "/tours/catalog/filters/regions",
				params
			}),
			transformResponse: (
				response: IPaginationResponse<IFilterOptionBackend>
			) => mapCatalogFilterPaginatedToFrontend(response),
			serializeQueryArgs: ({ queryArgs }) => {
				const { page, ...rest } = queryArgs;
				void page;
				return rest;
			},
			merge: (currentCache, newItems) => {
				currentCache.data.push(...newItems.data);
				currentCache.total = newItems.total;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page;
			},
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogDurations: builder.query<
			IPaginationResponse<IFilterOption>,
			IPaginationRequest
		>({
			query: (params) => ({
				url: "/tours/catalog/filters/durations",
				params
			}),
			transformResponse: (
				response: IPaginationResponse<IFilterOptionBackend>
			) => mapCatalogFilterPaginatedToFrontend(response),
			serializeQueryArgs: ({ queryArgs }) => {
				const { page, ...rest } = queryArgs;
				void page;
				return rest;
			},
			merge: (currentCache, newItems) => {
				currentCache.data.push(...newItems.data);
				currentCache.total = newItems.total;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page;
			},
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogLanguages: builder.query<
			IPaginationResponse<IFilterOption>,
			IPaginationRequest
		>({
			query: (params) => ({
				url: "/tours/catalog/filters/languages",
				params
			}),
			transformResponse: (
				response: IPaginationResponse<IFilterOptionBackend>
			) => mapCatalogFilterPaginatedToFrontend(response),
			serializeQueryArgs: ({ queryArgs }) => {
				const { page, ...rest } = queryArgs;
				void page;
				return rest;
			},
			merge: (currentCache, newItems) => {
				currentCache.data.push(...newItems.data);
				currentCache.total = newItems.total;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page;
			},
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogCategories: builder.query<
			IPaginationResponse<IFilterOption>,
			IPaginationRequest
		>({
			query: (params) => ({
				url: "/tours/catalog/filters/categories",
				params
			}),
			transformResponse: (
				response: IPaginationResponse<IFilterOptionBackend>
			) => mapCatalogFilterPaginatedToFrontend(response),
			serializeQueryArgs: ({ queryArgs }) => {
				const { page, ...rest } = queryArgs;
				void page;
				return rest;
			},
			merge: (currentCache, newItems) => {
				currentCache.data.push(...newItems.data);
				currentCache.total = newItems.total;
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.page !== previousArg?.page;
			},
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogPriceHistogram: builder.query<
			IPriceHistogramItem[],
			IPriceHistogramRequest
		>({
			query: (params) => ({
				url: "/tours/catalog/filters/price-histogram",
				params
			}),
			transformResponse: (response: IPriceHistogramItemBackend[]) =>
				mapPriceHistogramToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getCatalogDestinations: builder.query<IFilterOption[], void>({
			query: () => ({
				url: "/tours/catalog/filters/destinations"
			}),
			transformResponse: (
				response: IPaginationResponse<IFilterOptionBackend>
			) => mapCatalogFilterPaginatedToFrontend(response).data,
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		}),
		getSearchTours: builder.query<
			IPaginationResponse<ICatalogTourCard>,
			ICatalogTourFilters | void
		>({
			query: (filters) => ({
				url: "/tours/search",
				params: filters
					? mapCatalogTourFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (
				response: IPaginationResponse<ICatalogTourBackend>
			) => mapCatalogTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
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
			transformResponse: (
				response: IPaginationResponse<ICatalogTourBackend>
			) => mapCatalogTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS_CATALOG]
		})
	})
});

export const {
	useGetCatalogToursQuery,
	useGetCatalogRegionsQuery,
	useGetCatalogDurationsQuery,
	useGetCatalogLanguagesQuery,
	useGetCatalogCategoriesQuery,
	useGetCatalogPriceHistogramQuery,
	useGetCatalogDestinationsQuery,
	useGetSearchToursQuery,
	useGetRecentlySearchedToursQuery,
	useGetPopularToursQuery
} = catalogTourApi;
