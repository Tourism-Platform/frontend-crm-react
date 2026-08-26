import type { TOptionsKeys } from "../i18n";

import { ENUM_USER_ROLE, type ENUM_USER_ROLE_TYPE } from "./user-role.types";

export const USER_ROLE_LABELS: Record<ENUM_USER_ROLE_TYPE, TOptionsKeys> = {
	[ENUM_USER_ROLE.ADMIN]: "staff.userRoles.admin",
	[ENUM_USER_ROLE.OPERATOR_ADMIN]: "staff.userRoles.operator_admin",
	[ENUM_USER_ROLE.OPERATOR_STAFF]: "staff.userRoles.operator_staff",
	[ENUM_USER_ROLE.AGENCY_ADMIN]: "staff.userRoles.agency_admin",
	[ENUM_USER_ROLE.AGENCY_STAFF]: "staff.userRoles.agency_staff",
	[ENUM_USER_ROLE.AUTHENTICATED_USER]: "staff.userRoles.authenticated_user"
};
