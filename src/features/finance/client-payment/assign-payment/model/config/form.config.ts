import type { SelectPickerOption } from "@/shared/ui";

import { ENUM_FORM_ASSIGN_PAYMENT, type TForm } from "../types";

export const FORM_ASSIGN_PAYMENT_LIST = ({
	orderOptions
}: {
	orderOptions: SelectPickerOption[];
}): TForm[] => [
	{
		label: "menu.assign.form.fields.orderId.label",
		placeholder: "menu.assign.form.fields.orderId.placeholder",
		key: ENUM_FORM_ASSIGN_PAYMENT.ORDER_ID,
		fieldType: "select",
		options: orderOptions
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
	},
	{
		label: "menu.assign.form.fields.files.label",
		key: ENUM_FORM_ASSIGN_PAYMENT.FILES,
		fieldType: "upload",
		className: "col-span-2",
		showAllRemoveButton: false,
		showTopTitle: false,
		maxFiles: 1
	}
];
