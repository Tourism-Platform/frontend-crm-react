import type { TTourCommonEventsKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";
import type {
	ENUM_FLIGHT_PRICING_TYPE_TYPE,
	IFeeFormRow
} from "@/entities/tour";

export const ENUM_OVERRIDE_CHARGE = {
	FIXED: "fixed",
	PER_DURATION: "per_duration"
} as const;

export type ENUM_OVERRIDE_CHARGE_TYPE =
	(typeof ENUM_OVERRIDE_CHARGE)[keyof typeof ENUM_OVERRIDE_CHARGE];

export const ENUM_FORM_OVERRIDE_PRODUCT = {
	PRICING_TYPE: "pricing_type",
	CHARGE_TYP: "charge_typ",
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency",
	CHECK_IN_FROM: "check_in_from",
	CHECK_OUT_UNTIL: "check_out_until"
} as const;

export type ENUM_FORM_OVERRIDE_PRODUCT_TYPE =
	(typeof ENUM_FORM_OVERRIDE_PRODUCT)[keyof typeof ENUM_FORM_OVERRIDE_PRODUCT];

export type TOverrideProductForm = TFormField<
	TTourCommonEventsKeys,
	ENUM_FORM_OVERRIDE_PRODUCT_TYPE
>;

export type TOverrideProductFormValues = {
	[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]: ENUM_FLIGHT_PRICING_TYPE_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP]: ENUM_OVERRIDE_CHARGE_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]: number | null;
	[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: IFeeFormRow[];
	[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM]: string;
	[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL]: string;
};
