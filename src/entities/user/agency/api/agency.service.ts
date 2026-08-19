import {
	AGENCY_PATHS,
	type AgencyModel,
	type CreateAgencySchema
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

export const agencyApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createAgency: builder.mutation<AgencyModel, CreateAgencySchema>({
			query: (body) => ({
				...AGENCY_PATHS.createAgency,
				body
			})
		})
	})
});

export const { useCreateAgencyMutation } = agencyApi;
