import { z } from "zod";

import type { TTourInformationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { GENERAL_INFO_SCHEMA } from "../config";

export type TForm = TFormField<
	TTourInformationEditPageKeys,
	ENUM_FORM_INFORMATION_TYPE
>;

export const ENUM_FORM_INFORMATION = {
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_INFORMATION_TYPE =
	(typeof ENUM_FORM_INFORMATION)[keyof typeof ENUM_FORM_INFORMATION];

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;
