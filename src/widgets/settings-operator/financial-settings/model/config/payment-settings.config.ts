import { ENUM_FORM_OPERATOR_PAYMENT_SETTINGS } from "@/entities/finance";

import type { TForm } from "../types";

export const PAYMENT_SETTINGS_LIST: TForm[] = [
	{
		label: "payment_settings.form.modal.fields.method_type.label",
		placeholder:
			"payment_settings.form.modal.fields.method_type.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE
	},
	{
		label: "payment_settings.form.modal.fields.internal_label.label",
		placeholder:
			"payment_settings.form.modal.fields.internal_label.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.INTERNAL_LABEL
	},
	{
		label: "payment_settings.form.modal.fields.account_name_iban.label",
		placeholder:
			"payment_settings.form.modal.fields.account_name_iban.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_NAME_IBAN
	},
	{
		label: "payment_settings.form.modal.fields.swift_bic.label",
		placeholder: "payment_settings.form.modal.fields.swift_bic.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.SWIFT_BIC
	},
	{
		label: "payment_settings.form.modal.fields.currency.label",
		placeholder: "payment_settings.form.modal.fields.currency.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.CURRENCY
	},
	{
		label: "payment_settings.form.modal.fields.bank_name.label",
		placeholder: "payment_settings.form.modal.fields.bank_name.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_NAME
	},
	{
		label: "payment_settings.form.modal.fields.bank_address.label",
		placeholder:
			"payment_settings.form.modal.fields.bank_address.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_ADDRESS
	},
	{
		label: "payment_settings.form.modal.fields.note.label",
		placeholder: "payment_settings.form.modal.fields.note.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.NOTE
	}
];
