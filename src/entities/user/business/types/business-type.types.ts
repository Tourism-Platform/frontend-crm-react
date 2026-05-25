export const ENUM_BUSINESS_TYPES = {
	TOUR_OPERATOR: "tour_operator",
	AGENCY: "agency"
} as const;

export type ENUM_BUSINESS_TYPES_TYPE =
	(typeof ENUM_BUSINESS_TYPES)[keyof typeof ENUM_BUSINESS_TYPES];
