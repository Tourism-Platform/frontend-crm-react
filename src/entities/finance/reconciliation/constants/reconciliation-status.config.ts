import { type TReconciliationPageKeys } from "@/shared/config";

import {
	ENUM_RECONCILIATION_STATUS,
	type ENUM_RECONCILIATION_STATUS_TYPE
} from "../types";

export const RECONCILIATION_STATUS_LABELS: Record<
	ENUM_RECONCILIATION_STATUS_TYPE,
	TReconciliationPageKeys
> = {
	[ENUM_RECONCILIATION_STATUS.IN_PROGRESS]: "table.statuses.in_progress",
	[ENUM_RECONCILIATION_STATUS.COMPLETED]: "table.statuses.completed"
};
