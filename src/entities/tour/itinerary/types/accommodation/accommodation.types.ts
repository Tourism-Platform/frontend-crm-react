import { z } from "zod";

import type { ACCOMMODATION_EDIT_SCHEMA } from "../../schema";

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

export type ENUM_FORM_ACCOMMODATION_TYPE =
	(typeof ENUM_FORM_ACCOMMODATION)[keyof typeof ENUM_FORM_ACCOMMODATION];

export type TAccommodationEditSchema = z.infer<
	typeof ACCOMMODATION_EDIT_SCHEMA
>;
