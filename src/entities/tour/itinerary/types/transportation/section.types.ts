export const ENUM_FORM_SECTION = {
	GENERAL: "general",
	CARS: "cars",
	PRICING: "pricing",
	NAME: "name",
	// !!! потом убрать эти два поля они не нужны для фронтенда
	DAY: "day",
	POSITION: "position"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];
