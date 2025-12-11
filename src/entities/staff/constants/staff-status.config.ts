import { valueToLabel } from "@/shared/utils";

import { ENUM_STAFF_STATUS_OPTIONS } from "../types";

export const STAFF_STATUS_LABELS = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: "Active",
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: "Inactive",
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: "Pending"
} as const;

export const STAFF_STATUS_OPTIONS = valueToLabel(STAFF_STATUS_LABELS);
