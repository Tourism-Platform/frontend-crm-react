import { type TOptionsKeys } from "@/shared/config";
import { type BadgeVariant } from "@/shared/ui";

import {
	ENUM_RECONCILIATION_STATUS,
	type ENUM_RECONCILIATION_STATUS_TYPE
} from "../types";

export const RECONCILIATION_STATUS_LABELS: Record<
	ENUM_RECONCILIATION_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_RECONCILIATION_STATUS.IN_PROGRESS]:
		"finance.reconciliation.statuses.in_progress",
	[ENUM_RECONCILIATION_STATUS.COMPLETED]:
		"finance.reconciliation.statuses.completed"
};

export const RECONCILIATION_STATUS_VARIANTS: Record<
	ENUM_RECONCILIATION_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_RECONCILIATION_STATUS.IN_PROGRESS]: "yellow",
	[ENUM_RECONCILIATION_STATUS.COMPLETED]: "green"
};
