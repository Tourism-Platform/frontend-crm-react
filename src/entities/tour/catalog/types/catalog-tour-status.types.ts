export const ENUM_CATALOG_TOUR_STATUS = {
	ALL: "all",
	ACTIVE: "active",
	MODERATE: "moderate",
	PLANNING: "planning",
	CANCELLED: "cancelled",
	ARCHIVED: "archived"
} as const;

export type ENUM_CATALOG_TOUR_STATUS_TYPE =
	(typeof ENUM_CATALOG_TOUR_STATUS)[keyof typeof ENUM_CATALOG_TOUR_STATUS];
