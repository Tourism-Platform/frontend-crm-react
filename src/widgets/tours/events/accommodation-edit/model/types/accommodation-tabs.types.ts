import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type {
	TResources,
	TTourAccommodationEditPageKeys
} from "@/shared/config";

import type { TAccommodationEditSchema } from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export const ENUM_ACCOMMODATION_EDIT_TAB = {
	GENERAL: "general",
	ROOMS: "rooms",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_ACCOMMODATION_EDIT_TAB_TYPE =
	(typeof ENUM_ACCOMMODATION_EDIT_TAB)[keyof typeof ENUM_ACCOMMODATION_EDIT_TAB];

export interface ISlotProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	onSubmit: (data: any) => void;
	isLoading: boolean;
}

export interface IAccommodationEditTabs {
	label: TTourAccommodationEditPageKeys;
	type: ENUM_ACCOMMODATION_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}
