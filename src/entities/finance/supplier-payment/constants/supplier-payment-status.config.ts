import {
	type TOrderIdPageKeys,
	type TSupplierPaymentsPageKeys
} from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE
} from "../types";

export const SUPPLIER_PAYMENT_STATUS_LABELS_ID: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	TOrderIdPageKeys
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]:
		"statuses.supplier_payment.confirmed",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]:
		"statuses.supplier_payment.recorded",
	[ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED]: "statuses.supplier_payment.booked",
	[ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED]:
		"statuses.supplier_payment.not_booked"
};

export const SUPPLIER_PAYMENT_STATUS_LABELS_FINANCE: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	TSupplierPaymentsPageKeys
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]:
		"statuses.supplier_payment.confirmed",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]:
		"statuses.supplier_payment.recorded",
	[ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED]: "statuses.supplier_payment.booked",
	[ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED]:
		"statuses.supplier_payment.not_booked"
};

export const SUPPLIER_PAYMENT_STATUS_VARIANTS: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: "green",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: "yellow",
	[ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED]: "green",
	[ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED]: "red"
};
