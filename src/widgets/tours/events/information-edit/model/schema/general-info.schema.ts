import { z } from "zod";

import { type TTourInformationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_INFORMATION } from "../types";

const msg = i18nKey<TTourInformationEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_INFORMATION.DESCRIPTION]: z
		.string()
		.min(1, {
			message: msg("general.info.form.fields.description.errors.required")
		})
		.max(1000, {
			message: msg("general.info.form.fields.description.errors.max")
		})
});
