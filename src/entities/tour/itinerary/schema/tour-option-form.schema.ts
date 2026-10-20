import { z } from "zod";

import { type TTourItineraryPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_LANGUAGES } from "../../landing/types";
import { ENUM_PACKAGE_MARKUP_TYP } from "../types/package.types";
import { ENUM_FORM_TOUR_OPTION } from "../types/tour-option-form.types";

const msg = i18nKey<TTourItineraryPageKeys>();

export const TOUR_OPTION_FORM_SCHEMA = z
	.object({
		[ENUM_FORM_TOUR_OPTION.NAME]: z
			.string({
				message: msg("option.form.modal.fields.name.errors.required")
			})
			.min(1, msg("option.form.modal.fields.name.errors.required"))
			.max(200, msg("option.form.modal.fields.name.errors.max")),
		[ENUM_FORM_TOUR_OPTION.DESCRIPTION]: z.string().max(2000).optional(),
		[ENUM_FORM_TOUR_OPTION.LANGUAGES]: z
			.array(z.enum(ENUM_LANGUAGES))
			.optional(),
		[ENUM_FORM_TOUR_OPTION.MARKUP]: z
			.object({
				typ: z.enum(ENUM_PACKAGE_MARKUP_TYP),
				value: z.string()
			})
			.nullable()
			.optional(),
		[ENUM_FORM_TOUR_OPTION.MARKUP_CURRENCY]: z
			.enum(ENUM_CURRENCY_OPTIONS)
			.optional()
	})
	.superRefine((data, ctx) => {
		const markup = data[ENUM_FORM_TOUR_OPTION.MARKUP];
		if (
			markup?.typ === ENUM_PACKAGE_MARKUP_TYP.FIXED &&
			markup.value &&
			!data[ENUM_FORM_TOUR_OPTION.MARKUP_CURRENCY]
		) {
			ctx.addIssue({
				code: "custom",
				message: msg(
					"option.form.modal.fields.markupCurrency.errors.required"
				),
				path: [ENUM_FORM_TOUR_OPTION.MARKUP_CURRENCY]
			});
		}
	});

export type TTourOptionFormSchema = z.infer<typeof TOUR_OPTION_FORM_SCHEMA>;
