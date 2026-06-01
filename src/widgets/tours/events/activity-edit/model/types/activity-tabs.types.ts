import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TResources, TTourActivityEditPageKeys } from "@/shared/config";

import type { TActivityEditSchema } from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export const ENUM_ACTIVITY_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_ACTIVITY_EDIT_TAB_TYPE =
	(typeof ENUM_ACTIVITY_EDIT_TAB)[keyof typeof ENUM_ACTIVITY_EDIT_TAB];

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
