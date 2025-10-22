import { UTC_OPTIONS } from "@/shared/config";

import { ENUM_FORM_FLIGHT, type TForm } from "../types";

export const FLIGHT_DATA_LIST: TForm[] = [
	{
		label: "general.flights.form.fields.airline_code.label",
		placeholder: "general.flights.form.fields.airline_code.placeholder",
		key: ENUM_FORM_FLIGHT.AIRLINE_CODE,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.flight_number.label",
		placeholder: "general.flights.form.fields.flight_number.placeholder",
		key: ENUM_FORM_FLIGHT.FLIGHT_NUMBER,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.departure_airport_code.label",
		placeholder:
			"general.flights.form.fields.departure_airport_code.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.arrival_airport_code.label",
		placeholder:
			"general.flights.form.fields.arrival_airport_code.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.departure_date.label",
		key: ENUM_FORM_FLIGHT.DEPARTURE_DATE,
		fieldType: "date"
	},
	{
		label: "general.flights.form.fields.arrival_date.label",
		key: ENUM_FORM_FLIGHT.ARRIVAL_DATE,
		fieldType: "date"
	}
];

export const FLIGHT_AIRPORT_LIST: TForm[] = [
	{
		label: "general.flights.form.fields.arrival_time.label",
		key: ENUM_FORM_FLIGHT.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.fields.arrival_timezone.label",
		key: ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value
	},
	{
		label: "general.flights.form.fields.departure_time.label",
		key: ENUM_FORM_FLIGHT.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.fields.departure_timezone.label",
		key: ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS,
		defaultValue: UTC_OPTIONS?.[13]?.value
	},
	{
		label: "general.flights.form.fields.departure_terminal.label",
		placeholder:
			"general.flights.form.fields.departure_terminal.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.departure_gate.label",
		placeholder: "general.flights.form.fields.departure_gate.placeholder",
		key: ENUM_FORM_FLIGHT.DEPARTURE_GATE,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.arrival_terminal.label",
		placeholder: "general.flights.form.fields.arrival_terminal.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL,
		fieldType: "input"
	},
	{
		label: "general.flights.form.fields.arrival_gate.label",
		placeholder: "general.flights.form.fields.arrival_gate.placeholder",
		key: ENUM_FORM_FLIGHT.ARRIVAL_GATE,
		fieldType: "input"
	}
];
