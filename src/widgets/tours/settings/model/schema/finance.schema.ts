import { z } from "zod";

import { type TTourSettingsPageKeys, i18nKey } from "@/shared/config";

import { CURRENCY_LABELS } from "@/entities/commission";
import { ENUM_PRICING_VISIBILITY } from "@/entities/tour";

import { ENUM_FINANCE_FORM } from "../types";

const msg = i18nKey<TTourSettingsPageKeys>();

export const FINANCE_FORM_SCHEMA = z.object({
	[ENUM_FINANCE_FORM.CURRENCY_TYPE]: z.enum(CURRENCY_LABELS, {
		message: msg("finance.form.errors.currencyType.required")
	}),
	[ENUM_FINANCE_FORM.PRICING_VISIBILITY]: z.enum(ENUM_PRICING_VISIBILITY, {
		message: msg("finance.form.errors.pricingVisibility.required")
	})
});
