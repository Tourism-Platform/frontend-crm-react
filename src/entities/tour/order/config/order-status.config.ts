import type { TOptionsKeys } from "@/shared/config";
import { type BadgeVariant } from "@/shared/ui";

import {
	ENUM_TOUR_ORDER_STATUS,
	type ENUM_TOUR_ORDER_STATUS_TYPE
} from "../types";

export const TOUR_ORDER_STATUS_LABELS: Record<
	ENUM_TOUR_ORDER_STATUS_TYPE,
	TOptionsKeys
> = {
	[ENUM_TOUR_ORDER_STATUS.NEW]: "booking.order.statuses.new",
	[ENUM_TOUR_ORDER_STATUS.IN_PROCESSING]:
		"booking.order.statuses.in_processing",
	[ENUM_TOUR_ORDER_STATUS.BOOKING]: "booking.order.statuses.booking",
	[ENUM_TOUR_ORDER_STATUS.IN_PROGRESS]: "booking.order.statuses.in_progress",
	[ENUM_TOUR_ORDER_STATUS.COMPLETED]: "booking.order.statuses.completed",
	[ENUM_TOUR_ORDER_STATUS.CANCELLED]: "booking.order.statuses.cancelled"
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
