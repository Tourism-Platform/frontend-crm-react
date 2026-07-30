import { UTC_OPTIONS } from "@/shared/config";
import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_FORM_INFORMATION } from "@/entities/tour";

import { type TForm } from "../types";

export const INFORMATION_DATA_LIST = (
	timezoneOffset: string = getDeviceUtcOffset()
): TForm[] => [
	{
		label: "form.general.info.form.fields.event_start_time.label",
		placeholder:
			"form.general.info.form.fields.event_start_time.placeholder",
		key: ENUM_FORM_INFORMATION.INFO_START_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.info.form.fields.start_timezone.label",
		placeholder: "form.general.info.form.fields.start_timezone.placeholder",
		key: ENUM_FORM_INFORMATION.INFO_START_TIMEZONE,
		options: UTC_OPTIONS,
		fieldType: "select",
		defaultValue: timezoneOffset
	},
	{
		label: "form.general.info.form.fields.event_end_time.label",
		placeholder: "form.general.info.form.fields.event_end_time.placeholder",
		key: ENUM_FORM_INFORMATION.INFO_END_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.info.form.fields.end_timezone.label",
		placeholder: "form.general.info.form.fields.end_timezone.placeholder",
		key: ENUM_FORM_INFORMATION.INFO_END_TIMEZONE,
		options: UTC_OPTIONS,
		fieldType: "select",
		defaultValue: timezoneOffset
	},
	{
		label: "form.general.info.form.fields.description.label",
		placeholder: "form.general.info.form.fields.description.placeholder",
		key: ENUM_FORM_INFORMATION.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-4"
	}
];
