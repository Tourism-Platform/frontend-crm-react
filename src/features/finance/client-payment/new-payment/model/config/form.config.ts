import { ENUM_FORM_NEW_PAYMENT, type TForm } from "../types";

export const FORM_NEW_PAYMENT_LIST: TForm[] = [
	{
		label: "new_payment.form.fields.orderId.label",
		placeholder: "new_payment.form.fields.orderId.placeholder",
		key: ENUM_FORM_NEW_PAYMENT.ORDER_ID,
		fieldType: "input"
	},
	{
		label: "new_payment.form.fields.amount.label",
		placeholder: "new_payment.form.fields.amount.placeholder",
		key: ENUM_FORM_NEW_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "new_payment.form.fields.note.label",
		placeholder: "new_payment.form.fields.note.placeholder",
		key: ENUM_FORM_NEW_PAYMENT.NOTE,
		fieldType: "textarea",
		className: "col-span-2"
	},
	{
		label: "new_payment.form.fields.files.label",
		key: ENUM_FORM_NEW_PAYMENT.FILES,
		fieldType: "upload",
		className: "col-span-2",
		showAllRemoveButton: false,
		showTopTitle: false,
		maxFiles: 1
	}
];
