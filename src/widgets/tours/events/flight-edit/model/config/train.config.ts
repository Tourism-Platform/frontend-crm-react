import { UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_FLIGHT, type TForm } from "../types";

export const TRAIN_DATA_LIST: TForm[] = [
	{
		label: "general.flights.form.train.fields.airline_code.label",
		placeholder:
			"general.flights.form.train.fields.airline_code.placeholder",
		key: ENUM_FORM_FLIGHT.AIRLINE_CODE,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.flight_number.label",
		placeholder:
			"general.flights.form.train.fields.flight_number.placeholder",
		key: ENUM_FORM_FLIGHT.FLIGHT_NUMBER,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.departure_airport_code.label",
		placeholder:
			"general.flights.form.train.fields.departure_airport_code.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.arrival_airport_code.label",
		placeholder:
			"general.flights.form.train.fields.arrival_airport_code.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.departure_date.label",
		placeholder:
			"general.flights.form.train.fields.departure_date.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.arrival_date.label",
		placeholder:
			"general.flights.form.train.fields.arrival_date.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.train.fields.arrival_time.label",
		placeholder:
			"general.flights.form.train.fields.arrival_time.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.train.fields.arrival_timezone.label",
		placeholder:
			"general.flights.form.train.fields.arrival_timezone.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	},
	{
		label: "general.flights.form.train.fields.departure_time.label",
		placeholder:
			"general.flights.form.train.fields.departure_time.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.train.fields.departure_timezone.label",
		placeholder:
			"general.flights.form.train.fields.departure_timezone.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	}
];
