import type { SelectPickerOption } from "@/shared/ui";

import { ENUM_FORM_UPDATE_PAYMENT, type TUpdatePaymentForm } from "../types";

export const FORM_UPDATE_PAYMENT_LIST = ({
	orderOptions
}: {
	orderOptions: SelectPickerOption[];
}): TUpdatePaymentForm[] => [
	{
		label: "menu.update.form.fields.orderId.label",
		placeholder: "menu.update.form.fields.orderId.placeholder",
		key: ENUM_FORM_UPDATE_PAYMENT.ORDER_ID,
		fieldType: "select",
		options: orderOptions,
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
	},
	{
		label: "menu.update.form.fields.files.label",
		key: ENUM_FORM_UPDATE_PAYMENT.FILES,
		fieldType: "upload",
		className: "col-span-2",
		showAllRemoveButton: false,
		showTopTitle: false,
		maxFiles: 1,
		disabled: true
	}
];
