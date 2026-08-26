import { ENUM_USER_ROLE, type ENUM_USER_ROLE_TYPE } from "./user-role.types";

const AGENCY_ROLES: ENUM_USER_ROLE_TYPE[] = [
	ENUM_USER_ROLE.AGENCY_ADMIN,
	ENUM_USER_ROLE.AGENCY_STAFF
];

const OPERATOR_ROLES: ENUM_USER_ROLE_TYPE[] = [
	ENUM_USER_ROLE.ADMIN,
	ENUM_USER_ROLE.OPERATOR_ADMIN,
	ENUM_USER_ROLE.OPERATOR_STAFF
];

export const isAgencyUserRole = (role: ENUM_USER_ROLE_TYPE | null) =>
	role && AGENCY_ROLES.includes(role);

export const isOperatorUserRole = (role: ENUM_USER_ROLE_TYPE | null) =>
	role && OPERATOR_ROLES.includes(role);
