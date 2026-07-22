import { z } from "zod";

import { type TTourSettingsPageKeys, i18nKey } from "@/shared/config";

import { CURRENCY_LABELS } from "@/entities/commission";

import { ENUM_FOC_TIER_FIELD, ENUM_SETTINGS_FINANCE_FORM } from "../types";

const msg = i18nKey<TTourSettingsPageKeys>();

const focTierSchema = z
	.object({
		[ENUM_FOC_TIER_FIELD.MIN_PAX]: z
			.number({
				message: msg("finance.form.errors.foc.minPax.min")
			})
			.min(1, {
				message: msg("finance.form.errors.foc.minPax.min")
			})
			.nullable(),
		[ENUM_FOC_TIER_FIELD.FREE]: z
			.number({
				message: msg("finance.form.errors.foc.free.min")
			})
			.min(1, {
				message: msg("finance.form.errors.foc.free.min")
			})
			.nullable()
	})
	.refine((tier) => tier.minPax !== null, {
		message: msg("finance.form.errors.foc.minPax.min"),
		path: [ENUM_FOC_TIER_FIELD.MIN_PAX]
	})
	.refine((tier) => tier.free !== null, {
		message: msg("finance.form.errors.foc.free.min"),
		path: [ENUM_FOC_TIER_FIELD.FREE]
	});

export const SETTINGS_FINANCE_FORM_SCHEMA = z.object({
	[ENUM_SETTINGS_FINANCE_FORM.CURRENCY_TYPE]: z.enum(CURRENCY_LABELS, {
		message: msg("finance.form.errors.currencyType.required")
	}),
	[ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS]: z.array(focTierSchema)
});
