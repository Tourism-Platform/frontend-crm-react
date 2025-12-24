import { type TClientPaymentsPageKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";
import { valueToLabel } from "@/shared/utils";

import { ENUM_PAYMENT_STATUS, type ENUM_PAYMENT_STATUS_TYPE } from "../types";

export const PAYMENT_STATUS_LABELS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	TClientPaymentsPageKeys
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: "table.statuses.assigned",
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: "table.statuses.not_assigned"
};

export const PAYMENT_STATUS_VARIANTS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: "green",
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: "red"
};

export const PAYMENT_STATUS_OPTIONS = valueToLabel(PAYMENT_STATUS_LABELS);
