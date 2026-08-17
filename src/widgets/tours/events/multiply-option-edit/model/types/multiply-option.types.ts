import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import {
	type TResources,
	type TTourEventMultiplyOptionEditPageKeys
} from "@/shared/config";
import { type TFormField } from "@/shared/types";

import {
	type ENUM_FORM_MULTIPLY_OPTION_TYPE,
	type ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE,
	type TMultiplyOptionEditSchema
} from "@/entities/tour";

export type TForm = TFormField<
	TTourEventMultiplyOptionEditPageKeys,
	ENUM_FORM_MULTIPLY_OPTION_TYPE
>;

export interface IMultiplyOptionSlotProps {
	form?: UseFormReturn<TMultiplyOptionEditSchema>;
	onSubmit?: () => Promise<void>;
	isLoading?: boolean;
}

export interface IMultiplyOptionEditTabs {
	label: TTourEventMultiplyOptionEditPageKeys;
	type: ENUM_MULTIPLY_OPTION_EDIT_TAB_TYPE;
	slot: FC<IMultiplyOptionSlotProps | any>;
	ns?: keyof TResources;
}
