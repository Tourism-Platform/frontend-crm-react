import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_CATALOG_TOUR_STATUS,
	type ENUM_CATALOG_TOUR_STATUS_TYPE
} from "../types";

export const CATALOG_TOUR_STATUS_LABELS: Record<
	ENUM_CATALOG_TOUR_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_CATALOG_TOUR_STATUS.ALL]: "tour.statuses.all",
	[ENUM_CATALOG_TOUR_STATUS.ACTIVE]: "tour.statuses.active",
	[ENUM_CATALOG_TOUR_STATUS.MODERATE]: "tour.statuses.moderate",
	[ENUM_CATALOG_TOUR_STATUS.PLANNING]: "tour.statuses.planning",
	[ENUM_CATALOG_TOUR_STATUS.CANCELLED]: "tour.statuses.cancelled",
	[ENUM_CATALOG_TOUR_STATUS.ARCHIVED]: "tour.statuses.archived"
};

export const CATALOG_TOUR_STATUS_VARIANTS: Record<
	ENUM_CATALOG_TOUR_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_CATALOG_TOUR_STATUS.ACTIVE]: "green",
	[ENUM_CATALOG_TOUR_STATUS.MODERATE]: "yellow",
	[ENUM_CATALOG_TOUR_STATUS.PLANNING]: "blue",
	[ENUM_CATALOG_TOUR_STATUS.CANCELLED]: "red",
	[ENUM_CATALOG_TOUR_STATUS.ARCHIVED]: "cyan",
	[ENUM_CATALOG_TOUR_STATUS.ALL]: "default"
};
