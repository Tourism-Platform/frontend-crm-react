import { type ENUM_ORDER_STATUS_TYPE } from "./order-status.types";

export interface IOrderDates {
	from: string;
	to: string;
}

export interface IOrder {
	orderId: string;
	orderType: string;
	dateCreated: string;
	client: string;
	clientType: string;
	pax: number;
	dates: IOrderDates;
	// New fields
	tourName: string;
	duration: string;
	route: string;
	comment?: string;
	email: string;
	phone: string;
	roomType?: string;
	carClass?: string;
	status: ENUM_ORDER_STATUS_TYPE;
}
