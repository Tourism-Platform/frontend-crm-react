import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_ORDER_TYPE_OPTIONS,
	type ENUM_ORDER_TYPE_OPTIONS_TYPE
} from "../types";

export const BOOKING_ORDER_TYPE_LABELS: Record<
	ENUM_ORDER_TYPE_OPTIONS_TYPE,
	TOptionsKeys
> = {
	[ENUM_ORDER_TYPE_OPTIONS.REGULAR]: "booking.order.types.regular",
	[ENUM_ORDER_TYPE_OPTIONS.VIP]: "booking.order.types.vip",
	[ENUM_ORDER_TYPE_OPTIONS.GROUP]: "booking.order.types.group"
};

export const BOOKING_ORDER_TYPE_VARIANTS: Record<
	ENUM_ORDER_TYPE_OPTIONS_TYPE,
	BadgeVariant
> = {
	[ENUM_ORDER_TYPE_OPTIONS.REGULAR]: "blue",
	[ENUM_ORDER_TYPE_OPTIONS.VIP]: "orange",
	[ENUM_ORDER_TYPE_OPTIONS.GROUP]: "green"
};
