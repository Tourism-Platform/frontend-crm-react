import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type {
	TResources,
	TTourEventTransportationEditPageKeys
} from "@/shared/config";

import type { TTransportationEditSchema } from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export const ENUM_TRANSPORTATION_EDIT_TAB = {
	GENERAL: "general",
	MEDIA: "media",
	PRICING: "pricing",
	CARS: "cars"
} as const;

export type ENUM_TRANSPORTATION_EDIT_TAB_TYPE =
	(typeof ENUM_TRANSPORTATION_EDIT_TAB)[keyof typeof ENUM_TRANSPORTATION_EDIT_TAB];

export interface ISlotProps {
	form: UseFormReturn<TTransportationEditSchema>;
	onSubmit: (data: any) => void;
	isLoading: boolean;
}

export interface ITransportationEditTabs {
	label: TTourEventTransportationEditPageKeys;
	type: ENUM_TRANSPORTATION_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}
