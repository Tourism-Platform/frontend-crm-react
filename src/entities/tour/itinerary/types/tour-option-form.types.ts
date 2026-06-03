export const ENUM_FORM_TOUR_OPTION = {
	NAME: "name",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_TOUR_OPTION_TYPE =
	(typeof ENUM_FORM_TOUR_OPTION)[keyof typeof ENUM_FORM_TOUR_OPTION];
