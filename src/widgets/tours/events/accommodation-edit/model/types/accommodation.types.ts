import { z } from "zod";

import type { TTourAccommodationEditPageKeys } from "@/shared/config";
import type { CustomFieldVariant, SelectPickerOption } from "@/shared/ui";

import type { GENERAL_INFO_SCHEMA, ROOMS_SCHEMA } from "../config";

interface IFormAccommodationBase {
	label: TTourAccommodationEditPageKeys;
	key: ENUM_FORM_ACCOMMODATION_TYPE | ENUM_FORM_ROOM_TYPE;
}

type TFormAccommodationBaseRequired = IFormAccommodationBase & {
	fieldType: Exclude<CustomFieldVariant, "date" | "time" | "select">;
	placeholder: TTourAccommodationEditPageKeys;
};

type TFormAccommodationBaseOptional = IFormAccommodationBase & {
	fieldType: "date" | "time";
	placeholder?: TTourAccommodationEditPageKeys;
};
type TFormAccommodationBaseSelect = IFormAccommodationBase & {
	fieldType: "select";
	options: SelectPickerOption[];
	placeholder?: TTourAccommodationEditPageKeys;
	defaultValue?: string;
};

export type TFormAccommodation =
	| TFormAccommodationBaseRequired
	| TFormAccommodationBaseOptional
	| TFormAccommodationBaseSelect;

export const ENUM_FORM_ACCOMMODATION = {
	PROPERTY: "property",
	AMENITIES: "amenities",
	DESCRIPTION: "description",
	LENGTH_OF_STAY: "length_of_stay",
	CHECK_IN_TIME: "check_in_time",
	CHECK_IN_TIMEZONE: "check_in_timezone",
	CHECK_OUT_TIME: "check_out_time",
	CHECK_OUT_TIMEZONE: "check_out_timezone"
} as const;

export const ENUM_FORM_ROOM = {
	NAME: "name",
	DETAILS: "details"
} as const;

export type ENUM_FORM_ACCOMMODATION_TYPE =
	(typeof ENUM_FORM_ACCOMMODATION)[keyof typeof ENUM_FORM_ACCOMMODATION];

export type ENUM_FORM_ROOM_TYPE =
	(typeof ENUM_FORM_ROOM)[keyof typeof ENUM_FORM_ROOM];

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;

export type TRoomsSchema = z.infer<typeof ROOMS_SCHEMA>;
