export const ENUM_AGENCY_BUSINESS_TYPES = {
	TOUR_OPERATOR: "tour_operator",
	AGENCY: "agency"
} as const;

export type ENUM_AGENCY_BUSINESS_TYPES_TYPE =
	(typeof ENUM_AGENCY_BUSINESS_TYPES)[keyof typeof ENUM_AGENCY_BUSINESS_TYPES];
