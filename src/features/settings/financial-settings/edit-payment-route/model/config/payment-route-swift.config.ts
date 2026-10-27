import {
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS,
	useAcceptedCurrencyOptions
} from "@/entities/finance";

import type { TForm } from "../types/form.types";

export const FORM_EDIT_PAYMENT_ROUTE_SWIFT_LIST = (): TForm[] => [
	{
		label: "payment_settings.form.modal.fields.account_name_iban.label",
		placeholder:
			"payment_settings.form.modal.fields.account_name_iban.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_NAME_IBAN,
		fieldType: "input",
		className: "sm:col-span-2"
	},
	{
		label: "payment_settings.form.modal.fields.swift_bic.label",
		placeholder: "payment_settings.form.modal.fields.swift_bic.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.SWIFT_BIC,
		fieldType: "input"
	},
	{
		label: "payment_settings.form.modal.fields.currency.label",
		placeholder: "payment_settings.form.modal.fields.currency.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.CURRENCY,
		fieldType: "select",
		options: useAcceptedCurrencyOptions().currencyOptions
	},
	{
		label: "payment_settings.form.modal.fields.bank_name.label",
		placeholder: "payment_settings.form.modal.fields.bank_name.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_NAME,
		fieldType: "input"
	},
	{
		label: "payment_settings.form.modal.fields.bank_address.label",
		placeholder:
			"payment_settings.form.modal.fields.bank_address.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_ADDRESS,
		fieldType: "input"
	}
];
