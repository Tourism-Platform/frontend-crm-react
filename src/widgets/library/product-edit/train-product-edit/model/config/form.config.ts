import { MapPin } from "lucide-react";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	ENUM_FORM_TRAIN_HOP as ENUM_HOP
} from "@/entities/supplier";

import type { TForm, THopForm } from "../types";

export const TRAIN_PRODUCT_NAME_FIELD: TForm = {
	key: ENUM_FORM.NAME,
	fieldType: "input",
	label: "form.general.fields.name.label",
	placeholder: "form.general.fields.name.placeholder"
};

type THopGeoProps = {
	departure: TGeoFieldProps;
	arrival: TGeoFieldProps;
};

export const TRAIN_HOP_FIELDS_LIST = ({
	departure,
	arrival
}: THopGeoProps): THopForm[] => [
	{
		key: ENUM_HOP.DEPARTURE_LOCATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.fields.hops.departure_station.label",
		placeholder: "form.general.fields.hops.departure_station.placeholder",
		emptyText: "form.general.fields.hops.departure_station.empty",
		...departure
	},
	{
		key: ENUM_HOP.ARRIVAL_LOCATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.fields.hops.arrival_station.label",
		placeholder: "form.general.fields.hops.arrival_station.placeholder",
		emptyText: "form.general.fields.hops.arrival_station.empty",
		...arrival
	}
];
