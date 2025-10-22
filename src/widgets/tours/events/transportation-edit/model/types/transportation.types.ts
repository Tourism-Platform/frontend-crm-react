import { z } from "zod";

import type { TTourEventTransportationEditPageKeys } from "@/shared/config";
import type { CustomFieldVariant, SelectPickerOption } from "@/shared/ui";

import type { GENERAL_INFO_SCHEMA } from "../config";

interface IFormTransportationBase {
	label: TTourEventTransportationEditPageKeys;
	key: ENUM_FORM_TRANSPORTATION_TYPE;
}

type TFormTransportationBaseRequired = IFormTransportationBase & {
	fieldType: Exclude<CustomFieldVariant, "date" | "time" | "select">;
	placeholder: TTourEventTransportationEditPageKeys;
};

type TFormTransportationBaseOptional = IFormTransportationBase & {
	fieldType: "date" | "time";
	placeholder?: TTourEventTransportationEditPageKeys;
};
type TFormTransportationBaseSelect = IFormTransportationBase & {
	fieldType: "select";
	options: SelectPickerOption[];
	placeholder?: TTourEventTransportationEditPageKeys;
	defaultValue: string;
};

export type TFormTransportation =
	| TFormTransportationBaseRequired
	| TFormTransportationBaseOptional
	| TFormTransportationBaseSelect;

export const ENUM_FORM_TRANSPORTATION = {
	DEPARTURE_LOCATION: "departure_location",
	ARRIVAL_LOCATION: "arrival_location",
	DEPARTURE_DATE: "departure_date",
	ARRIVAL_DATE: "arrival_date",
	DEPARTURE_TIME: "departure_time",
	DEPARTURE_TIMEZONE: "departure_timezone",
	ARRIVAL_TIME: "arrival_time",
	ARRIVAL_TIMEZONE: "arrival_timezone",
	DEPARTURE_TERMINAL: "departure_terminal",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_TRANSPORTATION_TYPE =
	(typeof ENUM_FORM_TRANSPORTATION)[keyof typeof ENUM_FORM_TRANSPORTATION];

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;
