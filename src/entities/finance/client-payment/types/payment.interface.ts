import { type ENUM_PAYMENT_STATUS_TYPE } from "./payment-status.types";

export interface IPayment {
	id: string;
	paymentId: string; // INV-1234
	orderId: string; // RQA00001
	dateCreated: string; // ISO: 2024-10-10
	amount: number; // 10000.00
	currency: "USD"; // расширяемо
	status: ENUM_PAYMENT_STATUS_TYPE;
	note?: string;
}
