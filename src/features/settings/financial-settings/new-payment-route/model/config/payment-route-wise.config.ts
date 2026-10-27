import {
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS,
	useAcceptedCurrencyOptions
} from "@/entities/finance";

import type { TForm } from "../types/form.types";

export const FORM_NEW_PAYMENT_ROUTE_WISE_LIST = (): TForm[] => [
	{
		label: "payment_settings.form.modal.fields.account_id_email.label",
		placeholder:
			"payment_settings.form.modal.fields.account_id_email.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_ID_EMAIL,
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
		label: "payment_settings.form.modal.fields.payment_link.label",
		placeholder:
			"payment_settings.form.modal.fields.payment_link.placeholder",
		key: ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.PAYMENT_LINK,
		fieldType: "input",
		className: "sm:col-span-2"
	}
];
