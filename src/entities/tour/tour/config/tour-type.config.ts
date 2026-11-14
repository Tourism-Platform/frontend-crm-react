import type { Icon } from "@solar-icons/react/lib/types";
import {
	UserRoundedIcon,
	UsersGroupRoundedIcon
} from "@solar-icons/react/outline";

import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import { ENUM_TOUR_TYPES, type ENUM_TOUR_TYPES_TYPE } from "../types";

export const TOUR_TYPE_LABELS: Record<ENUM_TOUR_TYPES_TYPE, TOptionsKeys> = {
	[ENUM_TOUR_TYPES.PRIVATE]: "tour.tourTypes.private",
	[ENUM_TOUR_TYPES.GROUP]: "tour.tourTypes.group"
};

/** Цвет бейджа типа тура — как у типов заказа (`BOOKING_ORDER_TYPE_VARIANTS`) */
export const TOUR_TYPE_VARIANTS: Record<ENUM_TOUR_TYPES_TYPE, BadgeVariant> = {
	[ENUM_TOUR_TYPES.PRIVATE]: "blue",
	[ENUM_TOUR_TYPES.GROUP]: "green"
};

/** Иконка типа тура — в опциях фильтра по типу */
export const TOUR_TYPE_ICONS: Record<ENUM_TOUR_TYPES_TYPE, Icon> = {
	[ENUM_TOUR_TYPES.PRIVATE]: UserRoundedIcon,
	[ENUM_TOUR_TYPES.GROUP]: UsersGroupRoundedIcon
};
