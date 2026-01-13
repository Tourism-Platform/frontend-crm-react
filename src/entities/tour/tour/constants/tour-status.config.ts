import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import { ENUM_TOUR_STATUS, type ENUM_TOUR_STATUS_TYPE } from "../types";

export const TOUR_STATUS_LABELS: Record<ENUM_TOUR_STATUS_TYPE, TOptionsKeys> = {
	[ENUM_TOUR_STATUS.ALL]: "tour.statuses.all",
	[ENUM_TOUR_STATUS.ACTIVE]: "tour.statuses.active",
	[ENUM_TOUR_STATUS.MODERATE]: "tour.statuses.moderate",
	[ENUM_TOUR_STATUS.PLANNING]: "tour.statuses.planning",
	[ENUM_TOUR_STATUS.CANCELLED]: "tour.statuses.cancelled",
	[ENUM_TOUR_STATUS.ARCHIVED]: "tour.statuses.archived"
};

export const TOUR_STATUS_VARIANTS: Record<ENUM_TOUR_STATUS_TYPE, BadgeVariant> =
	{
		[ENUM_TOUR_STATUS.ACTIVE]: "green",
		[ENUM_TOUR_STATUS.MODERATE]: "yellow",
		[ENUM_TOUR_STATUS.PLANNING]: "blue",
		[ENUM_TOUR_STATUS.CANCELLED]: "red",
		[ENUM_TOUR_STATUS.ARCHIVED]: "cyan",
		[ENUM_TOUR_STATUS.ALL]: "default"
	};
