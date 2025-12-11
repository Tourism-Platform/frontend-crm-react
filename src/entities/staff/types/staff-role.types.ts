export const ENUM_STAFF_ROLE_OPTIONS = {
	ADMIN: "admin",
	SALES_MANAGER: "sales_manager"
} as const;

export type ENUM_STAFF_ROLE_OPTIONS_TYPE =
	(typeof ENUM_STAFF_ROLE_OPTIONS)[keyof typeof ENUM_STAFF_ROLE_OPTIONS];
