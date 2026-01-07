import { ENUM_FORM_OPEN_RECONCILIATION, type TForm } from "../types";

export const FORM_OPEN_RECONCILIATION_LIST: TForm[] = [
	{
		label: "form.fields.order_id.label",
		placeholder: "form.fields.order_id.placeholder",
		key: ENUM_FORM_OPEN_RECONCILIATION.ORDER_ID,
		fieldType: "input"
	},
	{
		label: "form.fields.amount.label",
		placeholder: "form.fields.amount.placeholder",
		key: ENUM_FORM_OPEN_RECONCILIATION.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "form.fields.note.label",
		placeholder: "form.fields.note.placeholder",
		key: ENUM_FORM_OPEN_RECONCILIATION.NOTE,
		fieldType: "textarea",
		className: "col-span-2"
	},
	{
		label: "form.fields.files.label",
		key: ENUM_FORM_OPEN_RECONCILIATION.FILES,
		fieldType: "upload",
		className: "col-span-2",
		showAllRemoveButton: false,
		showTopTitle: false,
		maxFiles: 2
	}
];
