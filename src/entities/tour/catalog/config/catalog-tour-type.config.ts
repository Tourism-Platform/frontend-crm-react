import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_CATALOG_TOUR_TYPES,
	type ENUM_CATALOG_TOUR_TYPES_TYPE
} from "../types";

export const CATALOG_TOUR_TYPE_LABELS: Record<
	ENUM_CATALOG_TOUR_TYPES_TYPE,
	TOptionsKeys
> = {
	[ENUM_CATALOG_TOUR_TYPES.PRIVATE]: "tour.tourTypes.private",
	[ENUM_CATALOG_TOUR_TYPES.GROUP]: "tour.tourTypes.group"
};

/** Цвет бейджа типа тура — как у типов заказа (`BOOKING_ORDER_TYPE_VARIANTS`) */
export const CATALOG_TOUR_TYPE_VARIANTS: Record<
	ENUM_CATALOG_TOUR_TYPES_TYPE,
	BadgeVariant
> = {
	[ENUM_CATALOG_TOUR_TYPES.PRIVATE]: "blue",
	[ENUM_CATALOG_TOUR_TYPES.GROUP]: "green"
};
