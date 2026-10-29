import { ENUM_FORM_RECORD_PAYMENT, type TForm } from "../types";

export const FORM_RECORD_PAYMENT_LIST: TForm[] = [
	{
		label: "record_payment.form.fields.amount.label",
		placeholder: "record_payment.form.fields.amount.placeholder",
		key: ENUM_FORM_RECORD_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "record_payment.form.fields.method.label",
		placeholder: "record_payment.form.fields.method.placeholder",
		key: ENUM_FORM_RECORD_PAYMENT.METHOD,
		fieldType: "select",
		options: []
	}
];
