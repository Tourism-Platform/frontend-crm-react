import { ENUM_API_TAGS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapTourFiltersToBackend,
	mapTourFinanceToBackend,
	mapTourFinanceToFrontend,
	mapTourGeneralToBackend,
	mapTourGeneralToFrontend,
	mapTourPaginatedToFrontend,
	mapTourToBackend,
	mapTourToFrontend
} from "../converters";
import type {
	ITourBackend,
	ITourCard,
	ITourFilters,
	ITourFinanceBackend,
	ITourGeneralBackend,
	TSettingsFinanceFormSchema,
	TSettingsGeneralFormSchema
} from "../types";

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
		}),
		getTourGeneral: builder.query<TSettingsGeneralFormSchema, string>({
			query: (id) => `/tours/${id}/general`,
			transformResponse: (response: ITourGeneralBackend) =>
				mapTourGeneralToFrontend(response),
			providesTags: (_result, _error, id) => [
				{ type: ENUM_API_TAGS.TOURS, id: `GENERAL_${id}` }
			]
		}),
		updateTourGeneral: builder.mutation<
			TSettingsGeneralFormSchema,
			{ id: string; data: Partial<TSettingsGeneralFormSchema> }
		>({
			query: ({ id, data }) => ({
				url: `/tours/${id}/general`,
				method: "PATCH",
				body: mapTourGeneralToBackend(
					data as TSettingsGeneralFormSchema
				)
			}),
			transformResponse: (response: ITourGeneralBackend) =>
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
		})
	})
});

export const {
	useGetToursQuery,
	useCreateTourMutation,
	useGetTourGeneralQuery,
	useUpdateTourGeneralMutation,
	useGetTourFinanceQuery,
	useUpdateTourFinanceMutation
} = tourApi;
