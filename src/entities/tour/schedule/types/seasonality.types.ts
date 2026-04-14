import { z } from "zod";

import type { SEASONALITY_SCHEMA } from "../schema";

export const ENUM_FORM_SEASONALITY = {
	COMMISSION: "commission",
	VALID_FROM: "valid_from",
	VALID_UNTIL: "valid_until"
} as const;

export type ENUM_FORM_SEASONALITY_TYPE =
	(typeof ENUM_FORM_SEASONALITY)[keyof typeof ENUM_FORM_SEASONALITY];

export type TSeasonalitySchema = z.infer<typeof SEASONALITY_SCHEMA>;

export interface ISeasonality {
	id?: string;
	commission: number;
	from: Date;
	to: Date;
}
