import { ENUM_API_TAGS, TOUR_FINANCIAL_PATHS, TOUR_PATHS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapTourCreateToBackend,
	mapTourFiltersToBackend,
	mapTourFinanceToBackend,
	mapTourFinanceToFrontend,
	mapTourGeneralToFrontend,
	mapTourPaginatedToFrontend,
	mapTourStatsToFrontend
} from "../converters";
import type {
	ITourCard,
	ITourFilters,
	ITourGeneral,
	ITourInfo,
	ITourInfoBackend,
	TCreateTourSchema,
	TGetTourBackendResponse,
	TListToursBackendResponse,
	TSettingsFinanceFormSchema,
	TTourFinanceBackend,
	TTourFinanceBackendResponse,
	TTourSettingsGeneralFormSchema,
	TUpdateTourBackendResponse
} from "../types";

export const tourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getTours: builder.query<IPaginationResponse<ITourCard>, ITourFilters>({
			query: (filters) => ({
				...TOUR_PATHS.listTours,
				params: mapTourFiltersToBackend(filters)
			}),
			transformResponse: (response: TListToursBackendResponse) =>
				mapTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS]
		}),
		createTour: builder.mutation<ITourCard, TCreateTourSchema>({
			query: (tour) => ({
				...TOUR_PATHS.createTour,
				body: mapTourCreateToBackend(tour)
			}),
			// transformResponse: (
			// 	response: typeof TOUR_PATHS.createTour._types.response
			// ) => mapTourGeneralToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.TOURS]
		}),
		getTourGeneral: builder.query<ITourGeneral, string>({
			query: (id) => ({
				...TOUR_PATHS.getTour(id)
			}),
			transformResponse: (response: TGetTourBackendResponse) =>
				mapTourGeneralToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `GENERAL_${id}` }
			]
		}),
		updateTourGeneral: builder.mutation<
			TTourSettingsGeneralFormSchema,
			{ id: string; data: TTourSettingsGeneralFormSchema }
		>({
			query: ({ id, data }) => ({
				...TOUR_PATHS.updateTour(id),
				body: mapTourCreateToBackend(data)
			}),
			transformResponse: (response: TUpdateTourBackendResponse) =>
				mapTourGeneralToFrontend(response),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.TOURS, id: `GENERAL_${id}` },
				ENUM_API_TAGS.TOURS
			]
		}),
		getTourFinance: builder.query<TSettingsFinanceFormSchema, string>({
			query: (id) => ({
				...TOUR_FINANCIAL_PATHS.getTourFinancials(id)
			}),
			transformResponse: (response: TTourFinanceBackendResponse) =>
				mapTourFinanceToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `FINANCE_${id}` }
			]
		}),
		createTourFinance: builder.mutation<
			TSettingsFinanceFormSchema,
			{ id: string; data: TSettingsFinanceFormSchema }
		>({
			query: ({ id, data }) => ({
				...TOUR_FINANCIAL_PATHS.createTourFinancials(id),
				body: mapTourFinanceToBackend(data)
			}),
			transformResponse: (response: TTourFinanceBackendResponse) =>
				mapTourFinanceToFrontend(response),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.TOURS, id: `FINANCE_${id}` },
				ENUM_API_TAGS.TOURS
			]
		}),
		updateTourFinance: builder.mutation<
			TSettingsFinanceFormSchema,
			{ id: string; data: TSettingsFinanceFormSchema }
		>({
			query: ({ id, data }) => ({
				...TOUR_FINANCIAL_PATHS.updateTourFinancials(id),
				body: mapTourFinanceToBackend(data)
			}),
			transformResponse: (response: TTourFinanceBackend) =>
				mapTourFinanceToFrontend(response),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.TOURS, id: `FINANCE_${id}` },
				ENUM_API_TAGS.TOURS
			]
		}),
		getTourStats: builder.query<ITourInfo, string>({
			query: (id) => `/tours/${id}/stats`,
			transformResponse: (response: ITourInfoBackend) =>
				mapTourStatsToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `STATS_${id}` }
			]
		}),
		publishTour: builder.mutation<void, string>({
			query: (id) => ({
				url: `/tours/${id}/publish`,
				method: "POST"
			}),
			invalidatesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `GENERAL_${id}` },
				ENUM_API_TAGS.TOURS
			]
		})
	})
});

export const {
	useGetToursQuery,
	useCreateTourMutation,
	useGetTourGeneralQuery,
	useUpdateTourGeneralMutation,
	useGetTourFinanceQuery,
	useUpdateTourFinanceMutation,
	useGetTourStatsQuery,
	usePublishTourMutation
} = tourApi;
