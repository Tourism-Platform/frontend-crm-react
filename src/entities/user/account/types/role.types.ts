export const ENUM_ROLE = {
	TOUR_OPERATOR: "tour_operator",
	AGENCY: "agency"
} as const;

export type ENUM_ROLE_TYPE = (typeof ENUM_ROLE)[keyof typeof ENUM_ROLE];
