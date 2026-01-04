import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE
} from "../types";

export const SUPPLIER_PAYMENT_STATUS_LABELS: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED]:
		"booking.order.supplier_payment.statuses.booked",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]:
		"booking.order.supplier_payment.statuses.recorded",
	[ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED]:
		"booking.order.supplier_payment.statuses.not_booked"
};

export const SUPPLIER_PAYMENT_STATUS_VARIANTS: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED]: "green",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: "yellow",
	[ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED]: "cyan"
};
