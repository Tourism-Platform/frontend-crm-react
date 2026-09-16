import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import {
	ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_TRAIN_VARIANT_CHARGE,
	TRAIN_VARIANT_CHARGE_LABELS
} from "@/entities/supplier";

import type { TTrainProductPricingFormField } from "../types";

export const PER_FARE_ROW_FIELDS_LIST = (): TTrainProductPricingFormField[] => [
	{
		key: ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP,
		label: "form.pricing.form.per_fare.fields.charge_typ.label",
		placeholder: "form.pricing.form.per_fare.fields.charge_typ.placeholder",
		fieldType: "select",
		options: useValueToTranslateLabel(TRAIN_VARIANT_CHARGE_LABELS),
		defaultValue: ENUM_TRAIN_VARIANT_CHARGE.FIXED
	},
	{
		key: ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_fare.fields.total_cost.label",
		placeholder: "form.pricing.form.per_fare.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: DEFAULT_EVENT_CURRENCY
	}
];
