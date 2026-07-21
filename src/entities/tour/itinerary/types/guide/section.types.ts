export const ENUM_GUIDE_FORM_SECTION = {
	GUIDES: "guides",
	PRICING: "pricing",
	NAME: "name",
	DAY: "day",
	POSITION: "position"
} as const;

export type ENUM_GUIDE_FORM_SECTION_TYPE =
	(typeof ENUM_GUIDE_FORM_SECTION)[keyof typeof ENUM_GUIDE_FORM_SECTION];
