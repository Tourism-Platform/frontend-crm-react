export const ENUM_AVAILABILITY_STATUS = {
	PENDING: "pending",
	AVAILABLE: "available",
	UNAVAILABLE: "unavailable",
	SELECTED: "selected",
	DESELECTED: "deselected"
} as const;

export type ENUM_AVAILABILITY_STATUS_TYPE =
	(typeof ENUM_AVAILABILITY_STATUS)[keyof typeof ENUM_AVAILABILITY_STATUS];
