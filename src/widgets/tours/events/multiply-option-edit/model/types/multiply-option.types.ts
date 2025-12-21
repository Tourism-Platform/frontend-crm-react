import { type FC } from "react";
import { z } from "zod";

import { type TTourEventMultiplyOptionEditPageKeys } from "@/shared/config";
import { type TFormField } from "@/shared/types";

import { type GENERAL_INFO_SCHEMA } from "../schema";

import {
	ENUM_FORM_MULTIPLY_OPTION,
	type ENUM_FORM_MULTIPLY_OPTION_TYPE
} from "./form-enum.types";

export type TForm = TFormField<
	TTourEventMultiplyOptionEditPageKeys,
	ENUM_FORM_MULTIPLY_OPTION_TYPE
>;

export { ENUM_FORM_MULTIPLY_OPTION, type ENUM_FORM_MULTIPLY_OPTION_TYPE };

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;

export const ENUM_MULTIPLY_OPTION_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media"
} as const;

export type ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE =
	(typeof ENUM_MULTIPLY_OPTION_EDIT_TAB)[keyof typeof ENUM_MULTIPLY_OPTION_EDIT_TAB];

export interface IMultiplyOptionEditTabs {
	label: TTourEventMultiplyOptionEditPageKeys;
	type: ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE;
	slot: FC;
}
