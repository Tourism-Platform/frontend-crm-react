import type { TTourEventGuideEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_FORM_GUIDES_TYPE,
	ENUM_GUIDE_FORM_SECTION as ENUM_FORM_SECTION,
	type ENUM_GUIDE_PRICING_FIELD_TYPE
} from "@/entities/tour";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourEventGuideEditPageKeys,
	ENUM_FORM_GUIDES_TYPE | ENUM_GUIDE_PRICING_FIELD_TYPE
>;
