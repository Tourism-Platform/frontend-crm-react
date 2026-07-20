import type React from "react";

import type { TTourEventSupplementEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_SUPPLEMENT_PRICE_ROW_FIELD_TYPE,
	type ENUM_SUPPLEMENT_PRICING_FIELD_TYPE,
	ENUM_SUPPLEMENT_PRICING_INVOICING,
	type ENUM_SUPPLEMENT_PRICING_INVOICING_TYPE,
	ENUM_SUPPLEMENT_PRICING_TYPE,
	type ENUM_SUPPLEMENT_PRICING_TYPE_TYPE
} from "@/entities/tour";

export { ENUM_SUPPLEMENT_PRICING_INVOICING, ENUM_SUPPLEMENT_PRICING_TYPE };
export type {
	ENUM_SUPPLEMENT_PRICING_INVOICING_TYPE,
	ENUM_SUPPLEMENT_PRICING_TYPE_TYPE
};

export interface ISupplementPricingTab<TProps> {
	label: TTourEventSupplementEditPageKeys;
	type: ENUM_SUPPLEMENT_PRICING_INVOICING_TYPE;
	slot: React.ComponentType<TProps>;
}

export type TSupplementPricingFormField = TFormField<
	TTourEventSupplementEditPageKeys,
	ENUM_SUPPLEMENT_PRICING_FIELD_TYPE | ENUM_SUPPLEMENT_PRICE_ROW_FIELD_TYPE
>;

export interface ISupplementIndividualPricingTab {
	label: TTourEventSupplementEditPageKeys;
	type: ENUM_SUPPLEMENT_PRICING_TYPE_TYPE;
	priceDetailsList?: TSupplementPricingFormField[];
}
