export const ENUM_STAFF_USER_ROLE = {
	ADMIN: "admin",
	OPERATOR_ADMIN: "operator_admin",
	OPERATOR_STAFF: "operator_staff",
	AGENCY_ADMIN: "agency_admin",
	AGENCY_STAFF: "agency_staff",
	AUTHENTICATED_USER: "authenticated_user"
} as const;

export type ENUM_STAFF_USER_ROLE_TYPE =
	(typeof ENUM_STAFF_USER_ROLE)[keyof typeof ENUM_STAFF_USER_ROLE];
