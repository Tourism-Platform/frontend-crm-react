import type { z } from "zod";

import type { TOUR_OPTION_FORM_SCHEMA } from "../schema/tour-option-form.schema";

export const ENUM_FORM_TOUR_OPTION = {
	NAME: "name",
	DESCRIPTION: "description",
	LANGUAGES: "languages",
	MARKUP: "markup",
	MARKUP_CURRENCY: "markupCurrency"
} as const;

export type ENUM_FORM_TOUR_OPTION_TYPE =
	(typeof ENUM_FORM_TOUR_OPTION)[keyof typeof ENUM_FORM_TOUR_OPTION];

export type TTourOptionFormSchema = z.infer<typeof TOUR_OPTION_FORM_SCHEMA>;
