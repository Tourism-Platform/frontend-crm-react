import { MapPin } from "lucide-react";

import { UTC_OPTIONS } from "@/shared/config";
import type { TFormGeo } from "@/shared/types";
import { useValueToTranslateLabel } from "@/shared/utils";

import { ACTIVITY_TYPE_LABELS, ENUM_FORM_ACTIVITY } from "@/entities/tour";

import type { TForm } from "../types";

export type TGeoFieldProps = Pick<
	TFormGeo,
	"options" | "onQueryChange" | "isLoading"
>;

export const EVENT_DATA_LIST = (geo: TGeoFieldProps): TForm[] => [
	{
		label: "form.general.details.form.fields.activity_subtype.label",
		placeholder:
			"form.general.details.form.fields.activity_subtype.placeholder",
		key: ENUM_FORM_ACTIVITY.ACTIVITY_SUBTYPE,
		options: useValueToTranslateLabel(ACTIVITY_TYPE_LABELS),
		fieldType: "select",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.location.label",
		placeholder: "form.general.details.form.fields.location.placeholder",
		emptyText: "form.general.details.form.fields.location.empty",
		key: ENUM_FORM_ACTIVITY.LOCATION,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...geo
	},
	{
		label: "form.general.details.form.fields.event_start_time.label",
		placeholder:
			"form.general.details.form.fields.event_start_time.placeholder",
		key: ENUM_FORM_ACTIVITY.ACTIVITY_START_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.details.form.fields.start_timezone.label",
		placeholder:
			"form.general.details.form.fields.start_timezone.placeholder",
		key: ENUM_FORM_ACTIVITY.ACTIVITY_START_TIMEZONE,
		options: UTC_OPTIONS,
		fieldType: "select"
	},
	{
		label: "form.general.details.form.fields.event_end_time.label",
		placeholder:
			"form.general.details.form.fields.event_end_time.placeholder",
		key: ENUM_FORM_ACTIVITY.ACTIVITY_END_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.details.form.fields.end_timezone.label",
		placeholder:
			"form.general.details.form.fields.end_timezone.placeholder",
		key: ENUM_FORM_ACTIVITY.ACTIVITY_END_TIMEZONE,
		options: UTC_OPTIONS,
		fieldType: "select"
	},
	{
		label: "form.general.description.label",
		placeholder: "form.general.description.placeholder",
		key: ENUM_FORM_ACTIVITY.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-4"
	}
];
