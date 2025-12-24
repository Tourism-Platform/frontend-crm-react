import {
	ENUM_CLIENT_TYPE_OPTIONS,
	ENUM_GENDER_OPTIONS,
	ENUM_INVOICE_STATUS,
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPE_OPTIONS
} from "@/entities/booking";
import { type IOrder } from "@/entities/booking";
import { ENUM_SUPPLIER_PAYMENT_STATUS } from "@/entities/finance";
import { ENUM_EVENT } from "@/entities/tour";

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
				item: "International Flight: London - Tashkent",
				supplier: "Emirates",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Central Hotel Tashkent",
				supplier: "Central Hotel Group",
				plannedCost: "$800.00",
				estimatedRevenue: "$80.00",
				type: ENUM_EVENT.ACCOMMODATION
			},
			{
				id: "3",
				item: "City Tour with Guide",
				supplier: "Local Tours LLC",
				plannedCost: "$300.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.ACTIVITY
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Flight Deposit",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 600.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			},
			{
				id: "2",
				item: "Hotel Reservation",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			},
			{
				id: "3",
				item: "Guide Booking",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
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
				items: []
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
		orderId: "RQA00002",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "21.08.2025",
		client: "John Wick",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: {
			from: "20.10.2025",
			to: "25.10.2025"
		},
		tourName: "Secret Mission Tour",
		duration: "6 days",
		route: "Rome-Paris",
		email: "wick@continental.com",
		phone: "+1 555 000 000",
		status: ENUM_ORDER_STATUS.NEW,
		tourReview: [
			{
				id: "1",
				item: "Private Jet: NY - Rome",
				supplier: "Continental Air",
				plannedCost: "$15,000.00",
				estimatedRevenue: "$2,000.00",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Hotel Continental Rome",
				supplier: "Continental Hotels",
				plannedCost: "$3,000.00",
				estimatedRevenue: "$500.00",
				type: ENUM_EVENT.ACCOMMODATION
			},
			{
				id: "3",
				item: "Special Equipment Rental",
				supplier: "Sommelier",
				plannedCost: "$5,000.00",
				estimatedRevenue: "$1,000.00",
				type: ENUM_EVENT.ACTIVITY
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Jet Charter Deposit",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 7500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			},
			{
				id: "2",
				item: "Hotel Rome Reservation",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 1500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			}
		],
		tourSummary: {
			revenue: { from: 25000, to: 30000 },
			profit: { from: 5000, to: 7000 }
		},
		paxDetails: [
			{
				id: "1",
				fullName: "John Wick",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "02/09/1964",
				passportNumber: "JW777777",
				expiredDate: "02/09/2044",
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
				item: "Regional Flight: Tashkent - Bukhara",
				supplier: "Uzbekistan Airways",
				plannedCost: "$150.00",
				estimatedRevenue: "$20.00",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Bukhara Palace Hotel",
				supplier: "Palace Hotels",
				plannedCost: "$600.00",
				estimatedRevenue: "$60.00",
				type: ENUM_EVENT.ACCOMMODATION
			},
			{
				id: "3",
				item: "Historical Sites Entrance",
				supplier: "Ministry of Culture",
				plannedCost: "$50.00",
				estimatedRevenue: "$5.00",
				type: ENUM_EVENT.ACTIVITY
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Flight Ticket Bukhara",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "flight_bukhara_rqa05.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Hotel Bukhara Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 300.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "hotel_bukhara_rqa05.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Activity Advance",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 50.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "1",
				fullName: "Bender Rodriguez",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Robot",
				dateOfBirth: "01/01/2999",
				passportNumber: "R000001",
				expiredDate: "01/01/3999",
				items: []
			},
			{
				id: "2",
				fullName: "Philip J. Fry",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Earth",
				dateOfBirth: "14/08/1974",
				passportNumber: "E000002",
				expiredDate: "14/08/2029",
				items: []
			},
			{
				id: "3",
				fullName: "Turanga Leela",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Mutant",
				dateOfBirth: "20/09/2975",
				passportNumber: "M000003",
				expiredDate: "20/09/3999",
				items: []
			}
		]
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
				item: "International Flight: New York - Tashkent",
				supplier: "Delta",
				plannedCost: "$2,500.00",
				estimatedRevenue: "$300.00",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Lotte City Hotel Tashkent",
				supplier: "Lotte Hotels",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.ACCOMMODATION
			},
			{
				id: "3",
				item: "Mountain Day Trip",
				supplier: "Adventure Uzbekistan",
				plannedCost: "$400.00",
				estimatedRevenue: "$60.00",
				type: ENUM_EVENT.ACTIVITY
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Flight: NYC - TAS",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 2500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "flight_ticket_rqa06.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Hotel: Lotte City Tashkent",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 1200.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "hotel_voucher_rqa06.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Guide: Mountain Trip",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "guide_conf.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "4",
				item: "Airport Transfer",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "1",
				fullName: "John Smith",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "12/12/1980",
				passportNumber: "AB123456",
				expiredDate: "12/12/2030",
				items: []
			},
			{
				id: "2",
				fullName: "Mary Smith",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "05/05/1985",
				passportNumber: "CD789012",
				expiredDate: "05/05/2035",
				items: []
			}
		]
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
				item: "Group Flight: Berlin - Tashkent",
				supplier: "Lufthansa",
				plannedCost: "$15,000.00",
				estimatedRevenue: "$2,000.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "2",
				item: "Hyatt Regency Tashkent",
				supplier: "Hyatt Group",
				plannedCost: "$10,000.00",
				estimatedRevenue: "$1,500.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "3",
				item: "Bukhara Overnight Stay",
				supplier: "Bukhara Boutique",
				plannedCost: "$5,000.00",
				estimatedRevenue: "$800.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: false
			},
			{
				id: "4",
				item: "Guided Samarkand Tour",
				supplier: "Samarkand Guides",
				plannedCost: "$2,000.00",
				estimatedRevenue: "$400.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Flight: Group Berlin-TAS",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 15000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "group_flight_rqa07.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Hotel: Hyatt Taskent",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 10000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "hyatt_confirmation_rqa07.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Activity: Samarkand Guide",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 2000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "1",
				fullName: "Alice Johnson",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Germany",
				dateOfBirth: "05/05/1990",
				passportNumber: "G1234567",
				expiredDate: "05/05/2030",
				items: []
			},
			{
				id: "2",
				fullName: "Bob Schultz",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Germany",
				dateOfBirth: "10/10/1988",
				passportNumber: "G7654321",
				expiredDate: "10/10/2028",
				items: []
			}
		]
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
				item: "Family Flight: London - Coast",
				supplier: "British Airways",
				plannedCost: "$3,000.00",
				estimatedRevenue: "$400.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "2",
				item: "Coastline Resort",
				supplier: "Resort Group",
				plannedCost: "$2,000.00",
				estimatedRevenue: "$300.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "3",
				item: "City Sightseeing",
				supplier: "City Tours",
				plannedCost: "$500.00",
				estimatedRevenue: "$75.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Flight: BA777",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 3000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "ba_ticket_rqa08.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Resort Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 2000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "resort_voucher_rqa08.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Tour Operator Fee",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "1",
				fullName: "George Williams",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "01/01/1970",
				passportNumber: "W111111",
				expiredDate: "01/01/2040",
				items: []
			},
			{
				id: "2",
				fullName: "Sarah Williams",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "02/02/1975",
				passportNumber: "W222222",
				expiredDate: "02/02/2045",
				items: []
			}
		]
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
		report: "Order cancelled by client request.",
		tourReview: [
			{
				id: "1",
				item: "Cancelled Flight",
				supplier: "Air France",
				plannedCost: "$1,500.00",
				estimatedRevenue: "$0.00",
				type: ENUM_EVENT.FLIGHT
			}
		],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: []
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
				item: "Multiply option",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.MULTIPLY_OPTION,
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
		supplierPayments: [
			{
				id: "1",
				item: "Flight: London-Tashkent",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 4756.99,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "flight_ticket.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Hotel: Hilton",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 4444.99,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "hotel_booking.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Meals: Catering",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 2314.99,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			}
		],
		paxDetails: [
			{
				id: "1",
				fullName: "Kevin Hart",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "06/07/1979",
				passportNumber: "KH123456",
				expiredDate: "06/07/2029",
				items: []
			},
			{
				id: "2",
				fullName: "Eniko Hart",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "18/08/1984",
				passportNumber: "EH654321",
				expiredDate: "18/08/2034",
				items: []
			},
			{
				id: "3",
				fullName: "Heaven Hart",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "14/03/2005",
				passportNumber: "HH987654",
				expiredDate: "14/03/2025",
				items: []
			}
		],
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
		tourReview: [
			{
				id: "1",
				item: "Safari Adventure",
				supplier: "Kenya Safari Ltd",
				plannedCost: "$2,000.00",
				estimatedRevenue: "$200.00",
				type: ENUM_EVENT.ACTIVITY
			},
			{
				id: "2",
				item: "Safari Lodge",
				supplier: "Wilderness Lodges",
				plannedCost: "$1,500.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.ACCOMMODATION
			},
			{
				id: "3",
				item: "Local Logistics",
				supplier: "Kenya Transports",
				plannedCost: "$500.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.TRANSPORTATION
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Safari Booking",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 1800.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			},
			{
				id: "2",
				item: "Lodge Advance",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 1300.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "lodge_rec.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Jeep Rental",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 450.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "jeep_booking.pdf",
					fileUrl: "#"
				}
			}
		],
		paxDetails: [
			{
				id: "1",
				fullName: "Michael Jordan",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "17/02/1963",
				passportNumber: "MJ232323",
				expiredDate: "17/02/2033",
				items: []
			},
			{
				id: "2",
				fullName: "Scottie Pippen",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "25/09/1965",
				passportNumber: "SP333333",
				expiredDate: "25/09/2035",
				items: []
			}
		],
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
		tourReview: [
			{
				id: "1",
				item: "Bali Flight: Denpasar",
				supplier: "Qatar Airways",
				plannedCost: "$2,000.00",
				estimatedRevenue: "$200.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "2",
				item: "Beachfront Villa",
				supplier: "Island Villas",
				plannedCost: "$3,000.00",
				estimatedRevenue: "$300.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "3",
				item: "Diving Session",
				supplier: "Bali Divers",
				plannedCost: "$200.00",
				estimatedRevenue: "$30.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			}
		],
		tourSummary: {
			revenue: { from: 2000, to: 3000 },
			profit: { from: 200, to: 300 }
		},
		supplierPayments: [
			{
				id: "1",
				item: "Bali Flight",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 1800.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "bali_flight.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Villa Booking",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 2500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "villa_rec.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Excursion: Volcano",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 120.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "volcano_conf.pdf",
					fileUrl: "#"
				}
			}
		],
		paxDetails: [
			{
				id: "1",
				fullName: "Bob Smith",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Australia",
				dateOfBirth: "01/01/1985",
				passportNumber: "AU987654",
				expiredDate: "01/01/2030",
				items: []
			}
		]
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
		tourReview: [
			{
				id: "1",
				item: "Kyoto Temple Visit",
				supplier: "Kyoto Tours",
				plannedCost: "$500.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "2",
				item: "Tea Ceremony",
				supplier: "Tradition tea",
				plannedCost: "$200.00",
				estimatedRevenue: "$30.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "3",
				item: "Ryokan Stay",
				supplier: "Kyoto Ryokan",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Temple Visit Fee",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 450.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "kyoto_receipt.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Tea Ceremony Payment",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 170.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "tea_conf.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Ryokan Deposit",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "ryokan_rqa17.pdf",
					fileUrl: "#"
				}
			}
		],
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
		tourReview: [
			{
				id: "1",
				item: "Patagonia Trekking",
				supplier: "Andes Adventure",
				plannedCost: "$2,500.00",
				estimatedRevenue: "$250.00",
				type: ENUM_EVENT.ACTIVITY
			},
			{
				id: "2",
				item: "Eco Lodge Patagonia",
				supplier: "Eco Stay",
				plannedCost: "$1,800.00",
				estimatedRevenue: "$200.00",
				type: ENUM_EVENT.ACCOMMODATION
			},
			{
				id: "3",
				item: "Mountain Equipment Rental",
				supplier: "Gear Up",
				plannedCost: "$300.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.ACTIVITY
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "National Park Fees",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 300.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			},
			{
				id: "2",
				item: "Lodge Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 1800.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED
			},
			{
				id: "3",
				item: "Equip Rental Deposit",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			}
		],
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
		tourReview: [
			{
				id: "1",
				item: "Spain Summer Tour",
				supplier: "Tui Spain",
				plannedCost: "$3,000.00",
				estimatedRevenue: "$300.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "2",
				item: "Hotel Arts Barcelona",
				supplier: "Marriott",
				plannedCost: "$2,500.00",
				estimatedRevenue: "$250.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "3",
				item: "Local Flight: Madrid-Barcelona",
				supplier: "Iberia",
				plannedCost: "$400.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			}
		],
		tourSummary: {
			revenue: { from: 2200, to: 3200 },
			profit: { from: 220, to: 320 }
		},
		supplierPayments: [
			{
				id: "1",
				item: "Spain Hotel",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 2000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "spain_voucher.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Local Flight",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					fileName: "local_flight.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "City Tour Guide",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 300.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					fileName: "guide_spain.pdf",
					fileUrl: "#"
				}
			}
		]
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
		tourReview: [
			{
				id: "1",
				item: "Disney World Tickets",
				supplier: "Disney",
				plannedCost: "$1,000.00",
				estimatedRevenue: "$100.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "2",
				item: "Disney Hotel Stay",
				supplier: "Disney Resorts",
				plannedCost: "$2,500.00",
				estimatedRevenue: "$250.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "3",
				item: "Orlando City Transfer",
				supplier: "Sunshine Transfers",
				plannedCost: "$500.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Disney Tickets",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 900.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "disney_tickets.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Disney Resort Payout",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 2200.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "resort_rec.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "3",
				item: "Transfer Fee",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 450.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "transfer_rec.pdf",
					fileUrl: "#"
				}
			}
		],
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
		tourReview: [
			{
				id: "1",
				item: "Mediterranean Cruise",
				supplier: "MSC Cruises",
				plannedCost: "$7,000.00",
				estimatedRevenue: "$700.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			},
			{
				id: "2",
				item: "Genoa Luxury Stay",
				supplier: "Grand Hotel Genoa",
				plannedCost: "$1,500.00",
				estimatedRevenue: "$200.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "3",
				item: "Exclusive Vatican Tour",
				supplier: "Rome Guides",
				plannedCost: "$600.00",
				estimatedRevenue: "$100.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "1",
				item: "Cruise Booking",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 6500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
				confirmation: {
					fileName: "msc_boarding.pdf",
					fileUrl: "#"
				}
			},
			{
				id: "2",
				item: "Hotel Genoa Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 1300.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			},
			{
				id: "3",
				item: "Rome Tour Payment",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		paxDetails: [
			{
				id: "1",
				fullName: "Leonardo DiCaprio",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "11/11/1974",
				passportNumber: "LD111111",
				expiredDate: "11/11/2044",
				items: []
			},
			{
				id: "2",
				fullName: "Kate Winslet",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "UK",
				dateOfBirth: "05/10/1975",
				passportNumber: "KW222222",
				expiredDate: "05/10/2045",
				items: []
			}
		],
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
		tourReview: [
			{
				id: "1",
				item: "Cancelled Flight",
				supplier: "Delta Air",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$0.00",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Cancelled Hotel",
				supplier: "Grand Hotel",
				plannedCost: "$800.00",
				estimatedRevenue: "$0.00",
				type: ENUM_EVENT.ACCOMMODATION
			}
		],
		supplierPayments: [],
		tourSummary: {
			revenue: { from: 0, to: 0 },
			profit: { from: 0, to: 0 }
		},
		paxDetails: []
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
