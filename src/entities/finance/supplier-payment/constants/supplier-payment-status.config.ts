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
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]:
		"finance.supplier_payment.statuses.confirmed",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]:
		"finance.supplier_payment.statuses.recorded"
};

export const SUPPLIER_PAYMENT_STATUS_VARIANTS: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: "green",
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: "yellow"
};
