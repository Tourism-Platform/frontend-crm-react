export const ENUM_GUIDE_EDIT_TAB = {
	GUIDES: "guides",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_GUIDE_EDIT_TAB_TYPE =
	(typeof ENUM_GUIDE_EDIT_TAB)[keyof typeof ENUM_GUIDE_EDIT_TAB];
