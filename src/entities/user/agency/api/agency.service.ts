import { AGENCY_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import type { TAgencyModelBackend, TCreateAgencySchemaBackend } from "../types";

export const agencyApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createAgency: builder.mutation<
			TAgencyModelBackend,
			TCreateAgencySchemaBackend
		>({
			query: (body) => ({
				...AGENCY_PATHS.createAgency,
				body
			})
		})
	})
});

export const { useCreateAgencyMutation } = agencyApi;
