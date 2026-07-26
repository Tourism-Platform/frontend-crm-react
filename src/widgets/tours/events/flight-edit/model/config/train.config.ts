import { MapPin } from "lucide-react";

import { UTC_OPTIONS } from "@/shared/config";
import { getDeviceUtcOffset } from "@/shared/hooks";

import type { TGeoFieldProps } from "@/entities/geo";
import { ENUM_FORM_TRAIN } from "@/entities/tour";

import { type TForm } from "../types";

type TSegmentGeoProps = {
	departure: TGeoFieldProps;
	arrival: TGeoFieldProps;
	timezoneOffset?: string;
};

export const TRAIN_DATA_LIST = ({
	departure,
	arrival,
	timezoneOffset = getDeviceUtcOffset()
}: TSegmentGeoProps): TForm[] => [
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
		emptyText: "general.flights.form.train.fields.departure_station.empty",
		key: ENUM_FORM_TRAIN.DEPARTURE_STATION,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...departure
	},
	{
		label: "general.flights.form.train.fields.arrival_station.label",
		placeholder:
			"general.flights.form.train.fields.arrival_station.placeholder",
		emptyText: "general.flights.form.train.fields.arrival_station.empty",
		key: ENUM_FORM_TRAIN.ARRIVAL_STATION,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...arrival
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
		options: UTC_OPTIONS,
		defaultValue: timezoneOffset
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
		options: UTC_OPTIONS,
		defaultValue: timezoneOffset
	}
];
