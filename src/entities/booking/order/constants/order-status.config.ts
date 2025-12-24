import { type TOrderIdPageKeys } from "@/shared/config";

import { ENUM_ORDER_STATUS, type ENUM_ORDER_STATUS_TYPE } from "../types";

export const ORDER_STATUS_LABELS: Record<
	ENUM_ORDER_STATUS_TYPE,
	TOrderIdPageKeys
> = {
	[ENUM_ORDER_STATUS.NEW]: "statuses.new",
	[ENUM_ORDER_STATUS.IN_PROCESSING]: "statuses.in_processing",
	[ENUM_ORDER_STATUS.BOOKING]: "statuses.booking",
	[ENUM_ORDER_STATUS.IN_PROGRESS]: "statuses.in_progress",
	[ENUM_ORDER_STATUS.COMPLETED]: "statuses.completed",
	[ENUM_ORDER_STATUS.CANCELLED]: "statuses.cancelled"
};

export const ORDER_STATUS_VARIANTS: Record<ENUM_ORDER_STATUS_TYPE, string> = {
	[ENUM_ORDER_STATUS.NEW]: "blue",
	[ENUM_ORDER_STATUS.IN_PROCESSING]: "yellow",
	[ENUM_ORDER_STATUS.BOOKING]: "orange",
	[ENUM_ORDER_STATUS.IN_PROGRESS]: "cyan",
	[ENUM_ORDER_STATUS.COMPLETED]: "green",
	[ENUM_ORDER_STATUS.CANCELLED]: "red"
};
