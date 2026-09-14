import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_TRAIN_VARIANT as ENUM_FORM,
	TRAIN_VARIANT_CHARGE_LABELS
} from "@/entities/supplier";

import type { TVariantForm } from "../types";

export const TRAIN_VARIANT_FIELDS_LIST = (): TVariantForm[] => [
	{
		key: ENUM_FORM.NAME,
		fieldType: "input",
		label: "form.variants.fields.name.label",
		placeholder: "form.variants.fields.name.placeholder",
		className: "md:col-span-3"
	},
	{
		key: ENUM_FORM.CHARGE_TYP,
		fieldType: "select",
		options: useValueToTranslateLabel(TRAIN_VARIANT_CHARGE_LABELS),
		label: "form.variants.fields.charge_typ.label",
		placeholder: "form.variants.fields.charge_typ.placeholder"
	},
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
