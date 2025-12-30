import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_STAFF_STATUS_OPTIONS,
	type ENUM_STAFF_STATUS_OPTIONS_TYPE
} from "../types";

export const STAFF_STATUS_LABELS: Record<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	TOptionsKeys
> = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: "staff.statuses.active",
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: "staff.statuses.inactive",
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: "staff.statuses.pending"
};

export const STAFF_STATUS_VARIANTS: Record<
	ENUM_STAFF_STATUS_OPTIONS_TYPE,
	BadgeVariant
> = {
	[ENUM_STAFF_STATUS_OPTIONS.ACTIVE]: "green",
	[ENUM_STAFF_STATUS_OPTIONS.INACTIVE]: "red",
	[ENUM_STAFF_STATUS_OPTIONS.PENDING]: "yellow"
};
