import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TResources, TTourInformationEditPageKeys } from "@/shared/config";

import type { TInfoEditSchema } from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./information.types";

export const ENUM_INFORMATION_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media"
} as const;

export type ENUM_INFORMATION_EDIT_TAB_TYPE =
	(typeof ENUM_INFORMATION_EDIT_TAB)[keyof typeof ENUM_INFORMATION_EDIT_TAB];

export interface ISlotProps {
	form: UseFormReturn<TInfoEditSchema>;
	onSubmit: (data: any) => void;
	isLoading: boolean;
}
export interface IInformationEditTabs {
	label: TTourInformationEditPageKeys;
	type: ENUM_INFORMATION_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}
