import { MapPin } from "lucide-react";

import { UTC_OPTIONS } from "@/shared/config";

import type { TGeoFieldProps } from "@/entities/geo";
import { ENUM_FORM_BUS } from "@/entities/tour";

import { type TForm } from "../types";

type TSegmentGeoProps = {
	departure: TGeoFieldProps;
	arrival: TGeoFieldProps;
};

export const BUS_DATA_LIST = ({
	departure,
	arrival
}: TSegmentGeoProps): TForm[] => [
	{
		label: "general.flights.form.bus.fields.bus_company.label",
		placeholder: "general.flights.form.bus.fields.bus_company.placeholder",
		key: ENUM_FORM_BUS.BUS_COMPANY,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.bus.fields.bus_number.label",
		placeholder: "general.flights.form.bus.fields.bus_number.placeholder",
		key: ENUM_FORM_BUS.BUS_NUMBER,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.bus.fields.departure_point.label",
		placeholder:
			"general.flights.form.bus.fields.departure_point.placeholder",
		emptyText: "general.flights.form.bus.fields.departure_point.empty",
		key: ENUM_FORM_BUS.DEPARTURE_POINT,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...departure
	},
	{
		label: "general.flights.form.bus.fields.arrival_point.label",
		placeholder:
			"general.flights.form.bus.fields.arrival_point.placeholder",
		emptyText: "general.flights.form.bus.fields.arrival_point.empty",
		key: ENUM_FORM_BUS.ARRIVAL_POINT,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...arrival
	},
	{
		label: "general.flights.form.bus.fields.departure_date.label",
		placeholder:
			"general.flights.form.bus.fields.departure_date.placeholder",
		key: ENUM_FORM_BUS.DEPARTURE_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.bus.fields.arrival_date.label",
		placeholder: "general.flights.form.bus.fields.arrival_date.placeholder",
		key: ENUM_FORM_BUS.ARRIVAL_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "general.flights.form.bus.fields.arrival_time.label",
		placeholder: "general.flights.form.bus.fields.arrival_time.placeholder",
		key: ENUM_FORM_BUS.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.bus.fields.arrival_timezone.label",
		placeholder:
			"general.flights.form.bus.fields.arrival_timezone.placeholder",
		key: ENUM_FORM_BUS.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	},
	{
		label: "general.flights.form.bus.fields.departure_time.label",
		placeholder:
			"general.flights.form.bus.fields.departure_time.placeholder",
		key: ENUM_FORM_BUS.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "general.flights.form.bus.fields.departure_timezone.label",
		placeholder:
			"general.flights.form.bus.fields.departure_timezone.placeholder",
		key: ENUM_FORM_BUS.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	}
];
