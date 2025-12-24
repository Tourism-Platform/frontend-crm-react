import { type TOrderIdPageKeys, type TOrdersPageKeys } from "@/shared/config";

import {
	ENUM_ORDER_TYPE_OPTIONS,
	type ENUM_ORDER_TYPE_OPTIONS_TYPE
} from "../types";

export const ORDER_TYPE_LABELS: Record<
	ENUM_ORDER_TYPE_OPTIONS_TYPE,
	TOrdersPageKeys
> = {
	[ENUM_ORDER_TYPE_OPTIONS.REGULAR]: "table.orderTypes.regular",
	[ENUM_ORDER_TYPE_OPTIONS.VIP]: "table.orderTypes.vip",
	[ENUM_ORDER_TYPE_OPTIONS.GROUP]: "table.orderTypes.group"
};

export const ORDER_TYPE_LABELS_ID: Record<
	ENUM_ORDER_TYPE_OPTIONS_TYPE,
	TOrderIdPageKeys
> = {
	[ENUM_ORDER_TYPE_OPTIONS.REGULAR]: "order_info.types.regular",
	[ENUM_ORDER_TYPE_OPTIONS.VIP]: "order_info.types.vip",
	[ENUM_ORDER_TYPE_OPTIONS.GROUP]: "order_info.types.group"
};
