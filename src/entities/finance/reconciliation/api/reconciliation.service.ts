import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapReconciliationDetailToFrontend,
	mapReconciliationFiltersToBackend,
	mapReconciliationPaginatedToFrontend
} from "../converters";
import type {
	IReconciliationDetail,
	IReconciliationDetailBackend,
	IReconciliationFilters,
	IReconciliationPaginatedResponse,
	IReconciliationPaginatedResponseBackend
} from "../types";

export const reconciliationApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getReconciliations: builder.query<
			IReconciliationPaginatedResponse,
			IReconciliationFilters | void
		>({
			query: (filters) => ({
				url: "/finance/reconciliations",
				params: filters
					? mapReconciliationFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (
				response: IReconciliationPaginatedResponseBackend
			) => mapReconciliationPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_RECONCILIATIONS]
		}),
		getReconciliationById: builder.query<IReconciliationDetail, string>({
			query: (id) => ({
				url: `/finance/reconciliations/${id}`
			}),
			transformResponse: (response: IReconciliationDetailBackend) =>
				mapReconciliationDetailToFrontend(response),
			providesTags: (_, __, id) => [
				{ type: ENUM_API_TAGS.FINANCE_RECONCILIATIONS, id }
			]
		})
	})
});

export const { useGetReconciliationsQuery, useGetReconciliationByIdQuery } =
	reconciliationApi;
