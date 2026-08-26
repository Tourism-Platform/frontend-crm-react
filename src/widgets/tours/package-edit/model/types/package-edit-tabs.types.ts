export const ENUM_PACKAGE_EDIT_TAB = {
	PRICING: "pricing"
} as const;

export type ENUM_PACKAGE_EDIT_TAB_TYPE =
	(typeof ENUM_PACKAGE_EDIT_TAB)[keyof typeof ENUM_PACKAGE_EDIT_TAB];

export const ENUM_FORM_SECTION = {
	PRICING: "pricing"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export interface IPackageEditSlotContext {
	backToEventHref?: string;
}
