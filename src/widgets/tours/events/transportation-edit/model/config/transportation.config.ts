import { TRANSFER_TYPE_OPTIONS, UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_TRANSPORTATION, type TForm } from "../types";

export const TRANSPORTATION_DATA_LIST: TForm[] = [
	{
		label: "general.details.form.fields.transfer_type.label",
		placeholder: "general.details.form.fields.transfer_type.placeholder",
		key: ENUM_FORM_TRANSPORTATION.TRANSFER_TYPE,
		fieldType: "select",
		options: TRANSFER_TYPE_OPTIONS,
		className: "col-span-2"
	},
	{
		label: "general.details.form.fields.meet_point.label",
		placeholder: "general.details.form.fields.meet_point.placeholder",
		key: ENUM_FORM_TRANSPORTATION.MEET_POINT,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.details.form.fields.end_point.label",
		placeholder: "general.details.form.fields.end_point.placeholder",
		key: ENUM_FORM_TRANSPORTATION.END_POINT,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.details.form.fields.departure_date.label",
		placeholder: "general.details.form.fields.departure_date.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.details.form.fields.arrival_date.label",
		placeholder: "general.details.form.fields.arrival_date.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.details.form.fields.arrival_time.label",
		placeholder: "general.details.form.fields.arrival_time.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "general.details.form.fields.arrival_timezone.label",
		placeholder: "general.details.form.fields.arrival_timezone.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	},
	{
		label: "general.details.form.fields.departure_time.label",
		placeholder: "general.details.form.fields.departure_time.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "general.details.form.fields.departure_timezone.label",
		placeholder:
			"general.details.form.fields.departure_timezone.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	}
];
