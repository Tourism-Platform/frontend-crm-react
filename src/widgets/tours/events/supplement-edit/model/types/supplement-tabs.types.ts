import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type {
	TResources,
	TTourEventSupplementEditPageKeys
} from "@/shared/config";

import type { TSupplementEditSchema } from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export const ENUM_SUPPLEMENT_EDIT_TAB = {
	ITEMS: "items",
	MEDIA: "media",
	PRICING: "pricing"
} as const;

export type ENUM_SUPPLEMENT_EDIT_TAB_TYPE =
	(typeof ENUM_SUPPLEMENT_EDIT_TAB)[keyof typeof ENUM_SUPPLEMENT_EDIT_TAB];

export interface ISlotProps {
	form: UseFormReturn<TSupplementEditSchema>;
	onSubmit: (data: any) => void;
	isLoading: boolean;
}

export interface ISupplementEditTabs {
	label: TTourEventSupplementEditPageKeys;
	type: ENUM_SUPPLEMENT_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}
