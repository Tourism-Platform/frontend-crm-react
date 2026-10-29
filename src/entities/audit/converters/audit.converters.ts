import type { IPaginationResponse } from "@/shared/types";

import type {
	IAuditLog,
	IAuditLogFilters,
	TAuditLogBackend,
	TAuditLogListBackendQuery,
	TAuditLogListBackendResponse
} from "../types";

export const mapAuditLogToFrontend = (log: TAuditLogBackend): IAuditLog => ({
	id: log.id,
	userId: log.user_id,
	email: log.email,
	displayName: log.display_name,
	role: `${log.role}`,
	operatorId: log.operator_id,
	agencyId: log.agency_id,
	method: log.method,
	path: log.path,
	permission: log.permission ? `${log.permission}` : null,
	statusCode: log.status_code,
	createdAt: log.created_at
});

export const mapAuditLogsPaginatedToFrontend = (
	response: TAuditLogListBackendResponse
): IPaginationResponse<IAuditLog> => ({
	data: response.data.map(mapAuditLogToFrontend),
	total: response.total_count
});

export const mapAuditLogFiltersToBackend = (
	filters: IAuditLogFilters
): TAuditLogListBackendQuery => ({
	skip: (filters.page - 1) * filters.limit,
	limit: filters.limit,
	user_id: filters.userId
});
