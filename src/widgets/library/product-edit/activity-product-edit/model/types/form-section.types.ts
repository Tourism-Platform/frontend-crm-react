import type { TActivityProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_FORM_ACTIVITY_MENU_TYPE,
	type ENUM_FORM_ACTIVITY_PRODUCT_TYPE,
	type ENUM_FORM_ACTIVITY_VARIANTS_TYPE,
	type ENUM_FORM_ACTIVITY_VARIANT_TYPE,
	ENUM_FORM_ACTIVITY_SECTION as ENUM_FORM_SECTION
} from "@/entities/supplier";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TActivityProductEditPageKeys,
	| ENUM_FORM_ACTIVITY_PRODUCT_TYPE
	| ENUM_FORM_ACTIVITY_VARIANT_TYPE
	| ENUM_FORM_ACTIVITY_VARIANTS_TYPE
	| ENUM_FORM_ACTIVITY_MENU_TYPE
>;
