import {
	ENUM_CLIENT_TYPE_OPTIONS,
	ENUM_GENDER_OPTIONS,
	ENUM_INVOICE_STATUS,
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPE_OPTIONS
} from "@/entities/booking";
import { type IOrder } from "@/entities/booking";

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
	},
	// IN_PROCESSING (3 items)
	{
		orderId: "RQA00010",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "25.08.2025",
		client: "Processing Client 1",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "01.12.2025", to: "10.12.2025" },
		tourName: "Winter Wonderland",
		duration: "10 days",
		route: "North Pole",
		email: "proc1@test.com",
		phone: "+11111111",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		isAvailable: true,
		manager: "Manager A",
		tourReview: [],
		tourSummary: {
			revenue: { from: 1000, to: 2000 },
			profit: { from: 100, to: 200 }
		}
	},
	{
		orderId: "RQA00011",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "26.08.2025",
		client: "Processing Client 2",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 3,
		dates: { from: "05.12.2025", to: "15.12.2025" },
		tourName: "Ski Trip",
		duration: "10 days",
		route: "Alps",
		email: "proc2@test.com",
		phone: "+22222222",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		isAvailable: false,
		manager: "Manager B",
		tourReview: [],
		tourSummary: {
			revenue: { from: 1500, to: 2500 },
			profit: { from: 150, to: 250 }
		}
	},
	{
		orderId: "RQA00012",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "27.08.2025",
		client: "Processing Client 3",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: { from: "10.12.2025", to: "20.12.2025" },
		tourName: "City Tour",
		duration: "10 days",
		route: "Paris",
		email: "proc3@test.com",
		phone: "+33333333",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		isAvailable: true,
		manager: "Manager A",
		tourReview: [],
		tourSummary: {
			revenue: { from: 1200, to: 2200 },
			profit: { from: 120, to: 220 }
		}
	},
	// BOOKING (3 items)
	{
		orderId: "RQA00013",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "28.08.2025",
		client: "Booking Client 1",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 4,
		dates: { from: "15.01.2026", to: "25.01.2026" },
		tourName: "Safari",
		duration: "10 days",
		route: "Kenya",
		email: "book1@test.com",
		phone: "+44444444",
		status: ENUM_ORDER_STATUS.BOOKING,
		manager: "Manager B",
		tourReview: [],
		tourSummary: {
			revenue: { from: 3000, to: 4000 },
			profit: { from: 300, to: 400 }
		}
	},
	{
		orderId: "RQA00014",
		orderType: ENUM_ORDER_TYPE_OPTIONS.GROUP,
		dateCreated: "29.08.2025",
		client: "Booking Client 2",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.CORPORATE,
		pax: 10,
		dates: { from: "01.02.2026", to: "10.02.2026" },
		tourName: "Conference",
		duration: "9 days",
		route: "Dubai",
		email: "book2@test.com",
		phone: "+55555555",
		status: ENUM_ORDER_STATUS.BOOKING,
		manager: "Manager C",
		tourReview: [],
		tourSummary: {
			revenue: { from: 5000, to: 6000 },
			profit: { from: 500, to: 600 }
		}
	},
	{
		orderId: "RQA00015",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "30.08.2025",
		client: "Booking Client 3",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "10.02.2026", to: "20.02.2026" },
		tourName: "Honeymoon",
		duration: "10 days",
		route: "Maldives",
		email: "book3@test.com",
		phone: "+66666666",
		status: ENUM_ORDER_STATUS.BOOKING,
		manager: "Manager A",
		tourReview: [],
		tourSummary: {
			revenue: { from: 4000, to: 5000 },
			profit: { from: 400, to: 500 }
		}
	},
	// IN_PROGRESS (3 items)
	{
		orderId: "RQA00016",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "01.09.2025",
		client: "Progress Client 1",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "01.09.2025", to: "10.09.2025" },
		tourName: "Beach Holiday",
		duration: "9 days",
		route: "Bali",
		email: "prog1@test.com",
		phone: "+77777777",
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		manager: "Manager C",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		tourReview: [],
		tourSummary: {
			revenue: { from: 2000, to: 3000 },
			profit: { from: 200, to: 300 }
		}
	},
	{
		orderId: "RQA00017",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "02.09.2025",
		client: "Progress Client 2",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 3,
		dates: { from: "05.09.2025", to: "15.09.2025" },
		tourName: "Cultural Trip",
		duration: "10 days",
		route: "Kyoto",
		email: "prog2@test.com",
		phone: "+88888888",
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		manager: "Manager B",
		invoiceStatus: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		tourReview: [],
		tourSummary: {
			revenue: { from: 2500, to: 3500 },
			profit: { from: 250, to: 350 }
		}
	},
	{
		orderId: "RQA00018",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "03.09.2025",
		client: "Progress Client 3",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: { from: "10.09.2025", to: "20.09.2025" },
		tourName: "Solo Adventure",
		duration: "10 days",
		route: "Patagonia",
		email: "prog3@test.com",
		phone: "+99999999",
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		manager: "Manager A",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		tourReview: [],
		tourSummary: {
			revenue: { from: 1800, to: 2800 },
			profit: { from: 180, to: 280 }
		}
	},
	// COMPLETED (3 items)
	{
		orderId: "RQA00019",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "01.08.2025",
		client: "Completed Client 1",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "10.08.2025", to: "20.08.2025" },
		tourName: "Summer Break",
		duration: "10 days",
		route: "Spain",
		email: "comp1@test.com",
		phone: "+10101010",
		status: ENUM_ORDER_STATUS.COMPLETED,
		manager: "Manager C",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		tourReview: [],
		tourSummary: {
			revenue: { from: 2200, to: 3200 },
			profit: { from: 220, to: 320 }
		}
	},
	{
		orderId: "RQA00020",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "05.08.2025",
		client: "Completed Client 2",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 4,
		dates: { from: "15.08.2025", to: "25.08.2025" },
		tourName: "Family Fun",
		duration: "10 days",
		route: "Florida",
		email: "comp2@test.com",
		phone: "+20202020",
		status: ENUM_ORDER_STATUS.COMPLETED,
		manager: "Manager B",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		tourReview: [],
		tourSummary: {
			revenue: { from: 4000, to: 5000 },
			profit: { from: 400, to: 500 }
		}
	},
	{
		orderId: "RQA00021",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "10.08.2025",
		client: "Completed Client 3",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "20.08.2025", to: "30.08.2025" },
		tourName: "Luxury Cruise",
		duration: "10 days",
		route: "Mediterranean",
		email: "comp3@test.com",
		phone: "+30303030",
		status: ENUM_ORDER_STATUS.COMPLETED,
		manager: "Manager A",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		tourReview: [],
		tourSummary: {
			revenue: { from: 8000, to: 9000 },
			profit: { from: 800, to: 900 }
		}
	},
	// CANCELLED (3 items)
	{
		orderId: "RQA00022",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "01.09.2025",
		client: "Cancelled Client 1",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "01.10.2025", to: "10.10.2025" },
		tourName: "Fall Trip",
		duration: "9 days",
		route: "New England",
		email: "can1@test.com",
		phone: "+40404040",
		status: ENUM_ORDER_STATUS.CANCELLED,
		report: "Client personal reasons",
		tourReview: [],
		tourSummary: { revenue: { from: 0, to: 0 }, profit: { from: 0, to: 0 } }
	},
	{
		orderId: "RQA00023",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "02.09.2025",
		client: "Cancelled Client 2",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 3,
		dates: { from: "05.10.2025", to: "15.10.2025" },
		tourName: "Mountain Hike",
		duration: "10 days",
		route: "Rockies",
		email: "can2@test.com",
		phone: "+50505050",
		status: ENUM_ORDER_STATUS.CANCELLED,
		report: "Visa rejection",
		tourReview: [],
		tourSummary: { revenue: { from: 0, to: 0 }, profit: { from: 0, to: 0 } }
	},
	{
		orderId: "RQA00024",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "03.09.2025",
		client: "Cancelled Client 3",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: { from: "10.10.2025", to: "20.10.2025" },
		tourName: "Business Trip",
		duration: "10 days",
		route: "London",
		email: "can3@test.com",
		phone: "+60606060",
		status: ENUM_ORDER_STATUS.CANCELLED,
		report: "Meeting cancelled",
		tourReview: [],
		tourSummary: { revenue: { from: 0, to: 0 }, profit: { from: 0, to: 0 } }
	}
];
