import { MapPin } from "lucide-react";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	ENUM_FORM_TRAIN_HOP as ENUM_HOP
} from "@/entities/supplier";

import type { TForm, THopForm } from "./form.types";

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
		label: "form.general.fields.hops.departureLocation.label",
		placeholder: "form.general.fields.hops.departureLocation.placeholder",
		emptyText: "form.general.fields.hops.departureLocation.empty",
		...departure
	},
	{
		key: ENUM_HOP.ARRIVAL_LOCATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.fields.hops.arrivalLocation.label",
		placeholder: "form.general.fields.hops.arrivalLocation.placeholder",
		emptyText: "form.general.fields.hops.arrivalLocation.empty",
		...arrival
	},
	{
		key: ENUM_HOP.DEPARTURE_TIME,
		fieldType: "time",
		label: "form.general.fields.hops.departureTime.label"
	},
	{
		key: ENUM_HOP.ARRIVAL_TIME,
		fieldType: "time",
		label: "form.general.fields.hops.arrivalTime.label"
	}
];
