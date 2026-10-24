import { SupplierPaymentStatus } from "@/shared/api";

export const ENUM_SUPPLIER_PAYMENT_STATUS = {
	RECORDED: "recorded",
	CONFIRMED: "confirmed"
} as const;

export type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE =
	(typeof ENUM_SUPPLIER_PAYMENT_STATUS)[keyof typeof ENUM_SUPPLIER_PAYMENT_STATUS];

export const ENUM_SUPPLIER_PAYMENT_STATUS_BACKEND = {
	CONFIRMED: SupplierPaymentStatus.Paid,
	RECORDED: SupplierPaymentStatus.NotPaid
} as const;

export type ENUM_SUPPLIER_PAYMENT_STATUS_BACKEND_TYPE = SupplierPaymentStatus;
