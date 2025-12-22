import { ENUM_FORM_OPEN_CLIENT_PAYMENT, type TForm } from "../types";

export const FORM_OPEN_CLIENT_PAYMENT_LIST: TForm[] = [
	{
		label: "client_payment.menu.open.form.fields.payment_id.label",
		placeholder:
			"client_payment.menu.open.form.fields.payment_id.placeholder",
		key: ENUM_FORM_OPEN_CLIENT_PAYMENT.PAYMENT_ID,
		fieldType: "input",
		type: "text"
	},
	{
		label: "client_payment.menu.open.form.fields.order_id.label",
		placeholder:
			"client_payment.menu.open.form.fields.order_id.placeholder",
		key: ENUM_FORM_OPEN_CLIENT_PAYMENT.ORDER_ID,
		fieldType: "input",
		type: "text"
	},
	{
		label: "client_payment.menu.open.form.fields.date_created.label",
		placeholder:
			"client_payment.menu.open.form.fields.date_created.placeholder",
		key: ENUM_FORM_OPEN_CLIENT_PAYMENT.DATE_CREATED,
		fieldType: "input",
		type: "text"
	},
	{
		label: "client_payment.menu.open.form.fields.amount.label",
		placeholder: "client_payment.menu.open.form.fields.amount.placeholder",
		key: ENUM_FORM_OPEN_CLIENT_PAYMENT.AMOUNT,
		fieldType: "input",
		type: "number"
	},
	{
		label: "client_payment.menu.open.form.fields.currency.label",
		placeholder:
			"client_payment.menu.open.form.fields.currency.placeholder",
		key: ENUM_FORM_OPEN_CLIENT_PAYMENT.CURRENCY,
		fieldType: "input",
		type: "text"
	},
	{
		label: "client_payment.menu.open.form.fields.status.label",
		placeholder: "client_payment.menu.open.form.fields.status.placeholder",
		key: ENUM_FORM_OPEN_CLIENT_PAYMENT.STATUS,
		fieldType: "input",
		type: "text"
	}
];
