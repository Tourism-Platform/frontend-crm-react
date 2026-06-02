import { UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_TRAIN } from "@/entities/tour";

import { type TForm } from "../types";

export const TRAIN_DATA_LIST: TForm[] = [
	{
		label: "general.flights.form.train.fields.carrier.label",
		placeholder: "general.flights.form.train.fields.carrier.placeholder",
		key: ENUM_FORM_TRAIN.CARRIER,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.train_number.label",
		placeholder:
			"general.flights.form.train.fields.train_number.placeholder",
		key: ENUM_FORM_TRAIN.TRAIN_NUMBER,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.departure_station.label",
		placeholder:
			"general.flights.form.train.fields.departure_station.placeholder",
		key: ENUM_FORM_TRAIN.DEPARTURE_STATION,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.arrival_station.label",
		placeholder:
			"general.flights.form.train.fields.arrival_station.placeholder",
		key: ENUM_FORM_TRAIN.ARRIVAL_STATION,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.departure_date.label",
		placeholder:
			"general.flights.form.train.fields.departure_date.placeholder",
		key: ENUM_FORM_TRAIN.DEPARTURE_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.arrival_date.label",
		placeholder:
			"general.flights.form.train.fields.arrival_date.placeholder",
		key: ENUM_FORM_TRAIN.ARRIVAL_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.arrival_time.label",
		placeholder:
			"general.flights.form.train.fields.arrival_time.placeholder",
		key: ENUM_FORM_TRAIN.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.train.fields.arrival_timezone.label",
		placeholder:
			"general.flights.form.train.fields.arrival_timezone.placeholder",
		key: ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	},
	{
		label: "general.flights.form.train.fields.departure_time.label",
		placeholder:
			"general.flights.form.train.fields.departure_time.placeholder",
		key: ENUM_FORM_TRAIN.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.train.fields.departure_timezone.label",
		placeholder:
			"general.flights.form.train.fields.departure_timezone.placeholder",
		key: ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	}
];
