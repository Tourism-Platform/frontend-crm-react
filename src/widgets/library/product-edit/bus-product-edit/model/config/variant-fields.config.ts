import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_BUS_VARIANT as ENUM_FORM,
	ENUM_FORM_BUS_PRICING as ENUM_PRICING,
	FLIGHT_VARIANT_CHARGE_LABELS,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/supplier";

import type { TPricingForm, TVariantForm } from "../types";

export const BUS_VARIANT_DESC_FIELDS_LIST = (): TVariantForm[] => [
	{
		key: ENUM_FORM.NAME,
		fieldType: "input",
		label: "form.variants.fields.name.label",
		placeholder: "form.variants.fields.name.placeholder",
		className: "md:col-span-2"
	},
	{
		key: ENUM_FORM.BODY_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(VEHICLE_BODY_TYPE_LABELS),
		label: "form.variants.fields.body_type.label",
		placeholder: "form.variants.fields.body_type.placeholder"
	},
	{
		key: ENUM_FORM.PAX,
		fieldType: "input",
		type: "number",
		min: 1,
		step: "1",
		label: "form.variants.fields.pax.label",
		placeholder: "form.variants.fields.pax.placeholder"
	},
	{
		key: ENUM_FORM.DESCRIPTION,
		fieldType: "textarea",
		label: "form.variants.fields.description.label",
		placeholder: "form.variants.fields.description.placeholder",
		className: "md:col-span-2"
	}
];

export const BUS_VARIANT_PRICING_FIELDS_LIST = (): TVariantForm[] => [
	{
		key: ENUM_FORM.COST,
		fieldType: "input",
		type: "number",
		min: 0,
		step: "any",
		label: "form.variants.fields.cost.label",
		placeholder: "form.variants.fields.cost.placeholder"
	},
	{
		key: ENUM_FORM.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		label: "form.variants.fields.currency.label",
		placeholder: "form.variants.fields.currency.placeholder"
	}
];

export const BUS_PRODUCT_CHARGE_FIELDS_LIST = (): TPricingForm[] => [
	{
		key: ENUM_PRICING.CHARGE_TYP,
		fieldType: "select",
		options: useValueToTranslateLabel(FLIGHT_VARIANT_CHARGE_LABELS),
		label: "form.variants.fields.charge_typ.label",
		placeholder: "form.variants.fields.charge_typ.placeholder"
	},
	{
		key: ENUM_PRICING.COST,
		fieldType: "input",
		type: "number",
		min: 0,
		step: "any",
		label: "form.variants.fields.cost.label",
		placeholder: "form.variants.fields.cost.placeholder"
	},
	{
		key: ENUM_PRICING.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		label: "form.variants.fields.currency.label",
		placeholder: "form.variants.fields.currency.placeholder"
	}
];
