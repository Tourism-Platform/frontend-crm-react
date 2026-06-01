export const ENUM_ACTIVITY_TYPE = {
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
	SPIRITUAL: "spiritual"
} as const;

export type ENUM_ACTIVITY_TYPE_TYPE =
	(typeof ENUM_ACTIVITY_TYPE)[keyof typeof ENUM_ACTIVITY_TYPE];
