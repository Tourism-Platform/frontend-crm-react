import { type TOrdersPageKeys } from "@/shared/config";

import { type ENUM_ORDER_STATUS_TYPE } from "@/entities/booking";

export interface IOrderTabs {
	label: TOrdersPageKeys;
	value: ENUM_ORDER_STATUS_TYPE;
}
