import { SUPPLIER_PAYMENT_STATUS_OPTIONS } from "@/entities/finance";

import { ENUM_FORM_CONFIRM_PAYMENT, type TForm } from "../types";

export const FORM_CONFIRM_PAYMENT_LIST: TForm[] = [
	{
		label: "form.fields.orderId.label",
		placeholder: "form.fields.orderId.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID,
		fieldType: "input",
		disabled: true,
		className: "col-span-2"
	},
	{
		label: "form.fields.amount.label",
		placeholder: "form.fields.amount.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "form.fields.status.label",
		placeholder: "form.fields.status.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.STATUS,
		fieldType: "select",
		options: SUPPLIER_PAYMENT_STATUS_OPTIONS
	},
	{
		label: "form.fields.note.label",
		placeholder: "form.fields.note.placeholder",
		key: ENUM_FORM_CONFIRM_PAYMENT.NOTE,
		fieldType: "textarea",
		className: "col-span-2"
	}
];
