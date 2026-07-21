import { z } from "zod";

import { type TTourEventGuideEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_GUIDES, ENUM_GUIDE_TYPE } from "../../types";

const msg = i18nKey<TTourEventGuideEditPageKeys>();

export const GUIDES_SCHEMA = z.object({
	[ENUM_FORM_GUIDES.GUIDES_LIST]: z
		.array(
			z.object({
				[ENUM_FORM_GUIDES.GUIDE_TYPE]: z.enum(ENUM_GUIDE_TYPE, {
					message: msg(
						"form.guides.details.form.fields.guide_type.errors.required"
					)
				}),
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
			})
		)
		.min(1, {
			message: msg(
				"form.guides.details.form.fields.guides_list.errors.min"
			)
		})
});
