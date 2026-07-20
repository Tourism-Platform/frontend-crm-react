import type { TTourEventSupplementEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_SUPPLEMENT_FORM_SECTION as ENUM_FORM_SECTION,
	type ENUM_FORM_SUPPLEMENT_ITEMS_TYPE,
	type ENUM_SUPPLEMENT_PRICING_FIELD_TYPE
} from "@/entities/tour";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourEventSupplementEditPageKeys,
	ENUM_FORM_SUPPLEMENT_ITEMS_TYPE | ENUM_SUPPLEMENT_PRICING_FIELD_TYPE
>;
