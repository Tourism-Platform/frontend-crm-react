import { UTC_OPTIONS } from "@/shared/config";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_TRANSPORTATION,
	TRANSFER_TYPE_LABELS
} from "@/entities/tour";

import { type TForm } from "../types";

export const TRANSPORTATION_DATA_LIST = (): TForm[] => [
	{
		label: "form.general.details.form.fields.transfer_type.label",
		placeholder:
			"form.general.details.form.fields.transfer_type.placeholder",
		key: ENUM_FORM_TRANSPORTATION.TRANSFER_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(TRANSFER_TYPE_LABELS),
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.meet_point.label",
		placeholder: "form.general.details.form.fields.meet_point.placeholder",
		key: ENUM_FORM_TRANSPORTATION.MEET_POINT,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.end_point.label",
		placeholder: "form.general.details.form.fields.end_point.placeholder",
		key: ENUM_FORM_TRANSPORTATION.END_POINT,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.departure_date.label",
		placeholder:
			"form.general.details.form.fields.departure_date.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.arrival_date.label",
		placeholder:
			"form.general.details.form.fields.arrival_date.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.arrival_time.label",
		placeholder:
			"form.general.details.form.fields.arrival_time.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.details.form.fields.arrival_timezone.label",
		placeholder:
			"form.general.details.form.fields.arrival_timezone.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	},
	{
		label: "form.general.details.form.fields.departure_time.label",
		placeholder:
			"form.general.details.form.fields.departure_time.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.details.form.fields.departure_timezone.label",
		placeholder:
			"form.general.details.form.fields.departure_timezone.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	}
];
