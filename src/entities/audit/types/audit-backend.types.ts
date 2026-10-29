import {
	type AUDIT_PATHS,
	type AuditLogListResponse,
	type AuditLogRead,
	Permissions,
	UserRoles
} from "@/shared/api";

export type TAuditLogBackend = AuditLogRead;
export type TAuditLogListBackendResponse = AuditLogListResponse;
export type TAuditLogListBackendQuery =
	typeof AUDIT_PATHS.listOrgAudit._types.query;

export type TAuditUserRoleBackend = UserRoles;
export type TAuditPermissionBackend = Permissions;

export const ENUM_AUDIT_USER_ROLE_BACKEND = {
	OPERATOR_ADMIN: UserRoles.OperatorAdmin,
	OPERATOR_STAFF: UserRoles.OperatorStaff
} as const;

export const ENUM_AUDIT_PERMISSION_BACKEND = {
	TOUR_CREATE: Permissions.TourCreate,
	BOOKING_WRITE: Permissions.BookingWrite,
	INVOICE_WRITE: Permissions.InvoiceWrite,
	OPERATOR_DELETE: Permissions.OperatorDelete,
	LEDGER_READ: Permissions.LedgerRead
} as const;
