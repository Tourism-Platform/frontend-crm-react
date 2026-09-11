export const ENUM_ACTIVITY_SUB_TYPE = {
	FOOD: "food",
	MASTER_CLASS: "master_class",
	SIGHTSEEING: "sightseeing",
	OUTDOOR: "outdoor",
	RIDING: "riding",
	EXTREME: "extreme",
	WELLNESS: "wellness",
	ENTERTAINMENT: "entertainment",
	WATER_ACTIVITIES: "water_activities",
	PHOTOGRAPHY: "photography",
	SPIRITUAL: "spiritual",
	OTHER: "other"
} as const;

export type ENUM_ACTIVITY_SUB_TYPE_TYPE =
	(typeof ENUM_ACTIVITY_SUB_TYPE)[keyof typeof ENUM_ACTIVITY_SUB_TYPE];
