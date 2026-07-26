import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TResources, TTourEventGuideEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_GUIDE_CATEGORY_ROW_FIELD_TYPE,
	type ENUM_GUIDE_EDIT_TAB_TYPE,
	type ENUM_GUIDE_PRICE_ROW_FIELD_TYPE,
	type ENUM_GUIDE_PRICING_FIELD_TYPE,
	ENUM_GUIDE_PRICING_TYPE,
	type ENUM_GUIDE_PRICING_TYPE_TYPE,
	type TGuideEditSchema
} from "@/entities/tour";

import type { ENUM_FORM_SECTION_TYPE } from "./form-section.types";

export interface ISlotProps {
	form: UseFormReturn<TGuideEditSchema>;
	onSubmit: (data: any) => void;
	isLoading: boolean;
}

export interface IGuideEditTabs {
	label: TTourEventGuideEditPageKeys;
	type: ENUM_GUIDE_EDIT_TAB_TYPE;
	slot: FC<ISlotProps | any>;
	section?: ENUM_FORM_SECTION_TYPE;
	ns?: keyof TResources;
}

export type TGuidePricingFormField = TFormField<
	TTourEventGuideEditPageKeys,
	| ENUM_GUIDE_PRICING_FIELD_TYPE
	| ENUM_GUIDE_PRICE_ROW_FIELD_TYPE
	| ENUM_GUIDE_CATEGORY_ROW_FIELD_TYPE
>;

export interface IGuideIndividualPricingTab {
	label: TTourEventGuideEditPageKeys;
	type: ENUM_GUIDE_PRICING_TYPE_TYPE;
	priceDetailsList?: TGuidePricingFormField[];
}

export { ENUM_GUIDE_PRICING_TYPE };
