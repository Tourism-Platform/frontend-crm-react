import type { TTourInformationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_FORM_INFORMATION_TYPE } from "@/entities/tour";

export const ENUM_FORM_SECTION = {
	GENERAL: "general",
	NAME: "name",
	DAY: "day",
	POSITION: "position"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourInformationEditPageKeys,
	ENUM_FORM_INFORMATION_TYPE
>;
