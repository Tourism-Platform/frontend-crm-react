import { UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_TRANSPORTATION, type TFormTransportation } from "../types";

export const TRANSPORTATION_DATA_LIST: TFormTransportation[] = [
	{
		label: "general.transportation.form.fields.departure_location.label",
		placeholder:
			"general.transportation.form.fields.departure_location.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_LOCATION,
		fieldType: "input"
	},
	{
		label: "general.transportation.form.fields.arrival_location.label",
		placeholder:
			"general.transportation.form.fields.arrival_location.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_LOCATION,
		fieldType: "input"
	},

	{
		label: "general.transportation.form.fields.departure_date.label",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE,
		fieldType: "date"
	},
	{
		label: "general.transportation.form.fields.arrival_date.label",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE,
		fieldType: "date"
	}
];

export const TRANSPORTATION_TIME_LIST: TFormTransportation[] = [
	{
		label: "general.transportation.form.fields.arrival_time.label",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "general.transportation.form.fields.arrival_timezone.label",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value
	},
	{
		label: "general.transportation.form.fields.departure_time.label",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "general.transportation.form.fields.departure_timezone.label",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value
	}
];
