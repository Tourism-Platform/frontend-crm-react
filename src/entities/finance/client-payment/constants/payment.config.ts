import { type TClientPaymentsPageKeys } from "@/shared/config/i18n/i18n.config";
import { valueToLabel } from "@/shared/utils";

import { ENUM_PAYMENT_STATUS, type ENUM_PAYMENT_STATUS_TYPE } from "../types";

export const PAYMENT_STATUS_LABELS: Record<
	ENUM_PAYMENT_STATUS_TYPE,
	TClientPaymentsPageKeys
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: "table.statuses.assigned",
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: "table.statuses.not_assigned"
};

export const PAYMENT_STATUS_OPTIONS = valueToLabel(PAYMENT_STATUS_LABELS);
