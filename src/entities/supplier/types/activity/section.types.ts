export const ENUM_FORM_ACTIVITY_SECTION = {
	GENERAL: "general",
	VARIANTS: "variants"
} as const;

export type ENUM_FORM_ACTIVITY_SECTION_TYPE =
	(typeof ENUM_FORM_ACTIVITY_SECTION)[keyof typeof ENUM_FORM_ACTIVITY_SECTION];
