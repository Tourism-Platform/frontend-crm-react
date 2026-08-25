export const ENUM_FORM_EVENT_PRODUCT = {
	PRODUCT_ID: "product_id",
	VARIANT_ID: "variant_id",
	SOURCE: "source",
	HAS_OVERRIDE: "has_override"
} as const;

export type ENUM_FORM_EVENT_PRODUCT_TYPE =
	(typeof ENUM_FORM_EVENT_PRODUCT)[keyof typeof ENUM_FORM_EVENT_PRODUCT];
