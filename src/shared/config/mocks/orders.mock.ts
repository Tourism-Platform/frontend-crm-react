import type { IOrder } from "@/entities/booking";

export const ORDERS_MOCK: IOrder[] = [
	{
		orderId: "RQA00001",
		orderType: "Regular",
		dateCreated: "20.08.2025",
		client: "Danda Fisher",
		clientType: "Agency",
		pax: 20,
		dates: {
			from: "09.09.2025",
			to: "17.09.2025"
		},
		tourName: "Uzbekistan Cultural Tour",
		duration: "8 days / 7 nights",
		route: "Tashkent-Samarkand-Bukhara-Tashkent",
		comment: "Need a car with a child seat",
		email: "Danda@gmail.com",
		phone: "+7 943 123 12 22",
		roomType: "Standart suite",
		carClass: "Comfort",
		status: "new"
	},
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
		},
		tourName: "Classic Tour",
		duration: "10 days",
		route: "Standard Route",
		email: "bender@example.com",
		phone: "+123456789",
		status: "accepted"
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
		},
		tourName: "Luxury Getaway",
		duration: "10 days",
		route: "Scenic Route",
		email: "smith@example.com",
		phone: "+987654321",
		status: "pending"
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
		},
		tourName: "Team Building",
		duration: "11 days",
		route: "Adventure Trail",
		email: "corp@example.com",
		phone: "+1122334455",
		status: "new"
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
		},
		tourName: "Family Vacation",
		duration: "11 days",
		route: "Coast to Coast",
		email: "williams@example.com",
		phone: "+5544332211",
		status: "rejected"
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
		},
		tourName: "Private Escapade",
		duration: "8 days",
		route: "Hidden Gems",
		email: "brown@example.com",
		phone: "+9988776655",
		status: "accepted"
	}
];
