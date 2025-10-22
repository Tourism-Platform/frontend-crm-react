import { LENGTH_OF_STAY_OPTIONS, UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_ACCOMMODATION, type TForm } from "../types";

export const SCHEDULE_LIST: TForm[] = [
	{
		label: "general.schedule.form.fields.length_of_stay.label",
		placeholder: "general.schedule.form.fields.length_of_stay.placeholder",
		key: ENUM_FORM_ACCOMMODATION.LENGTH_OF_STAY,
		fieldType: "select",
		options: LENGTH_OF_STAY_OPTIONS
	},
	{
		label: "general.schedule.form.fields.check_in_time.label",
		placeholder: "general.schedule.form.fields.check_in_time.placeholder",
		key: ENUM_FORM_ACCOMMODATION.CHECK_IN_TIME,
		fieldType: "input"
	},
	{
		label: "general.schedule.form.fields.check_in_timezone.label",
		key: ENUM_FORM_ACCOMMODATION.CHECK_IN_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value
	},
	{
		label: "general.schedule.form.fields.check_out_time.label",
		placeholder: "general.schedule.form.fields.check_out_time.placeholder",
		key: ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIME,
		fieldType: "input"
	},
	{
		label: "general.schedule.form.fields.check_out_timezone.label",
		key: ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value
	}
];
