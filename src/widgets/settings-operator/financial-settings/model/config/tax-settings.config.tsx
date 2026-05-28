import { ENUM_FORM_OPERATOR_TAX_SETTINGS } from "@/entities/finance";

import type { TForm } from "../types";

export const TAX_SETTINGS_VAT: TForm[] = [
	{
		key: ENUM_FORM_OPERATOR_TAX_SETTINGS.VAT_ENABLED,
		// label: "tax_settings.form.fields.vat.label",
		fieldType: "switch"
	},
	{
		key: ENUM_FORM_OPERATOR_TAX_SETTINGS.VAT_RATE,
		label: "tax_settings.form.fields.vat.label",
		placeholder: "tax_settings.form.fields.vat.placeholder",
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	}
];

export const TAX_SETTINGS_PROFIT_TAX: TForm[] = [
	{
		key: ENUM_FORM_OPERATOR_TAX_SETTINGS.PROFIT_TAX_ENABLED,
		// label: "tax_settings.form.fields.profit_tax.label",
		fieldType: "switch"
	},
	{
		key: ENUM_FORM_OPERATOR_TAX_SETTINGS.PROFIT_TAX_RATE,
		label: "tax_settings.form.fields.profit_tax.label",
		placeholder: "tax_settings.form.fields.profit_tax.placeholder",
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	}
];
