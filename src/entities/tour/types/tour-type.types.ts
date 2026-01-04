export const ENUM_TOUR_TYPES = {
	PRIVATE: "private",
	GROUP: "group"
} as const;

export type ENUM_TOUR_TYPES_TYPE =
	(typeof ENUM_TOUR_TYPES)[keyof typeof ENUM_TOUR_TYPES];
