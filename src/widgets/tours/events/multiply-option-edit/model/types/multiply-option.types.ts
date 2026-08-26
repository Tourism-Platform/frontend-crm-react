import { type TTourEventMultiplyOptionEditPageKeys } from "@/shared/config";
import { type TFormField } from "@/shared/types";

import { type ENUM_FORM_MULTIPLY_OPTION_TYPE } from "@/entities/tour";

export const ENUM_FORM_SECTION = {
	GENERAL: "general"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourEventMultiplyOptionEditPageKeys,
	ENUM_FORM_MULTIPLY_OPTION_TYPE
>;
