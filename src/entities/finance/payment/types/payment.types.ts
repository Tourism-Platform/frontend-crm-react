import { type TClientPaymentsPageKeys } from "@/shared/config/i18n/i18n.config";

export const ENUM_PAYMENT_STATUS = {
	PAID: "paid",
	UNPAID: "unpaid",
	PARTIALLY_PAID: "partially_paid"
} as const;

export type ENUM_PAYMENT_STATUS_TYPE =
	(typeof ENUM_PAYMENT_STATUS)[keyof typeof ENUM_PAYMENT_STATUS];

export interface IPayment {
	paymentId: string; // INV-1234
	orderId: string; // RQA00001
	issueDate: string; // ISO: 2024-10-10
	amount: number; // 10000.00
	paidAmount: number; // 10000.00
	currency: "USD"; // расширяемо
	status: ENUM_PAYMENT_STATUS_TYPE;
}

export const PAYMENT_STATUS_LABELS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	TClientPaymentsPageKeys
> = {
	[ENUM_PAYMENT_STATUS.PAID]: "table.statuses.paid",
	[ENUM_PAYMENT_STATUS.UNPAID]: "table.statuses.unpaid",
	[ENUM_PAYMENT_STATUS.PARTIALLY_PAID]: "table.statuses.partially_paid"
};
