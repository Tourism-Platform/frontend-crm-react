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
}
