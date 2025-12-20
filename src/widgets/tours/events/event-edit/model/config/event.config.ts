import { EVENT_SUBTYPE_OPTIONS, UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_EVENT, type TForm } from "../types";

export const EVENT_DATA_LIST: TForm[] = [
	{
		label: "general.events.form.fields.event_subtype.label",
		placeholder: "general.events.form.fields.event_subtype.placeholder",
		key: ENUM_FORM_EVENT.EVENT_SUBTYPE,
		options: EVENT_SUBTYPE_OPTIONS,
		fieldType: "select",
		className: "col-span-2"
	},
	{
		label: "general.events.form.fields.location.label",
		placeholder: "general.events.form.fields.location.placeholder",
		key: ENUM_FORM_EVENT.LOCATION,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.events.form.fields.event_start_time.label",
		placeholder: "general.events.form.fields.event_start_time.placeholder",
		key: ENUM_FORM_EVENT.EVENT_START_TIME,
		fieldType: "time"
	},
	{
		label: "general.events.form.fields.start_timezone.label",
		placeholder: "general.events.form.fields.start_timezone.placeholder",
		key: ENUM_FORM_EVENT.START_TIMEZONE,
		options: UTC_OPTIONS,
		fieldType: "select"
	},
	{
		label: "general.events.form.fields.event_end_time.label",
		placeholder: "general.events.form.fields.event_end_time.placeholder",
		key: ENUM_FORM_EVENT.EVENT_END_TIME,
		fieldType: "time"
	},
	{
		label: "general.events.form.fields.end_timezone.label",
		placeholder: "general.events.form.fields.end_timezone.placeholder",
		key: ENUM_FORM_EVENT.END_TIMEZONE,
		options: UTC_OPTIONS,
		fieldType: "select"
	},
	{
		label: "general.events.form.fields.description.label",
		placeholder: "general.events.form.fields.description.placeholder",
		key: ENUM_FORM_EVENT.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-4"
	}
];
