import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import { ENUM_PAYMENT_STATUS, type ENUM_PAYMENT_STATUS_TYPE } from "../types";

export const PAYMENT_STATUS_LABELS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: "finance.client_payment.statuses.assigned",
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]:
		"finance.client_payment.statuses.not_assigned"
};

export const PAYMENT_STATUS_VARIANTS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: "green",
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: "red"
};
