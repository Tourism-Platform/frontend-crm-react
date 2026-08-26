import type { TTourEventGuideEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";
import type { IQueryTabSlotProps } from "@/shared/ui";

import {
	type ENUM_GUIDE_CATEGORY_ROW_FIELD_TYPE,
	type ENUM_GUIDE_PRICE_ROW_FIELD_TYPE,
	type ENUM_GUIDE_PRICING_FIELD_TYPE,
	ENUM_GUIDE_PRICING_TYPE,
	type ENUM_GUIDE_PRICING_TYPE_TYPE,
	type TGuideEditSchema
} from "@/entities/tour";

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TGuideEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
>;

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
