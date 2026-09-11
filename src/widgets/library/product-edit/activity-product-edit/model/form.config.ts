import { MapPin } from "lucide-react";

import { useValueToTranslateLabel } from "@/shared/utils";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ACTIVITY_SUB_TYPE_LABELS,
	ENUM_FORM_ACTIVITY_PRODUCT as ENUM_FORM
} from "@/entities/supplier";

import type { TForm } from "./form.types";

export const ACTIVITY_PRODUCT_NAME_FIELD: TForm = {
	key: ENUM_FORM.NAME,
	fieldType: "input",
	label: "form.general.fields.name.label",
	placeholder: "form.general.fields.name.placeholder",
	className: "md:col-span-2"
};

export const ACTIVITY_LOCATION_FIELD = (geo: TGeoFieldProps): TForm => ({
	key: ENUM_FORM.LOCATION,
	fieldType: "geo",
	icon: MapPin,
	label: "form.general.fields.location.label",
	placeholder: "form.general.fields.location.placeholder",
	emptyText: "form.general.fields.location.empty",
	className: "md:col-span-2",
	...geo
});

export const getActivitySubTypeField = (): TForm => ({
	key: ENUM_FORM.SUB_TYP,
	fieldType: "select",
	options: useValueToTranslateLabel(ACTIVITY_SUB_TYPE_LABELS),
	label: "form.general.fields.activity_subtype.label",
	placeholder: "form.general.fields.activity_subtype.placeholder"
});
