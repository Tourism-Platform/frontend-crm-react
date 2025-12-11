import { valueToLabel } from "@/shared/utils";

import { ENUM_STAFF_ROLE_OPTIONS } from "../types";

export const STAFF_ROLE_LABELS = {
	[ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER]: "Sales manager",
	[ENUM_STAFF_ROLE_OPTIONS.ADMIN]: "Admin"
} as const;

export const STAFF_ROLE_OPTIONS = valueToLabel(STAFF_ROLE_LABELS);
