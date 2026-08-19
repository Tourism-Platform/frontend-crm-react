import { UserRoles } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_STAFF_USER_ROLE, type ENUM_STAFF_USER_ROLE_TYPE } from "../types";

const MAP_STAFF_USER_ROLE: Record<ENUM_STAFF_USER_ROLE_TYPE, UserRoles> = {
	[ENUM_STAFF_USER_ROLE.ADMIN]: UserRoles.Admin,
	[ENUM_STAFF_USER_ROLE.OPERATOR_ADMIN]: UserRoles.OperatorAdmin,
	[ENUM_STAFF_USER_ROLE.OPERATOR_STAFF]: UserRoles.OperatorStaff,
	[ENUM_STAFF_USER_ROLE.AGENCY_ADMIN]: UserRoles.AgencyAdmin,
	[ENUM_STAFF_USER_ROLE.AGENCY_STAFF]: UserRoles.AgencyStaff,
	[ENUM_STAFF_USER_ROLE.AUTHENTICATED_USER]: UserRoles.AuthenticatedUser
};

export const staffUserRoleConverter = createEnumMapper<
	ENUM_STAFF_USER_ROLE_TYPE,
	UserRoles
>(MAP_STAFF_USER_ROLE);
