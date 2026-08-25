import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import { HOTEL_ROOM_CHARGE_LABELS } from "@/entities/supplier";
import { ENUM_FLIGHT_PRICING_TYPE } from "@/entities/tour";

import {
	ENUM_FORM_OVERRIDE_PRODUCT,
	ENUM_OVERRIDE_CHARGE,
	type TOverrideProductForm
} from "../types";

const PRICING_TYPE_OPTIONS = [
	{
		value: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
		label: "override_product.dialog.fields.pricing_type.options.flat_rate"
	},
	{
		value: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
		label: "override_product.dialog.fields.pricing_type.options.per_person"
	}
];

export const FORM_OVERRIDE_PRICING_LIST: TOverrideProductForm[] = [
	{
		label: "override_product.dialog.fields.pricing_type.label",
		placeholder: "override_product.dialog.fields.pricing_type.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE,
		fieldType: "select",
		options: PRICING_TYPE_OPTIONS
	},
	{
		label: "override_product.dialog.fields.total_price.label",
		placeholder: "override_product.dialog.fields.total_price.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE,
		fieldType: "input",
		type: "number"
	},
	{
		label: "override_product.dialog.fields.currency.label",
		placeholder: "override_product.dialog.fields.currency.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];

export const FORM_OVERRIDE_HOUSING_CHARGE_LIST = (): TOverrideProductForm[] => [
	{
		label: "override_product.dialog.fields.charge_typ.label",
		placeholder: "override_product.dialog.fields.charge_typ.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP,
		fieldType: "select",
		options: useValueToTranslateLabel(HOTEL_ROOM_CHARGE_LABELS),
		defaultValue: ENUM_OVERRIDE_CHARGE.FIXED
	}
];
