import { type TClientPaymentsPageKeys } from "@/shared/config/i18n/i18n.config";

export const ENUM_PAYMENT_STATUS = {
	ASSIGNED: "assigned",
	NOT_ASSIGNED: "not_assigned"
} as const;

export type ENUM_PAYMENT_STATUS_TYPE =
	(typeof ENUM_PAYMENT_STATUS)[keyof typeof ENUM_PAYMENT_STATUS];

export interface IPayment {
	id: number;
	paymentId: string; // INV-1234
	orderId: string; // RQA00001
	dateCreated: string; // ISO: 2024-10-10
	amount: number; // 10000.00
	currency: "USD"; // расширяемо
	status: ENUM_PAYMENT_STATUS_TYPE;
}

export const PAYMENT_STATUS_LABELS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	TClientPaymentsPageKeys
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: "table.statuses.assigned",
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: "table.statuses.not_assigned"
};
