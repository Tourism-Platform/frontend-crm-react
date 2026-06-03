import { z } from "zod";

import { type TTourItineraryPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_TOUR_OPTION } from "../types/tour-option-form.types";

const msg = i18nKey<TTourItineraryPageKeys>();

export const TOUR_OPTION_FORM_SCHEMA = z.object({
	[ENUM_FORM_TOUR_OPTION.NAME]: z
		.string({
			message: msg("option.form.modal.fields.name.errors.required")
		})
		.min(1, msg("option.form.modal.fields.name.errors.required"))
		.max(200, msg("option.form.modal.fields.name.errors.max")),
	[ENUM_FORM_TOUR_OPTION.DESCRIPTION]: z.string().max(2000).optional()
});

export type TTourOptionFormSchema = z.infer<typeof TOUR_OPTION_FORM_SCHEMA>;
