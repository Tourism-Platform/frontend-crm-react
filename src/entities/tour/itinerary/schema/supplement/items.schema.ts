import { z } from "zod";

import {
	type TTourEventSupplementEditPageKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_SUPPLEMENT_ITEMS } from "../../types";

const msg = i18nKey<TTourEventSupplementEditPageKeys>();

export const ITEMS_SCHEMA = z.object({
	[ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST]: z.array(
		z.object({
			[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: z
				.string()
				.min(1, {
					message: msg(
						"form.items.details.form.fields.name.errors.required"
					)
				})
				.max(255, {
					message: msg(
						"form.items.details.form.fields.name.errors.max"
					)
				}),
			[ENUM_FORM_SUPPLEMENT_ITEMS.DESCRIPTION]: z.string().optional()
		})
	)
});
