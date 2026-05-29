export const ENUM_FORM_SECTION = {
	GENERAL: "general",
	CARS: "cars",
	PRICING: "pricing",
	NAME: "name"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];
