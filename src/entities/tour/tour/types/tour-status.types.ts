export const ENUM_TOUR_STATUS = {
	ALL: "all",
	ACTIVE: "active",
	MODERATE: "moderate",
	PLANNING: "planning",
	CANCELLED: "cancelled",
	ARCHIVED: "archived"
} as const;

export type ENUM_TOUR_STATUS_TYPE =
	(typeof ENUM_TOUR_STATUS)[keyof typeof ENUM_TOUR_STATUS];
