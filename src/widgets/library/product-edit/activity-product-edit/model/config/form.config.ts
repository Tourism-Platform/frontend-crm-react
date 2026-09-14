import { MapPin } from "lucide-react";

import { useValueToTranslateLabel } from "@/shared/utils";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ACTIVITY_SUB_TYPE_LABELS,
	ENUM_FORM_ACTIVITY_PRODUCT as ENUM_FORM
} from "@/entities/supplier";

import type { TForm } from "../types";

export const ACTIVITY_PRODUCT_GENERAL_LIST = (geo: TGeoFieldProps): TForm[] => [
	{
		key: ENUM_FORM.NAME,
		fieldType: "input",
		label: "form.general.fields.name.label",
		placeholder: "form.general.fields.name.placeholder",
		className: "col-span-2"
	},
	{
		key: ENUM_FORM.LOCATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.fields.location.label",
		placeholder: "form.general.fields.location.placeholder",
		emptyText: "form.general.fields.location.empty",
		...geo
	},
	{
		key: ENUM_FORM.SUB_TYP,
		fieldType: "select",
		options: useValueToTranslateLabel(ACTIVITY_SUB_TYPE_LABELS),
		label: "form.general.fields.activity_subtype.label",
		placeholder: "form.general.fields.activity_subtype.placeholder"
	}
];
