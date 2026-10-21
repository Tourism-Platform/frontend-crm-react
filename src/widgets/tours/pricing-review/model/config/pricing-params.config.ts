import type { TTourPricingReviewPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_PRICING_BREAKDOWN_PARAM,
	type ENUM_PRICING_BREAKDOWN_PARAM_TYPE
} from "@/entities/tour";

export const PRICING_PARAMS_LIST: TFormField<
	TTourPricingReviewPageKeys,
	ENUM_PRICING_BREAKDOWN_PARAM_TYPE
>[] = [
	{
		key: ENUM_PRICING_BREAKDOWN_PARAM.DATE,
		label: "params.date.label",
		fieldType: "date"
	},
	{
		key: ENUM_PRICING_BREAKDOWN_PARAM.PAX,
		label: "params.pax.label",
		placeholder: "params.pax.placeholder",
		fieldType: "input",
		type: "number",
		min: 1
	},
	{
		key: ENUM_PRICING_BREAKDOWN_PARAM.AS_OF,
		label: "params.as_of.label",
		fieldType: "date"
	}
];
