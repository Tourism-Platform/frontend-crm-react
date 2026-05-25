export const ENUM_TOUR_STATUS = {
	ALL: "all",
	PUBLISHED: "published",
	ARCHIVED: "archived",
	DRAFT: "draft"
} as const;

export type ENUM_TOUR_STATUS_TYPE =
	(typeof ENUM_TOUR_STATUS)[keyof typeof ENUM_TOUR_STATUS];
