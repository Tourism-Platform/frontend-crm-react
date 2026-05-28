import { z } from "zod";

import {
	type TFinancialSettingsPageOperatorKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_OPERATOR_TAX_SETTINGS } from "../types";

const msg = i18nKey<TFinancialSettingsPageOperatorKeys>();

export const OPERATOR_TAX_SETTINGS_SCHEMA = z.object({
	[ENUM_FORM_OPERATOR_TAX_SETTINGS.VAT_ENABLED]: z.boolean(),
	[ENUM_FORM_OPERATOR_TAX_SETTINGS.VAT_RATE]: z
		.number({
			message: msg("tax_settings.form.fields.vat.errors.required")
		})
		.min(0, msg("tax_settings.form.fields.vat.errors.min"))
		.max(100, msg("tax_settings.form.fields.vat.errors.max")),
	[ENUM_FORM_OPERATOR_TAX_SETTINGS.PROFIT_TAX_ENABLED]: z.boolean(),
	[ENUM_FORM_OPERATOR_TAX_SETTINGS.PROFIT_TAX_RATE]: z
		.number({
			message: msg("tax_settings.form.fields.profit_tax.errors.required")
		})
		.min(0, msg("tax_settings.form.fields.profit_tax.errors.min"))
		.max(100, msg("tax_settings.form.fields.profit_tax.errors.max"))
});
