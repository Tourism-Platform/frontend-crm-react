import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TResources, TTourEventFlightEditPageKeys } from "@/shared/config";

import {
	type ENUM_FLIGHT_EDIT_TAB_TYPE,
	type TFlightEditSchema
} from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export interface ISlotProps {
	form: UseFormReturn<TFlightEditSchema>;
	onSubmit: () => void | Promise<void>;
	isLoading: boolean;
}

export interface IFlightEditTabs {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_FLIGHT_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}
