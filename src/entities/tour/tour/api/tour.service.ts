import { ENUM_API_TAGS, TOUR_PATHS } from "@/shared/api";
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
	ITourFinanceBackend,
	ITourGeneral,
	ITourInfo,
	ITourInfoBackend,
	TSettingsFinanceFormSchema,
	TTourBackend,
	TTourSettingsGeneralFormSchema
} from "../types";

export const tourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getTours: builder.query<IPaginationResponse<ITourCard>, ITourFilters>({
			query: (filters) => ({
				...TOUR_PATHS.listTours,
				params: mapTourFiltersToBackend(filters)
			}),
			transformResponse: (response: TTourBackend[]) =>
				mapTourPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.TOURS]
		}),
		createTour: builder.mutation<
			ITourCard,
			Partial<TTourSettingsGeneralFormSchema>
		>({
			query: (tour) => ({
				...TOUR_PATHS.createTour,
				body: mapTourCreateToBackend(tour)
			}),
			// !!! проблема с типизацией
			// transformResponse: (response: TTourBackend) =>
			// 	mapTourCreateToFrontend(response),

			// transformResponse: (response: TTourBackend) =>
			// 	mapTourGeneralToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.TOURS]
		}),
		getTourGeneral: builder.query<ITourGeneral, string>({
			query: (id) => ({
				...TOUR_PATHS.getTour(id)
			}),
			transformResponse: (response: TTourBackend) =>
				mapTourGeneralToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `GENERAL_${id}` }
			]
		}),
		updateTourGeneral: builder.mutation<
			TTourSettingsGeneralFormSchema,
			{ id: string; data: Partial<TTourSettingsGeneralFormSchema> }
		>({
			query: ({ id, data }) => ({
				...TOUR_PATHS.updateTour(id),
				body: mapTourCreateToBackend(data)
			}),
			transformResponse: (response: TTourBackend) =>
				mapTourGeneralToFrontend(response),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: ENUM_API_TAGS.TOURS, id: `GENERAL_${id}` },
				ENUM_API_TAGS.TOURS
			]
		}),
		getTourFinance: builder.query<TSettingsFinanceFormSchema, string>({
			query: (id) => `/tours/${id}/finance`,
			transformResponse: (response: ITourFinanceBackend) =>
				mapTourFinanceToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `FINANCE_${id}` }
			]
		}),
		updateTourFinance: builder.mutation<
			TSettingsFinanceFormSchema,
			{ id: string; data: Partial<TSettingsFinanceFormSchema> }
		>({
			query: ({ id, data }) => ({
				url: `/tours/${id}/finance`,
				method: "PATCH",
				body: mapTourFinanceToBackend(
					data as TSettingsFinanceFormSchema
				)
			}),
			transformResponse: (response: ITourFinanceBackend) =>
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
