import { type TOrderIdPageKeys } from "@/shared/config";

import { ENUM_ORDER_STATUS, type ENUM_ORDER_STATUS_TYPE } from "../types";

export const ORDER_STATUS_LABELS: Record<
	ENUM_ORDER_STATUS_TYPE,
	TOrderIdPageKeys
> = {
	[ENUM_ORDER_STATUS.NEW]: "statuses.new",
	[ENUM_ORDER_STATUS.ACCEPTED]: "statuses.accepted",
	[ENUM_ORDER_STATUS.REJECTED]: "statuses.rejected",
	[ENUM_ORDER_STATUS.PENDING]: "statuses.pending"
};

export const ORDER_STATUS_VARIANTS: Record<ENUM_ORDER_STATUS_TYPE, string> = {
	[ENUM_ORDER_STATUS.NEW]: "blue",
	[ENUM_ORDER_STATUS.ACCEPTED]: "green",
	[ENUM_ORDER_STATUS.REJECTED]: "red",
	[ENUM_ORDER_STATUS.PENDING]: "yellow"
};
