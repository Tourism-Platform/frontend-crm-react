export const ENUM_FORM_TRANSFER_SECTION = {
	GENERAL: "general",
	CARS: "cars",
	PRICING: "pricing"
} as const;

export type ENUM_FORM_TRANSFER_SECTION_TYPE =
	(typeof ENUM_FORM_TRANSFER_SECTION)[keyof typeof ENUM_FORM_TRANSFER_SECTION];
