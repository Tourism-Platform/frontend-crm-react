import {
	AGENCY_PATHS,
	type AgencyListResponse,
	type AgencyModel,
	type CreateAgencySchema,
	ENUM_API_TAGS,
	type TourCatalogSort
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapAgencyBusinessInfoToFrontend } from "../converters";
import type {
	TAgencyBusinessInfoBackend,
	TAgencyBusinessSchema,
	TAgencyListItem,
	TListAgenciesParams
} from "../types";

export interface IAgencyCatalogQuery {
	page?: number;
	limit?: number;
	sort?: TourCatalogSort | null;
	search?: string;
	status?: string;
}

const mapAgencyListItemToFrontend = (
	item: AgencyListResponse["data"][number]
): TAgencyListItem => ({
	id: item.id,
	name: item.name,
	businessName: item.business_name ?? null,
	legalName: item.legal_name ?? null,
	contactPerson: item.contact_person ?? null,
	contactEmail: item.contact_email ?? null,
	contactPhone: item.contact_phone ?? null,
	city: item.city ?? null,
	country: item.country ?? null,
	logoUrl: item.logo_url ?? null
});

export const agencyApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createAgency: builder.mutation<AgencyModel, CreateAgencySchema>({
			query: (body) => ({
				...AGENCY_PATHS.createAgency,
				body
			})
		}),
		listAgencies: builder.query<
			{ total: number; data: TAgencyListItem[] },
			TListAgenciesParams
		>({
			query: (params) => {
				const page = params.page ?? 1;
				const limit = params.limit ?? 20;

				return {
					...AGENCY_PATHS.listAgencies,
					params: {
						q: params.search || null,
						skip: (page - 1) * limit,
						limit
					}
				};
			},
			transformResponse: (response: AgencyListResponse) => ({
				total: response.total_count,
				data: response.data.map(mapAgencyListItemToFrontend)
			}),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getAgencyInfoById: builder.query<TAgencyBusinessSchema, string>({
			query: (agencyId) => ({
				...AGENCY_PATHS.getAgencyInfoById(agencyId)
			}),
			transformResponse: (response: TAgencyBusinessInfoBackend | null) =>
				mapAgencyBusinessInfoToFrontend(response),
			providesTags: (_result, _error, agencyId) => [
				{ type: ENUM_API_TAGS.BUSINESS, id: agencyId }
			]
		})
	})
});

export const {
	useCreateAgencyMutation,
	useListAgenciesQuery,
	useGetAgencyInfoByIdQuery
} = agencyApi;
