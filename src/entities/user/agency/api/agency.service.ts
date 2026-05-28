import {
	AGENCY_PATHS,
	type AgencyModel,
	type CreateAgencySchema,
	type TourCatalogSort
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

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
		})
		// listAgencyCatalog: builder.query<
		// 	PublicTourCatalogSchemaOutput[],
		// 	IAgencyCatalogQuery | void
		// >({
		// 	query: (params) => ({
		// 		...AGENCY_PATHS.listAgencyCatalog,
		// 		params: params ?? undefined
		// 	})
		// })
	})
});
