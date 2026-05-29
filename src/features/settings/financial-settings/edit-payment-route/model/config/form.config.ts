import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS,
	OPERATOR_PAYMENT_METHOD_LABELS
} from "@/entities/finance/finance-information";

import type { TForm } from "../types/form.types";

export const FORM_EDIT_PAYMENT_ROUTE_COMMON_LIST = (): TForm[] => [
	{
		label: "payment_settings.form.modal.fields.method_type.label",
		placeholder:
			"payment_settings.form.modal.fields.method_type.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(OPERATOR_PAYMENT_METHOD_LABELS)
	},
	{
		label: "payment_settings.form.modal.fields.internal_label.label",
		placeholder:
			"payment_settings.form.modal.fields.internal_label.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.INTERNAL_LABEL,
		fieldType: "input"
	}
];

export const FORM_EDIT_PAYMENT_ROUTE_SWIFT_LIST: TForm[] = [
	{
		label: "payment_settings.form.modal.fields.account_name_iban.label",
		placeholder:
			"payment_settings.form.modal.fields.account_name_iban.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_NAME_IBAN,
		fieldType: "input",
		className: "col-span-2"
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
		options: CURRENCY_OPTIONS
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

export const FORM_EDIT_PAYMENT_ROUTE_WISE_LIST: TForm[] = [
	{
		label: "payment_settings.form.modal.fields.account_id_email.label",
		placeholder:
			"payment_settings.form.modal.fields.account_id_email.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_ID_EMAIL,
		fieldType: "input"
	},
	{
		label: "payment_settings.form.modal.fields.bank_address.label",
		placeholder:
			"payment_settings.form.modal.fields.bank_address.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_ADDRESS,
		fieldType: "input"
	},
	{
		label: "payment_settings.form.modal.fields.payment_link.label",
		placeholder:
			"payment_settings.form.modal.fields.payment_link.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.PAYMENT_LINK,
		fieldType: "input",
		className: "col-span-2"
	}
];
