import { UserRoles } from "@/shared/api";

export const ENUM_USER_ROLES_BACKEND = {
	ADMIN: UserRoles.Admin,
	OPERATOR_ADMIN: UserRoles.OperatorAdmin,
	OPERATOR_STAFF: UserRoles.OperatorStaff,
	AGENCY_ADMIN: UserRoles.AgencyAdmin,
	AGENCY_STAFF: UserRoles.AgencyStaff,
	AUTHENTICATED_USER: UserRoles.AuthenticatedUser
} as const;

export type ENUM_USER_ROLES_BACKEND_TYPE = UserRoles;
