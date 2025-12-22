import { ENUM_FORM_CONFIRM_PAYMENT, type TForm } from "../types";

export const FORM_CONFIRM_PAYMENT_LIST: TForm[] = [
	{
		label: "form.fields.order_id.label",
		placeholder: "form.fields.order_id.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID,
		fieldType: "input"
	},
	{
		label: "form.fields.amount.label",
		placeholder: "form.fields.amount.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "form.fields.note.label",
		placeholder: "form.fields.note.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.NOTE,
		fieldType: "textarea",
		className: "col-span-2"
	}
];
