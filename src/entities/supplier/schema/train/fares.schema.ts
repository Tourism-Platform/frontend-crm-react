import { z } from "zod";

import { type TTrainProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_TRAIN_FARES } from "../../types/train/fares-form.types";

const msg = i18nKey<TTrainProductEditPageKeys>();

export const TRAIN_FARES_SCHEMA = z.object({
	[ENUM_FORM_TRAIN_FARES.FARES_LIST]: z.array(
		z.object({
			[ENUM_FORM_TRAIN_FARES.VARIANT_ID]: z.string(),
			[ENUM_FORM_TRAIN_FARES.NAME]: z
				.string()
				.trim()
				.min(
					1,
					msg("form.fares.details.form.fields.name.errors.required")
				)
		})
	)
});
