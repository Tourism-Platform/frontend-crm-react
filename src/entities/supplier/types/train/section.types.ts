export const ENUM_FORM_TRAIN_SECTION = {
	GENERAL: "general",
	FARES: "fares",
	PRICING: "pricing"
} as const;

export type ENUM_FORM_TRAIN_SECTION_TYPE =
	(typeof ENUM_FORM_TRAIN_SECTION)[keyof typeof ENUM_FORM_TRAIN_SECTION];
