import { z } from "zod";

import { type TTourEventGuideEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_GUIDES, ENUM_GUIDE_TYPE } from "../../types";

const msg = i18nKey<TTourEventGuideEditPageKeys>();

const typTierSchema = z.object({
	[ENUM_FORM_GUIDES.GUIDE_TYPE]: z.enum(ENUM_GUIDE_TYPE, {
		message: msg(
			"form.guides.details.typ_tiers.fields.guide_type.errors.required"
		)
	}),
	[ENUM_FORM_GUIDES.UP_TO_PAX]: z
		.number({
			message: msg(
				"form.guides.details.typ_tiers.fields.up_to_pax.errors.required"
			)
		})
		.int({
			message: msg(
				"form.guides.details.typ_tiers.fields.up_to_pax.errors.required"
			)
		})
		.min(1, {
			message: msg(
				"form.guides.details.typ_tiers.fields.up_to_pax.errors.required"
			)
		})
		.nullable()
		.refine((value) => value !== null, {
			message: msg(
				"form.guides.details.typ_tiers.fields.up_to_pax.errors.required"
			)
		})
});

export const GUIDES_SCHEMA = z.object({
	[ENUM_FORM_GUIDES.DURATION_DAYS]: z
		.number({
			message: msg(
				"form.guides.details.form.fields.duration_days.errors.required"
			)
		})
		.positive({
			message: msg(
				"form.guides.details.form.fields.duration_days.errors.required"
			)
		})
		// Stored plans may carry no duration; the form asks for it, never guesses.
		.nullable()
		.refine((value) => value !== null, {
			message: msg(
				"form.guides.details.form.fields.duration_days.errors.required"
			)
		}),
	// Backend `GuideTypeTier`: ranges are implicit (previous bound + 1 .. own
	// bound), so bounds must strictly grow; the last tier is open-ended.
	[ENUM_FORM_GUIDES.TYP_TIERS]: z
		.array(typTierSchema)
		.superRefine((tiers, ctx) => {
			tiers.forEach((tier, index) => {
				const prev = tiers[index - 1]?.[ENUM_FORM_GUIDES.UP_TO_PAX];
				const current = tier[ENUM_FORM_GUIDES.UP_TO_PAX];
				if (prev != null && current != null && current <= prev) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: msg(
							"form.guides.details.typ_tiers.fields.up_to_pax.errors.order"
						),
						path: [index, ENUM_FORM_GUIDES.UP_TO_PAX]
					});
				}
			});
		})
});
