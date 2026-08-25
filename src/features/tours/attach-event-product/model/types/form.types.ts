import type { TTourCommonEventsKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

export const ENUM_FORM_ATTACH_PRODUCT = {
	SEARCH: "search",
	VARIANT_ID: "variant_id"
} as const;

export type ENUM_FORM_ATTACH_PRODUCT_TYPE =
	(typeof ENUM_FORM_ATTACH_PRODUCT)[keyof typeof ENUM_FORM_ATTACH_PRODUCT];

export type TForm = TFormField<
	TTourCommonEventsKeys,
	ENUM_FORM_ATTACH_PRODUCT_TYPE
>;
