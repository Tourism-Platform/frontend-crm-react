import type { ISupplierPayment } from "@/entities/finance";

export const SUPPLIER_PAYMENTS_MOCK: ISupplierPayment[] = [
	{
		id: "1",
		orderId: "RQA00001",
		component: "Flight from London to Ta...",
		type: "Transportation (flight)",
		supplier: "Aviakassa",
		dateCreated: "10/10/2024",
		amount: 2100.0,
		currency: "USD",
		manager: "Madina T.",
		status: "confirmed"
	},
	{
		id: "2",
		orderId: "RQA00001",
		component: "Hilton Hotel",
		type: "Accommodation",
		supplier: '"LLC" Hilton',
		dateCreated: "10/10/2024",
		amount: 5600.0,
		currency: "USD",
		manager: "Madina T.",
		status: "recorded"
	},
	{
		id: "3",
		orderId: "RQA00001",
		component: "Meals",
		type: "Package",
		supplier: "Aviakassa",
		dateCreated: "10/10/2024",
		amount: 2100.0,
		currency: "USD",
		manager: "Madina T.",
		status: "confirmed"
	},
	{
		id: "4",
		orderId: "RQA00002",
		component: "Hotel Uzbekistan",
		type: "Accommodation",
		supplier: "-",
		dateCreated: "10/10/2024",
		amount: 2100.0,
		currency: "USD",
		manager: "Madina T.",
		status: "confirmed"
	},
	{
		id: "5",
		orderId: "RQA00002",
		component: 'Cafe "OSHKAND"',
		type: "Activity",
		supplier: "-",
		dateCreated: "10/10/2024",
		amount: 1100.0,
		currency: "USD",
		manager: "Madina T.",
		status: "confirmed"
	},
	{
		id: "6",
		orderId: "RQA00002",
		component: "Disneyland",
		type: "Activity",
		supplier: "-",
		dateCreated: "10/10/2024",
		amount: 1100.0,
		currency: "USD",
		manager: "Madina T.",
		status: "confirmed"
	},
	{
		id: "7",
		orderId: "RQA00002",
		component: "Transfer Tour Day 1 + Din...",
		type: "Transfer",
		supplier: '"LLC" DARAUZ',
		dateCreated: "10/10/2024",
		amount: 2000.0,
		currency: "USD",
		manager: "Madina T.",
		status: "confirmed"
	}
];
