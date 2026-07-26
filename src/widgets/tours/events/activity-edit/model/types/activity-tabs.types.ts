import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TResources, TTourActivityEditPageKeys } from "@/shared/config";

import {
	type ENUM_ACTIVITY_EDIT_TAB_TYPE,
	type TActivityEditSchema
} from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export interface IActivityEditTabs {
	label: TTourActivityEditPageKeys;
	type: ENUM_ACTIVITY_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}

export interface ISlotProps {
	form: UseFormReturn<TActivityEditSchema>;
	onSubmit: (data: any) => void;
	isLoading: boolean;
}
