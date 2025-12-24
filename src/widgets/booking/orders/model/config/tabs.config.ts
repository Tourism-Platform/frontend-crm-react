import { ENUM_ORDER_STATUS } from "@/entities/booking";

import { type IOrderTabs } from "../types";

export const ORDER_TABS_LIST: IOrderTabs[] = [
	{ label: "statuses.new", value: ENUM_ORDER_STATUS.NEW },
	{
		label: "statuses.in_processing",
		value: ENUM_ORDER_STATUS.IN_PROCESSING
	},
	{ label: "statuses.booking", value: ENUM_ORDER_STATUS.BOOKING },
	{ label: "statuses.in_progress", value: ENUM_ORDER_STATUS.IN_PROGRESS },
	{ label: "statuses.completed", value: ENUM_ORDER_STATUS.COMPLETED },
	{ label: "statuses.cancelled", value: ENUM_ORDER_STATUS.CANCELLED }
];
