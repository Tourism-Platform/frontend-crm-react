import type { ENUM_SUPPLIER_PAYMENT_STATUS_TYPE } from "./supplier-payment.types";

export interface ISupplierPayment {
	id: string;
	orderId: string;
	component: string;
	type: string;
	supplier: string;
	dateCreated: string;
	amount: number;
	currency: string;
	manager: string;
	status: ENUM_SUPPLIER_PAYMENT_STATUS_TYPE;
}
