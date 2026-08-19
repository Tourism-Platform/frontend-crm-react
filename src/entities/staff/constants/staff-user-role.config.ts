import { type TOptionsKeys } from "@/shared/config";

import { ENUM_STAFF_USER_ROLE, type ENUM_STAFF_USER_ROLE_TYPE } from "../types";

export const STAFF_USER_ROLE_LABELS: Record<
	ENUM_STAFF_USER_ROLE_TYPE,
	TOptionsKeys
> = {
	[ENUM_STAFF_USER_ROLE.ADMIN]: "staff.userRoles.admin",
	[ENUM_STAFF_USER_ROLE.OPERATOR_ADMIN]: "staff.userRoles.operator_admin",
	[ENUM_STAFF_USER_ROLE.OPERATOR_STAFF]: "staff.userRoles.operator_staff",
	[ENUM_STAFF_USER_ROLE.AGENCY_ADMIN]: "staff.userRoles.agency_admin",
	[ENUM_STAFF_USER_ROLE.AGENCY_STAFF]: "staff.userRoles.agency_staff",
	[ENUM_STAFF_USER_ROLE.AUTHENTICATED_USER]:
		"staff.userRoles.authenticated_user"
};
