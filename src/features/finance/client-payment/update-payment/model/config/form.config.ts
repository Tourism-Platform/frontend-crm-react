import { ENUM_FORM_UPDATE_PAYMENT, type TUpdatePaymentForm } from "../types";

export const FORM_UPDATE_PAYMENT_LIST: TUpdatePaymentForm[] = [
	{
		label: "menu.update.form.fields.orderId.label",
		placeholder: "menu.update.form.fields.orderId.placeholder",
		key: ENUM_FORM_UPDATE_PAYMENT.ORDER_ID,
		fieldType: "input",
		disabled: true
	},
	{
		label: "menu.update.form.fields.amount.label",
		placeholder: "menu.update.form.fields.amount.placeholder",
		key: ENUM_FORM_UPDATE_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "menu.update.form.fields.note.label",
		placeholder: "menu.update.form.fields.note.placeholder",
		key: ENUM_FORM_UPDATE_PAYMENT.NOTE,
		fieldType: "textarea",
		className: "col-span-2"
	}
];
