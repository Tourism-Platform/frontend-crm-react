import { z } from "zod";

import type { TTourEventFlightEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import { BASE_FLIGHT_SCHEMA } from "../schema";

import {
	ENUM_FORM_FLIGHT,
	type ENUM_FORM_FLIGHT_TYPE
} from "./form-enum.types";

export type TForm = TFormField<
	TTourEventFlightEditPageKeys,
	ENUM_FORM_FLIGHT_TYPE
>;

export { ENUM_FORM_FLIGHT, type ENUM_FORM_FLIGHT_TYPE };

export type TGeneralInfoSchema = z.infer<typeof BASE_FLIGHT_SCHEMA>;
