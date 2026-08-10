import type { ENUM_CLIENT_TYPE_OPTIONS_TYPE } from "./client-type.types";
import type { ENUM_ORDER_STATUS_TYPE } from "./order-status.types";
import type { ENUM_ORDER_TYPE_OPTIONS_TYPE } from "./order-type.types";
import type { IOrderDates } from "./order.interface";

export type TBookingOrderSelectOption = {
	label: string;
	value: string;
	orderNumber?: string;
	client: string;
	clientType: ENUM_CLIENT_TYPE_OPTIONS_TYPE;
	tourName: string;
	orderType: ENUM_ORDER_TYPE_OPTIONS_TYPE;
	dates: IOrderDates;
	pax: number;
	status: ENUM_ORDER_STATUS_TYPE;
	dateCreated: string;
};
