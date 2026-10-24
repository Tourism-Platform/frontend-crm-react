import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import { ENUM_TOUR_STATUS, type ENUM_TOUR_STATUS_TYPE } from "../types";

export const TOUR_STATUS_LABELS: Record<ENUM_TOUR_STATUS_TYPE, TOptionsKeys> = {
	[ENUM_TOUR_STATUS.ALL]: "tour.statuses.all",
	[ENUM_TOUR_STATUS.PUBLISHED]: "tour.statuses.published",
	[ENUM_TOUR_STATUS.ARCHIVED]: "tour.statuses.archived",
	[ENUM_TOUR_STATUS.DRAFT]: "tour.statuses.draft"
};

export const TOUR_STATUS_VARIANTS: Record<ENUM_TOUR_STATUS_TYPE, BadgeVariant> =
	{
		[ENUM_TOUR_STATUS.PUBLISHED]: "green",
		[ENUM_TOUR_STATUS.ARCHIVED]: "yellow",
		[ENUM_TOUR_STATUS.DRAFT]: "cyan",
		[ENUM_TOUR_STATUS.ALL]: "default"
	};

/** Плашка статуса поверх обложки карточки тура */
export const TOUR_STATUS_OVERLAY_CLASS: Record<ENUM_TOUR_STATUS_TYPE, string> =
	{
		[ENUM_TOUR_STATUS.PUBLISHED]: "bg-emerald-600 text-white",
		[ENUM_TOUR_STATUS.DRAFT]: "bg-sky-600 text-white",
		[ENUM_TOUR_STATUS.ARCHIVED]: "bg-amber-600 text-white",
		[ENUM_TOUR_STATUS.ALL]: "bg-foreground text-background"
	};
