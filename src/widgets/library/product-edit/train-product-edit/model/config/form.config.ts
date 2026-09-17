import { MapPin } from "lucide-react";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	ENUM_FORM_TRAIN_HOP as ENUM_HOP
} from "@/entities/supplier";

import type { TForm } from "../types";

export const TRAIN_PRODUCT_NAME_FIELD: TForm[] = [
	{
		key: ENUM_FORM.NAME,
		fieldType: "input",
		label: "form.general.fields.name.label",
		placeholder: "form.general.fields.name.placeholder"
	}
];

type THopGeoProps = {
	departure: TGeoFieldProps;
	arrival: TGeoFieldProps;
};

export const TRAIN_DATA_LIST = ({
	departure,
	arrival
}: THopGeoProps): TForm[] => [
	{
		key: ENUM_HOP.DEPARTURE_STATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.flights.form.train.fields.departure_station.label",
		placeholder:
			"form.general.flights.form.train.fields.departure_station.placeholder",
		emptyText:
			"form.general.flights.form.train.fields.departure_station.empty",
		...departure
	},
	{
		key: ENUM_HOP.ARRIVAL_STATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.flights.form.train.fields.arrival_station.label",
		placeholder:
			"form.general.flights.form.train.fields.arrival_station.placeholder",
		emptyText:
			"form.general.flights.form.train.fields.arrival_station.empty",
		...arrival
	}
];
