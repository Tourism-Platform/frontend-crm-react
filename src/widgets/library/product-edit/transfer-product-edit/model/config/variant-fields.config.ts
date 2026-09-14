import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_TRANSFER_VARIANT as ENUM_FORM,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/supplier";

import type { TVariantForm } from "../types";

export const TRANSFER_VARIANT_FIELDS_LIST = (): TVariantForm[] => [
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
