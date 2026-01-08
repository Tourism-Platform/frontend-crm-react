export const ENUM_TOUR_CATEGORY = {
	BEACH: "beach",
	MOUNTAIN: "mountain",
	CITY: "city",
	SAFARI: "safari",
	CRUISE: "cruise",
	GASTRONOMIC: "gastronomic",
	EXTREME: "extreme"
} as const;

export type ENUM_TOUR_CATEGORY_TYPE =
	(typeof ENUM_TOUR_CATEGORY)[keyof typeof ENUM_TOUR_CATEGORY];
