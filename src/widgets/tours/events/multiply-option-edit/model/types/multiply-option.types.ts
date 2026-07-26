import { type FC } from "react";
import { z } from "zod";

import { type TTourEventMultiplyOptionEditPageKeys } from "@/shared/config";
import { type TFormField } from "@/shared/types";

import { type ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE } from "@/entities/tour";

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

export interface IMultiplyOptionEditTabs {
	label: TTourEventMultiplyOptionEditPageKeys;
	type: ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE;
	slot: FC;
}
