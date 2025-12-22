import { type TSupplierPaymentsPageKeys } from "@/shared/config/i18n/i18n.config";

export const ENUM_SUPPLIER_PAYMENT_STATUS = {
	RECORDED: "recorded",
	CONFIRMED: "confirmed"
} as const;

export type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE =
	(typeof ENUM_SUPPLIER_PAYMENT_STATUS)[keyof typeof ENUM_SUPPLIER_PAYMENT_STATUS];

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

export const SUPPLIER_PAYMENT_STATUS_LABELS: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	TSupplierPaymentsPageKeys
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: "table.statuses.recorded",
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: "table.statuses.confirmed"
};
