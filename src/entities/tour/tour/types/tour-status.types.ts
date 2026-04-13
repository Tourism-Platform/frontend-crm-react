export const ENUM_TOUR_STATUS = {
	ALL: "all",
	ACTIVE: "active",
	MODERATE: "moderate",
	CANCELLED: "cancelled",
	DRAFT: "draft"
} as const;

export type ENUM_TOUR_STATUS_TYPE =
	(typeof ENUM_TOUR_STATUS)[keyof typeof ENUM_TOUR_STATUS];
