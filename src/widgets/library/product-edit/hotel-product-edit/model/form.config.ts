import { MapPin } from "lucide-react";

import { useValueToTranslateLabel } from "@/shared/utils";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ENUM_FORM_HOTEL_PRODUCT as ENUM_FORM,
	HOTEL_AMENITY_LABELS
} from "@/entities/supplier";

import type { TForm } from "./form.types";

export const HOTEL_PRODUCT_GENERAL_NAME_FIELD: TForm = {
	key: ENUM_FORM.NAME,
	fieldType: "input",
	label: "form.general.fields.name.label",
	placeholder: "form.general.fields.name.placeholder",
	className: "md:col-span-2"
};

export const LOCATION_FIELD = (geo: TGeoFieldProps): TForm => ({
	key: ENUM_FORM.LOCATION,
	fieldType: "geo",
	icon: MapPin,
	label: "form.general.fields.location.label",
	placeholder: "form.general.fields.location.placeholder",
	emptyText: "form.general.fields.location.empty",
	className: "md:col-span-2",
	...geo
});

export const FORM_HOTEL_PRODUCT_GENERAL_LIST = (): TForm[] => [
	{
		key: ENUM_FORM.STARS,
		fieldType: "input",
		type: "number",
		min: 1,
		max: 5,
		label: "form.general.fields.stars.label",
		placeholder: "form.general.fields.stars.placeholder"
	},
	{
		key: ENUM_FORM.AMENITIES,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(HOTEL_AMENITY_LABELS),
		badgeVariant: "secondary",
		label: "form.general.fields.amenities.label",
		placeholder: "form.general.fields.amenities.placeholder",
		className: "md:col-span-2"
	},
	{
		key: ENUM_FORM.CHECK_IN_FROM,
		fieldType: "time",
		label: "form.general.fields.check_in_from.label",
		placeholder: "form.general.fields.check_in_from.placeholder"
	},
	{
		key: ENUM_FORM.CHECK_OUT_UNTIL,
		fieldType: "time",
		label: "form.general.fields.check_out_until.label",
		placeholder: "form.general.fields.check_out_until.placeholder"
	}
];
