import { z } from "zod";

import type { TTourEventTransportationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { GENERAL_INFO_SCHEMA } from "../config";

export type TForm = TFormField<
	TTourEventTransportationEditPageKeys,
	ENUM_FORM_TRANSPORTATION_TYPE
>;

export const ENUM_FORM_TRANSPORTATION = {
	TRANSFER_TYPE: "transfer_type",
	MEET_POINT: "meet_point",
	END_POINT: "end_point",
	DEPARTURE_DATE: "departure_date",
	ARRIVAL_DATE: "arrival_date",
	DEPARTURE_TIME: "departure_time",
	DEPARTURE_TIMEZONE: "departure_timezone",
	ARRIVAL_TIME: "arrival_time",
	ARRIVAL_TIMEZONE: "arrival_timezone",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_TRANSPORTATION_TYPE =
	(typeof ENUM_FORM_TRANSPORTATION)[keyof typeof ENUM_FORM_TRANSPORTATION];

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;
