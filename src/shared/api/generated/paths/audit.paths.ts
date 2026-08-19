import type { AuditLogListResponse } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const AUDIT_PATHS = {
	listOrgAudit: {
		url: "/audit/all",
		method: "GET",
		_types: {} as {
			body: void;
			query: { user_id?: string | null; skip?: number; limit?: number };
			response: AuditLogListResponse;
		}
	} as const,
	listAllAudit: {
		url: "/audit/admin/all",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				user_id?: string | null;
				operator_id?: string | null;
				agency_id?: string | null;
				skip?: number;
				limit?: number;
			};
			response: AuditLogListResponse;
		}
	} as const
} as const;
