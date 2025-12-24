import type { TTourOrderHistoryPageKeys } from "@/shared/config";
import { type BadgeVariant } from "@/shared/ui";

import {
	ENUM_TOUR_ORDER_STATUS,
	type ENUM_TOUR_ORDER_STATUS_TYPE
} from "../types";

export const TOUR_ORDER_STATUS_LABELS: Record<
	ENUM_TOUR_ORDER_STATUS_TYPE,
	TTourOrderHistoryPageKeys
> = {
	[ENUM_TOUR_ORDER_STATUS.NEW]: "statuses.new",
	[ENUM_TOUR_ORDER_STATUS.IN_PROCESSING]: "statuses.in_processing",
	[ENUM_TOUR_ORDER_STATUS.BOOKING]: "statuses.booking",
	[ENUM_TOUR_ORDER_STATUS.IN_PROGRESS]: "statuses.in_progress",
	[ENUM_TOUR_ORDER_STATUS.COMPLETED]: "statuses.completed",
	[ENUM_TOUR_ORDER_STATUS.CANCELLED]: "statuses.cancelled"
};

export const TOUR_ORDER_STATUS_VARIANTS: Record<
	ENUM_TOUR_ORDER_STATUS_TYPE,
	BadgeVariant
> = {
	[ENUM_TOUR_ORDER_STATUS.NEW]: "blue",
	[ENUM_TOUR_ORDER_STATUS.IN_PROCESSING]: "yellow",
	[ENUM_TOUR_ORDER_STATUS.BOOKING]: "orange",
	[ENUM_TOUR_ORDER_STATUS.IN_PROGRESS]: "cyan",
	[ENUM_TOUR_ORDER_STATUS.COMPLETED]: "green",
	[ENUM_TOUR_ORDER_STATUS.CANCELLED]: "red"
};
