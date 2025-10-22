import { EVENT_SUBTYPE_OPTIONS, UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_EVENT, type TFormEvent } from "../types";

export const EVENT_DATA_LIST: TFormEvent[] = [
	{
		label: "general.events.form.fields.event_subtype.label",
		key: ENUM_FORM_EVENT.EVENT_SUBTYPE,
		options: EVENT_SUBTYPE_OPTIONS,
		defaultValue: EVENT_SUBTYPE_OPTIONS?.[0]?.value,
		fieldType: "select"
	},
	{
		label: "general.events.form.fields.location.label",
		placeholder: "general.events.form.fields.location.placeholder",
		key: ENUM_FORM_EVENT.LOCATION,
		fieldType: "input"
	},
	{
		label: "general.events.form.fields.event_start_time.label",
		key: ENUM_FORM_EVENT.EVENT_START_TIME,
		fieldType: "time"
	},
	{
		label: "general.events.form.fields.start_timezone.label",
		key: ENUM_FORM_EVENT.START_TIMEZONE,
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value,
		fieldType: "select"
	},
	{
		label: "general.events.form.fields.event_end_time.label",
		key: ENUM_FORM_EVENT.EVENT_END_TIME,
		fieldType: "time"
	},
	{
		label: "general.events.form.fields.end_timezone.label",
		key: ENUM_FORM_EVENT.END_TIMEZONE,
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value,
		fieldType: "select"
	},
	{
		label: "general.events.form.fields.description.label",
		placeholder: "general.events.form.fields.description.placeholder",
		key: ENUM_FORM_EVENT.DESCRIPTION,
		fieldType: "textarea"
	}
];
