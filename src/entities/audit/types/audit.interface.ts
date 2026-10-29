import type { ENUM_USER_ROLE_TYPE } from "@/shared/config";

import type { ENUM_PERMISSION_TYPE } from "@/entities/staff";

export interface IAuditLog {
	id: string;
	userId: string;
	email: string | null;
	displayName: string | null;
	role: ENUM_USER_ROLE_TYPE;
	operatorId: string | null;
	agencyId: string | null;
	method: string;
	path: string;
	permission: ENUM_PERMISSION_TYPE | null;
	statusCode: number;
	createdAt: string;
}

export interface IAuditLogFilters {
	page: number;
	limit: number;
	userId?: string;
}
