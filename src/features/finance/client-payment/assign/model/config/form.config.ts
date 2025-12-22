import { ENUM_FORM_ASSIGN_CLIENT_PAYMENT, type TForm } from "../types";

export const FORM_ASSIGN_CLIENT_PAYMENT_LIST: TForm[] = [
	{
		label: "client_payment.menu.assign.form.fields.order_id.label",
		placeholder:
			"client_payment.menu.assign.form.fields.order_id.placeholder",
		key: ENUM_FORM_ASSIGN_CLIENT_PAYMENT.ORDER_ID,
		fieldType: "input",
		type: "text"
	}
];
