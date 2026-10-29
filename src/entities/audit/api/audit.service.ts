import { AUDIT_PATHS, ENUM_API_TAGS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAuditLogFiltersToBackend,
	mapAuditLogsPaginatedToFrontend
} from "../converters";
import type {
	IAuditLog,
	IAuditLogFilters,
	TAuditLogListBackendResponse
} from "../types";

export const auditApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOrgAuditLogs: builder.query<
			IPaginationResponse<IAuditLog>,
			IAuditLogFilters
		>({
			query: (filters) => ({
				...AUDIT_PATHS.listOrgAudit,
				params: mapAuditLogFiltersToBackend(filters)
			}),
			transformResponse: (response: TAuditLogListBackendResponse) =>
				mapAuditLogsPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.AUDIT_LOG]
		})
	})
});

export const { useGetOrgAuditLogsQuery } = auditApi;
