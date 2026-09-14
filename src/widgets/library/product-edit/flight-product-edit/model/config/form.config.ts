import { MapPin } from "lucide-react";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ENUM_FORM_FLIGHT_PRODUCT as ENUM_FORM,
	ENUM_FORM_FLIGHT_HOP as ENUM_HOP
} from "@/entities/supplier";

import type { TForm, THopForm } from "../types";

export const FLIGHT_PRODUCT_NAME_FIELD: TForm = {
	key: ENUM_FORM.NAME,
	fieldType: "input",
	label: "form.general.fields.name.label",
	placeholder: "form.general.fields.name.placeholder"
};

type THopGeoProps = {
	departure: TGeoFieldProps;
	arrival: TGeoFieldProps;
};

export const FLIGHT_HOP_FIELDS_LIST = ({
	departure,
	arrival
}: THopGeoProps): THopForm[] => [
	{
		key: ENUM_HOP.AIRLINE_CODE,
		fieldType: "input",
		label: "form.general.fields.hops.airline_code.label",
		placeholder: "form.general.fields.hops.airline_code.placeholder"
	},
	{
		key: ENUM_HOP.FLIGHT_NUMBER,
		fieldType: "input",
		label: "form.general.fields.hops.flight_number.label",
		placeholder: "form.general.fields.hops.flight_number.placeholder"
	},
	{
		key: ENUM_HOP.DEPARTURE_AIRPORT_CODE,
		fieldType: "input",
		label: "form.general.fields.hops.departure_airport_code.label",
		placeholder:
			"form.general.fields.hops.departure_airport_code.placeholder"
	},
	{
		key: ENUM_HOP.ARRIVAL_AIRPORT_CODE,
		fieldType: "input",
		label: "form.general.fields.hops.arrival_airport_code.label",
		placeholder: "form.general.fields.hops.arrival_airport_code.placeholder"
	},
	{
		key: ENUM_HOP.DEPARTURE_LOCATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.fields.hops.departure_location.label",
		placeholder: "form.general.fields.hops.departure_location.placeholder",
		emptyText: "form.general.fields.hops.departure_location.empty",
		...departure
	},
	{
		key: ENUM_HOP.ARRIVAL_LOCATION,
		fieldType: "geo",
		icon: MapPin,
		label: "form.general.fields.hops.arrival_location.label",
		placeholder: "form.general.fields.hops.arrival_location.placeholder",
		emptyText: "form.general.fields.hops.arrival_location.empty",
		...arrival
	},
	{
		key: ENUM_HOP.DEPARTURE_TERMINAL,
		fieldType: "input",
		label: "form.general.fields.hops.departure_terminal.label",
		placeholder: "form.general.fields.hops.departure_terminal.placeholder"
	},
	{
		key: ENUM_HOP.DEPARTURE_GATE,
		fieldType: "input",
		label: "form.general.fields.hops.departure_gate.label",
		placeholder: "form.general.fields.hops.departure_gate.placeholder"
	}
];
