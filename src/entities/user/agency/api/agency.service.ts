import {
	AGENCY_PATHS,
	type AgencyModel,
	type CreateAgencySchema,
	type TourCatalogSort
} from "@/shared/api";
import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapAgencyBusinessInfoToFrontend } from "../converters";
import type {
	TAgencyBusinessInfoBackend,
	TAgencyBusinessSchema
} from "../types";

export interface IAgencyCatalogQuery {
	skip?: number;
	limit?: number;
	sort?: TourCatalogSort | null;
	q?: string | null;
}

export const agencyApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createAgency: builder.mutation<AgencyModel, CreateAgencySchema>({
			query: (body) => ({
				...AGENCY_PATHS.createAgency,
				body
			})
		}),
		getAgencyInfoById: builder.query<TAgencyBusinessSchema | null, string>({
			query: (agencyId) => ({
				...AGENCY_PATHS.getAgencyInfoById(agencyId)
			}),
			transformResponse: (response: TAgencyBusinessInfoBackend) =>
				mapAgencyBusinessInfoToFrontend(response),
			providesTags: (_result, _error, agencyId) => [
				{ type: ENUM_API_TAGS.BUSINESS, id: agencyId }
			]
		})
	})
});

export const { useCreateAgencyMutation, useGetAgencyInfoByIdQuery } = agencyApi;
