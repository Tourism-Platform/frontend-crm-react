import {
	ENUM_CLIENT_TYPE_OPTIONS,
	ENUM_GENDER_OPTIONS,
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPE_OPTIONS
} from "@/entities/booking";
import { type IOrder } from "@/entities/booking/order/types";

export const ORDERS_MOCK: IOrder[] = [
	{
		orderId: "RQA00001",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "20.08.2025",
		client: "Danda Fisher",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
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
		status: ENUM_ORDER_STATUS.NEW,
		tourReview: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,756.99",
				estimatedRevenue: "$456.99",
				type: "flight"
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,243.99 - $4,444.99",
				estimatedRevenue: "$456.99 - $480.99",
				type: "accommodation",
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: "activity",
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Davron Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "1",
				fullName: "Saimon Bill",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "13/05/1988",
				passportNumber: "13213467",
				expiredDate: "13/05/2029",
				items: []
			},
			{
				id: "2",
				fullName: "Amanda Jally",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "17/01/1999",
				passportNumber: "13289067",
				expiredDate: "17/01/2029",
				items: [
					{
						id: "2-1",
						type: "comment",
						value: "The passenger has a strong allergy to peanuts and nuts. Please ensure that all meals provided are completely nut-free and that no cross-contamination occurs during preparation."
					},
					{
						id: "2-2",
						type: "file",
						value: "Passport Amanda Jally.pdf",
						metadata: {
							fileName: "Passport Amanda Jally.pdf",
							fileSize: "94 KB"
						}
					}
				]
			},
			{
				id: "3",
				fullName: "Amad Diallo",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "20/09/1992",
				passportNumber: "89213467",
				expiredDate: "20/09/2029",
				items: []
			}
		]
	},
	{
		orderId: "RQA00005",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "20.08.2025",
		client: "Bender",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
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
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		tourReview: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,756.99",
				estimatedRevenue: "$456.99",
				type: "flight"
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,243.99 - $4,444.99",
				estimatedRevenue: "$456.99 - $480.99",
				type: "accommodation",
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: "activity",
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Davron Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		}
	},
	{
		orderId: "RQA00006",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "21.08.2025",
		client: "Smith",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
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
		status: ENUM_ORDER_STATUS.BOOKING,
		tourReview: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,756.99",
				estimatedRevenue: "$456.99",
				type: "flight"
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,243.99 - $4,444.99",
				estimatedRevenue: "$456.99 - $480.99",
				type: "accommodation",
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: "activity",
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Davron Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		}
	},
	{
		orderId: "RQA00007",
		orderType: ENUM_ORDER_TYPE_OPTIONS.GROUP,
		dateCreated: "22.08.2025",
		client: "Johnson Corp",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.CORPORATE,
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
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		tourReview: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,756.99",
				estimatedRevenue: "$456.99",
				type: "flight"
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,243.99 - $4,444.99",
				estimatedRevenue: "$456.99 - $480.99",
				type: "accommodation",
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: "activity",
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Davron Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		}
	},
	{
		orderId: "RQA00008",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "23.08.2025",
		client: "Williams",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
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
		status: ENUM_ORDER_STATUS.COMPLETED,
		tourReview: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,756.99",
				estimatedRevenue: "$456.99",
				type: "flight"
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,243.99 - $4,444.99",
				estimatedRevenue: "$456.99 - $480.99",
				type: "accommodation",
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: "activity",
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Davron Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		}
	},
	{
		orderId: "RQA00009",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "24.08.2025",
		client: "Brown",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
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
		status: ENUM_ORDER_STATUS.CANCELLED,
		tourReview: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,756.99",
				estimatedRevenue: "$456.99",
				type: "flight"
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,243.99 - $4,444.99",
				estimatedRevenue: "$456.99 - $480.99",
				type: "accommodation",
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99",
						estimatedRevenue: "$456.99",
						type: "accommodation"
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: "activity",
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Davron Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: "accommodation"
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		}
	}
];
