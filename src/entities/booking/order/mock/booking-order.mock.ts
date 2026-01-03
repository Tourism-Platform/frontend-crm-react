import {
	ENUM_CLIENT_TYPE_OPTIONS,
	ENUM_INVOICE_STATUS,
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPE_OPTIONS,
	type IOrder
} from "@/entities/booking";

export const BOOKING_ORDERS_MOCK: IOrder[] = [
	{
		orderId: "RQA00001",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-20T10:00:00Z",
		client: "Skyline Travel Agency",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 20,
		dates: {
			from: "2025-09-09",
			to: "25.09.2025"
		},
		tourName: "Uzbekistan Cultural Tour",
		duration: "8 days / 7 nights",
		route: "Tashkent-Samarkand-Bukhara-Tashkent",
		comment: "Need a car with a child seat",
		email: "info@skylinetravel.com",
		phone: "+7 943 123 12 22",
		roomType: "Standart suite",
		carClass: "Comfort",
		status: ENUM_ORDER_STATUS.NEW,
		manager: "Alex Johnson",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: []
	},
	{
		orderId: "RQA00002",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "2025-08-21T11:00:00Z",
		client: "Continental Services Ltd",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: {
			from: "2025-10-20",
			to: "25.10.2025"
		},
		tourName: "Secret Mission Tour",
		duration: "6 days",
		route: "Rome-Paris",
		email: "concierge@continental.com",
		phone: "+1 555 000 000",
		status: ENUM_ORDER_STATUS.NEW,
		manager: "Winston Scott",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 25000, to: 30000 },
			profit: { from: 5000, to: 7000 }
		},
		paxDetails: []
	},
	{
		orderId: "RQA00005",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-20T12:30:00Z",
		client: "Planet Express Inc.",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 20,
		dates: {
			from: "2025-08-24",
			to: "25.09.2025"
		},
		tourName: "Classic Tour",
		duration: "10 days",
		route: "Standard Route",
		email: "delivery@planetexpress.com",
		phone: "+123456789",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		manager: "Zapp Brannigan",
		invoiceStatus: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: []
	},
	{
		orderId: "RQA00006",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "2025-08-22T09:15:00Z",
		client: "221B Consulting Group",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: {
			from: "2025-11-10",
			to: "25.11.2025"
		},
		tourName: "London Mystery Tour",
		duration: "5 days",
		route: "Baker Street - Dartmoor",
		email: "investigations@221b.com",
		phone: "+44 20 7946 0958",
		status: ENUM_ORDER_STATUS.BOOKING,
		manager: "Mycroft Holmes",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 15000, to: 18000 },
			profit: { from: 3000, to: 4500 }
		},
		paxDetails: []
	},
	{
		orderId: "RQA00007",
		orderType: ENUM_ORDER_TYPE_OPTIONS.GROUP,
		dateCreated: "2025-08-15T14:20:00Z",
		client: "Global Corp Logistics",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.CORPORATE,
		pax: 45,
		dates: {
			from: "2025-12-01",
			to: "25.12.2025"
		},
		tourName: "Year End Retreat",
		duration: "10 days",
		route: "Bali - Ubud",
		email: "corporate-travel@globalcorp.com",
		phone: "+1 800 555 1234",
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		manager: "Sarah Connor",
		invoiceStatus: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 45000, to: 50000 },
			profit: { from: 8000, to: 10000 }
		},
		paxDetails: []
	},
	{
		orderId: "RQA00008",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-07-10T08:00:00Z",
		client: "Wonderland Tours & Events",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 3,
		dates: {
			from: "2025-07-20",
			to: "25.07.2025"
		},
		tourName: "Summer Holiday",
		duration: "7 days",
		route: "Antalya - Kemer",
		email: "events@wonderland.com",
		phone: "+90 555 123 45 67",
		status: ENUM_ORDER_STATUS.COMPLETED,
		manager: "James Bond",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 5000, to: 6000 },
			profit: { from: 1000, to: 1500 }
		},
		paxDetails: []
	},
	{
		orderId: "RQA00009",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-25T16:45:00Z",
		client: "Builder Construction Group",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: {
			from: "2025-09-15",
			to: "25.10.2025"
		},
		tourName: "Business Trip",
		duration: "5 days",
		route: "Berlin - Munich",
		email: "projects@buildercorp.de",
		phone: "+49 30 1234567",
		status: ENUM_ORDER_STATUS.CANCELLED,
		manager: "Ethan Hunt",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 2000, to: 2500 },
			profit: { from: 400, to: 600 }
		},
		paxDetails: []
	}
];
