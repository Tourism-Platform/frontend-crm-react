import { ENUM_FORM_ASSIGN_PAYMENT, type TForm } from "../types";

export const FORM_ASSIGN_PAYMENT_LIST: TForm[] = [
	{
		label: "menu.assign.form.fields.orderId.label",
		placeholder: "menu.assign.form.fields.orderId.placeholder",
		key: ENUM_FORM_ASSIGN_PAYMENT.ORDER_ID,
		fieldType: "input"
	},
	{
		label: "menu.assign.form.fields.amount.label",
		placeholder: "menu.assign.form.fields.amount.placeholder",
		key: ENUM_FORM_ASSIGN_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "menu.assign.form.fields.note.label",
		placeholder: "menu.assign.form.fields.note.placeholder",
		key: ENUM_FORM_ASSIGN_PAYMENT.NOTE,
		fieldType: "textarea",
		className: "col-span-2"
	}
];
