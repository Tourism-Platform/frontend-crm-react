import { type TStaffInformationPageKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";
import { valueToLabel } from "@/shared/utils";

import {
	ENUM_STAFF_STATUS_OPTIONS,
	type ENUM_STAFF_STATUS_OPTIONS_TYPE
} from "../types";

export const STAFF_STATUS_LABELS: Record<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	TStaffInformationPageKeys
> = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: "table.statuses.active",
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: "table.statuses.inactive",
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: "table.statuses.pending"
};

export const STAFF_STATUS_VARIANTS: Record<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	BadgeVariant
> = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: "green",
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: "red",
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: "yellow"
};

export const STAFF_STATUS_OPTIONS = valueToLabel(STAFF_STATUS_LABELS);
