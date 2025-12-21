import { z } from "zod";

import type { TTourDetailsEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { GENERAL_INFO_SCHEMA } from "../schema";

export type TForm = TFormField<
	TTourDetailsEditPageKeys,
	ENUM_FORM_TOUR_DETAILS_TYPE
>;

export const ENUM_FORM_TOUR_DETAILS = {
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_TOUR_DETAILS_TYPE =
	(typeof ENUM_FORM_TOUR_DETAILS)[keyof typeof ENUM_FORM_TOUR_DETAILS];

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;
