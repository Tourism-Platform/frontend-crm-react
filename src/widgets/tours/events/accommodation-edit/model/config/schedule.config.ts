import { LENGTH_OF_STAY_OPTIONS, UTC_OPTIONS } from "@/shared/config";
import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_FORM_ACCOMMODATION } from "@/entities/tour";

import type { TForm } from "../types";

export const SCHEDULE_LIST = (
	timezoneOffset: string = getDeviceUtcOffset()
): TForm[] => [
	{
		label: "form.general.schedule.form.fields.length_of_stay.label",
		placeholder:
			"form.general.schedule.form.fields.length_of_stay.placeholder",
		key: ENUM_FORM_ACCOMMODATION.LENGTH_OF_STAY,
		fieldType: "select",
		options: LENGTH_OF_STAY_OPTIONS,
		className: "col-span-2"
	},
	{
		label: "form.general.schedule.form.fields.check_in_time.label",
		placeholder:
			"form.general.schedule.form.fields.check_in_time.placeholder",
		key: ENUM_FORM_ACCOMMODATION.CHECK_IN_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.schedule.form.fields.check_in_timezone.label",
		placeholder:
			"form.general.schedule.form.fields.check_in_timezone.placeholder",
		key: ENUM_FORM_ACCOMMODATION.CHECK_IN_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: timezoneOffset
	},
	{
		label: "form.general.schedule.form.fields.check_out_time.label",
		placeholder:
			"form.general.schedule.form.fields.check_out_time.placeholder",
		key: ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.schedule.form.fields.check_out_timezone.label",
		placeholder:
			"form.general.schedule.form.fields.check_out_timezone.placeholder",
		key: ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: timezoneOffset
	}
];
