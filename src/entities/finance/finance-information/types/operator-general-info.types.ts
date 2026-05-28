import { z } from "zod";

import type { OPERATOR_GENERAL_INFO_SCHEMA } from "../schema";

export const ENUM_FORM_OPERATOR_GENERAL_INFO = {
	TOUR_MARGIN: "tourMargin",
	STAFF_PAYOUTS: "staffPayouts"
} as const;

export type ENUM_FORM_OPERATOR_GENERAL_INFO_TYPE =
	(typeof ENUM_FORM_OPERATOR_GENERAL_INFO)[keyof typeof ENUM_FORM_OPERATOR_GENERAL_INFO];

export type TOperatorGeneralInfoSchema = z.infer<
	typeof OPERATOR_GENERAL_INFO_SCHEMA
>;
