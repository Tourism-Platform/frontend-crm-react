export const ENUM_STAFF_STATUS_OPTIONS = {
	ACTIVE: "active",
	INACTIVE: "inactive",
	PENDING: "pending"
} as const;

export type ENUM_STAFF_STATUS_OPTIONS_TYPE =
	(typeof ENUM_STAFF_STATUS_OPTIONS)[keyof typeof ENUM_STAFF_STATUS_OPTIONS];
