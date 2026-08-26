import { UserRoles } from "@/shared/api";
import { ENUM_USER_ROLE, type ENUM_USER_ROLE_TYPE } from "@/shared/config";
import { createEnumMapper } from "@/shared/utils";

const MAP_USER_ROLE: Record<ENUM_USER_ROLE_TYPE, UserRoles> = {
	[ENUM_USER_ROLE.ADMIN]: UserRoles.Admin,
	[ENUM_USER_ROLE.OPERATOR_ADMIN]: UserRoles.OperatorAdmin,
	[ENUM_USER_ROLE.OPERATOR_STAFF]: UserRoles.OperatorStaff,
	[ENUM_USER_ROLE.AGENCY_ADMIN]: UserRoles.AgencyAdmin,
	[ENUM_USER_ROLE.AGENCY_STAFF]: UserRoles.AgencyStaff,
	[ENUM_USER_ROLE.AUTHENTICATED_USER]: UserRoles.AuthenticatedUser
};

export const userRoleMapper = createEnumMapper<ENUM_USER_ROLE_TYPE, UserRoles>(
	MAP_USER_ROLE
);
