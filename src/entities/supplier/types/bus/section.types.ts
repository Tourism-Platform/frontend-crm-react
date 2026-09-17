export const ENUM_FORM_BUS_SECTION = {
	GENERAL: "general",
	VEHICLES: "vehicles",
	PRICING: "pricing"
} as const;

export type ENUM_FORM_BUS_SECTION_TYPE =
	(typeof ENUM_FORM_BUS_SECTION)[keyof typeof ENUM_FORM_BUS_SECTION];
