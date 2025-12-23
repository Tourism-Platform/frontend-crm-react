import type { IOrder } from "@/entities/booking";

export const ORDERS_MOCK: IOrder[] = [
	{
		orderId: "RQA00005",
		orderType: "Regular",
		dateCreated: "20.08.2025",
		client: "Bender",
		clientType: "Agency",
		pax: 20,
		dates: {
			from: "24.08.2025",
			to: "05.09.2025"
		}
	},
	{
		orderId: "RQA00006",
		orderType: "VIP",
		dateCreated: "21.08.2025",
		client: "Smith",
		clientType: "Direct",
		pax: 4,
		dates: {
			from: "01.09.2025",
			to: "10.09.2025"
		}
	},
	{
		orderId: "RQA00007",
		orderType: "Group",
		dateCreated: "22.08.2025",
		client: "Johnson Corp",
		clientType: "Corporate",
		pax: 50,
		dates: {
			from: "15.09.2025",
			to: "25.09.2025"
		}
	},
	{
		orderId: "RQA00008",
		orderType: "Regular",
		dateCreated: "23.08.2025",
		client: "Williams",
		clientType: "Agency",
		pax: 8,
		dates: {
			from: "10.10.2025",
			to: "20.10.2025"
		}
	},
	{
		orderId: "RQA00009",
		orderType: "VIP",
		dateCreated: "24.08.2025",
		client: "Brown",
		clientType: "Direct",
		pax: 2,
		dates: {
			from: "05.11.2025",
			to: "12.11.2025"
		}
	}
];
