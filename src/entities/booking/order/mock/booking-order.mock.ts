import {
	ENUM_CLIENT_TYPE_OPTIONS,
	ENUM_GENDER_OPTIONS,
	ENUM_INVOICE_STATUS,
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPE_OPTIONS,
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type IOrderDetail
} from "@/entities/booking";
import { ENUM_EVENT } from "@/entities/tour";

export const BOOKING_ORDERS_MOCK: IOrderDetail[] = [
	// NEW (2 items)
	{
		orderId: "RQA00001",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-20T10:00:00Z",
		client: "Danda Fisher",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 20,
		dates: {
			from: "2025-09-09",
			to: "2025-09-17"
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
		manager: "Alex Johnson",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: London - Tashkent",
				supplier: "Emirates",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Hotel Selection: Tashkent",
				supplier: "-",
				plannedCost: "$800.00 - $1,200.00",
				estimatedRevenue: "$80.00 - $120.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Central Hotel",
						supplier: "Central Group",
						plannedCost: "$800.00",
						estimatedRevenue: "$80.00",
						type: ENUM_EVENT.ACCOMMODATION
					},
					{
						id: "tr-2-2",
						item: "Hyatt Regency",
						supplier: "Hyatt Group",
						plannedCost: "$1,200.00",
						estimatedRevenue: "$120.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "tr-3",
				item: "City Sightseeing Tour",
				supplier: "Local Tours LLC",
				plannedCost: "$300.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Saimon Bill",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1988-05-13",
				passportNumber: "13213467",
				expiredDate: "2029-05-13",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Passenger requires a child seat."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_bill.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Amanda Jally",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "1999-01-17",
				passportNumber: "13289067",
				expiredDate: "2029-01-17",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Allergy to peanuts."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_jally.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Amad Diallo",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Ivory Coast",
				dateOfBirth: "2002-07-11",
				passportNumber: "AD998877",
				expiredDate: "2032-07-11",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "First time traveler."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_diallo.pdf"
					}
				]
			}
		]
	},
	{
		orderId: "RQA00002",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "2025-08-21T11:00:00Z",
		client: "John Wick",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: {
			from: "2025-10-20",
			to: "2025-10-25"
		},
		tourName: "Secret Mission Tour",
		duration: "6 days",
		route: "Rome-Paris",
		email: "wick@continental.com",
		phone: "+1 555 000 000",
		status: ENUM_ORDER_STATUS.NEW,
		manager: "Winston Scott",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		roomType: "Deluxe Suite",
		carClass: "Business",
		comment: "VIP client, requires discreet service.",
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: London - Tashkent",
				supplier: "Emirates",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Hotel Selection: Tashkent",
				supplier: "-",
				plannedCost: "$800.00 - $1,200.00",
				estimatedRevenue: "$80.00 - $120.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Central Hotel",
						supplier: "Central Group",
						plannedCost: "$800.00",
						estimatedRevenue: "$80.00",
						type: ENUM_EVENT.ACCOMMODATION
					},
					{
						id: "tr-2-2",
						item: "Hyatt Regency",
						supplier: "Hyatt Group",
						plannedCost: "$1,200.00",
						estimatedRevenue: "$120.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			}
		],
		tourSummary: {
			revenue: { from: 25000, to: 30000 },
			profit: { from: 5000, to: 7000 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "John Wick",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1964-09-02",
				passportNumber: "JW777777",
				expiredDate: "2044-09-02",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Special security clearance."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_wick.pdf"
					}
				]
			}
		]
	},
	// IN_PROCESSING (3 items)
	{
		orderId: "RQA00005",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-20T12:30:00Z",
		client: "Bender Rodriguez",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 20,
		dates: {
			from: "2025-08-24",
			to: "2025-09-05"
		},
		tourName: "Classic Tour",
		duration: "10 days",
		route: "Standard Route",
		email: "bender@example.com",
		phone: "+123456789",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		manager: "Zapp Brannigan",
		invoiceStatus: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		isAvailable: true,
		roomType: "Standard Room",
		carClass: "Economy",
		comment: "Client requested vegan meal options.",
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: London - Tashkent",
				supplier: "Emirates",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "tr-2",
				item: "Hotel Selection: Tashkent",
				supplier: "-",
				plannedCost: "$800.00 - $1,200.00",
				estimatedRevenue: "$80.00 - $120.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Central Hotel",
						supplier: "Central Group",
						plannedCost: "$800.00",
						estimatedRevenue: "$80.00",
						type: ENUM_EVENT.ACCOMMODATION,
						isApplied: true
					},
					{
						id: "tr-2-2",
						item: "Hyatt Regency",
						supplier: "Hyatt Group",
						plannedCost: "$1,200.00",
						estimatedRevenue: "$120.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "tr-3",
				item: "Airport Transfer: Tashkent",
				supplier: "Local Transport Co.",
				plannedCost: "$50.00",
				estimatedRevenue: "$10.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			},
			{
				id: "tr-4",
				item: "Car Rental Selection",
				supplier: "-",
				plannedCost: "$200.00 - $350.00",
				estimatedRevenue: "$20.00 - $40.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-4-1",
						item: "Sedan (Toyota)",
						supplier: "Hertz",
						plannedCost: "$200.00",
						estimatedRevenue: "$20.00",
						type: ENUM_EVENT.TRANSPORTATION
					},
					{
						id: "tr-4-2",
						item: "SUV (Chevrolet)",
						supplier: "Local Rent",
						plannedCost: "$350.00",
						estimatedRevenue: "$40.00",
						type: ENUM_EVENT.TRANSPORTATION,
						isApplied: true
					}
				]
			},
			{
				id: "tr-5",
				item: "Guided City Tour",
				supplier: "Uzbek Guides",
				plannedCost: "$150.00",
				estimatedRevenue: "$30.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Flight Ticket Deposit",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 600.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-2",
				item: "Hotel Reservation",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED
			},
			{
				id: "sp-3",
				item: "Hotel Reservation",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED
			}
		],
		tourSummary: {
			revenue: 11500,
			profit: 2750,
			paid: 5000,
			unpaid: 6500
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Bender Rodriguez",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Robot",
				dateOfBirth: "2999-01-01",
				passportNumber: "R000001",
				expiredDate: "3999-01-01",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Loves to bend things."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_bender.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Philip J. Fry",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Earth",
				dateOfBirth: "1974-08-14",
				passportNumber: "E000002",
				expiredDate: "2029-08-14",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Frozen for 1000 years."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_fry.pdf"
					}
				]
			}
		]
	},
	{
		orderId: "RQA00010",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-25T08:00:00Z",
		client: "Processing Client 1",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "2025-12-01", to: "2025-12-10" },
		tourName: "Winter Wonderland",
		duration: "10 days",
		route: "North Pole",
		email: "proc1@test.com",
		phone: "+11111111",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		isAvailable: true,
		manager: "Manager A",
		roomType: "Junior Suite",
		carClass: "Standard",
		comment: "Check snowfall forecast before departure.",
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: Oslo - Oslo",
				supplier: "Norwegian Air",
				plannedCost: "$400.00",
				estimatedRevenue: "$60.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Accommodation: North Pole Lodge",
				supplier: "-",
				plannedCost: "$1,500.00 - $2,500.00",
				estimatedRevenue: "$150.00 - $250.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Standard Igloo",
						supplier: "Igloo Village",
						plannedCost: "$1,500.00",
						estimatedRevenue: "$150.00",
						type: ENUM_EVENT.ACCOMMODATION,
						isApplied: true
					},
					{
						id: "tr-2-2",
						item: "Luxury Ice Suite",
						supplier: "Ice Palace",
						plannedCost: "$2,500.00",
						estimatedRevenue: "$250.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "tr-3",
				item: "Dog Sledding Adventure",
				supplier: "Arctic Dogs",
				plannedCost: "$200.00",
				estimatedRevenue: "$40.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "tr-4",
				item: "Northern Lights Photo Tour",
				supplier: "Aurora Photos",
				plannedCost: "$150.00",
				estimatedRevenue: "$30.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Igloo Rental Deposit",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 750.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			}
		],
		tourSummary: {
			revenue: 1500,
			profit: 150,
			paid: 750,
			unpaid: 750
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Sven Svensson",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Norway",
				dateOfBirth: "1985-05-20",
				passportNumber: "NOR001",
				expiredDate: "2035-05-20",
				items: [
					{
						id: "pi-1",
						type: "file",
						value: "passport_sven.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Ingrid Svensson",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Norway",
				dateOfBirth: "1987-11-12",
				passportNumber: "NOR002",
				expiredDate: "2037-11-12",
				items: [
					{
						id: "pi-2",
						type: "file",
						value: "passport_ingrid.pdf"
					}
				]
			}
		]
	},
	{
		orderId: "RQA00011",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-26T09:00:00Z",
		client: "Processing Client 2",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 3,
		dates: { from: "2025-12-05", to: "2025-12-15" },
		tourName: "Ski Trip",
		duration: "10 days",
		route: "Alps",
		email: "proc2@test.com",
		phone: "+22222222",
		status: ENUM_ORDER_STATUS.IN_PROCESSING,
		isAvailable: false,
		manager: "Manager B",
		roomType: "Single Room",
		carClass: "Compact",
		comment: "Guest bringing own ski equipment.",
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: Zurich - Geneva",
				supplier: "Swiss Air",
				plannedCost: "$300.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Shuttle: Airport to Resort",
				supplier: "Alps Shuttle",
				plannedCost: "$100.00",
				estimatedRevenue: "$20.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			},
			{
				id: "tr-3",
				item: "Ski Pass: 10 Days",
				supplier: "Resort Office",
				plannedCost: "$500.00",
				estimatedRevenue: "$50.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "tr-4",
				item: "Equipment Rental Selection",
				supplier: "-",
				plannedCost: "$200.00 - $400.00",
				estimatedRevenue: "$30.00 - $60.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-4-1",
						item: "Basic Ski Set",
						supplier: "Ski Rental A",
						plannedCost: "$200.00",
						estimatedRevenue: "$30.00",
						type: ENUM_EVENT.ACTIVITY,
						isApplied: true
					},
					{
						id: "tr-4-2",
						item: "Professional Snowboard Set",
						supplier: "Ski Rental B",
						plannedCost: "$400.00",
						estimatedRevenue: "$60.00",
						type: ENUM_EVENT.ACTIVITY
					}
				]
			},
			{
				id: "tr-5",
				item: "Evening Après-Ski Party",
				supplier: "Mountain Bar",
				plannedCost: "$50.00",
				estimatedRevenue: "$10.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Flight Full Payment",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 300.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/ski/fly.pdf",
					fileName: "Ski_Flight.pdf"
				}
			},
			{
				id: "sp-2",
				item: "Hotel Full Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/ski/hotel.pdf",
					fileName: "Ski_Hotel.pdf"
				}
			},
			{
				id: "sp-3",
				item: "Hotel Full Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 400.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED,
				confirmation: {
					url: "https://example.com/ski/hotel.pdf",
					fileName: "Ski_Hotel.pdf"
				}
			}
		],
		tourSummary: {
			revenue: 2000,
			profit: 200,
			paid: 1200,
			unpaid: 800
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Roger Federer",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Switzerland",
				dateOfBirth: "1981-08-08",
				passportNumber: "SUI001",
				expiredDate: "2031-08-08",
				items: [
					{
						id: "pi-1",
						type: "file",
						value: "passport_roger.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Mirka Federer",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Switzerland",
				dateOfBirth: "1978-04-01",
				passportNumber: "SUI002",
				expiredDate: "2038-04-01",
				items: [
					{
						id: "pi-2",
						type: "file",
						value: "passport_mirka.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Stan Wawrinka",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Switzerland",
				dateOfBirth: "1985-03-28",
				passportNumber: "SUI003",
				expiredDate: "2035-03-28",
				items: [
					{
						id: "pi-3",
						type: "file",
						value: "passport_stan.pdf"
					}
				]
			}
		]
	},
	// BOOKING (2 items)
	{
		orderId: "RQA00006",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "2025-08-22T09:15:00Z",
		client: "221B Consulting Group",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: {
			from: "2025-11-10",
			to: "2025-11-25"
		},
		tourName: "London Mystery Tour",
		duration: "5 days",
		route: "Baker Street - Dartmoor",
		email: "investigations@221b.com",
		phone: "+44 20 7946 0958",
		status: ENUM_ORDER_STATUS.BOOKING,
		manager: "Mycroft Holmes",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		roomType: "Executive Suite",
		carClass: "Luxury",
		comment: "Sherlock preferences: No distractions.",
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: London - Tashkent",
				supplier: "Emirates",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Hotel Selection: Tashkent Center",
				supplier: "-",
				plannedCost: "$600.00 - $900.00",
				estimatedRevenue: "$60.00 - $90.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Hilton Tashkent",
						supplier: "Hilton Group",
						plannedCost: "$900.00",
						estimatedRevenue: "$90.00",
						type: ENUM_EVENT.ACCOMMODATION,
						isApplied: true
					},
					{
						id: "tr-2-2",
						item: "Lotte City Hotel",
						supplier: "Lotte Group",
						plannedCost: "$600.00",
						estimatedRevenue: "$60.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "tr-3",
				item: "Private Transfer: Airport-Hotel",
				supplier: "Premium Cars",
				plannedCost: "$80.00",
				estimatedRevenue: "$20.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			},
			{
				id: "tr-4",
				item: "Night City Tour with Dinner",
				supplier: "Gourmet Tours",
				plannedCost: "$250.00",
				estimatedRevenue: "$40.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Flight Ticket Deposit",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 600.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					url: "https://example.com/tickets/RQA00006-flight-dep.pdf",
					fileName: "RQA00006_Flight_Deposit.pdf"
				}
			},
			{
				id: "sp-2",
				item: "Hotel Full Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 900.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/hotels/RQA00006-hotel-full.pdf",
					fileName: "RQA00006_Hotel_Confirmation.pdf"
				}
			},
			{
				id: "sp-3",
				item: "Transportation Advance",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 40.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					url: "https://example.com/trans/RQA00006-trans-adv.pdf",
					fileName: "RQA00006_Trans_Advance.pdf"
				}
			},
			{
				id: "sp-4",
				item: "Activity Booking Fee",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 100.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED,
				confirmation: {
					url: "https://example.com/activities/RQA00006-act-fee.pdf",
					fileName: "RQA00006_Activity_Fee.pdf"
				}
			}
		],
		tourSummary: {
			revenue: 16500,
			profit: 3750,
			paid: 16500,
			unpaid: 0
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Sherlock Holmes",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "1854-01-06",
				passportNumber: "SH221B",
				expiredDate: "2054-01-06",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Consulting detective."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_sherlock.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "John Watson",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "1852-07-07",
				passportNumber: "JWDr",
				expiredDate: "2052-07-07",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Army doctor."
					},
					{
						id: "pi-3-file",
						type: "file",
						value: "passport_watson.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Irene Adler",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "1858-03-01",
				passportNumber: "IATheWoman",
				expiredDate: "2058-03-01",
				items: [
					{
						id: "pi-4",
						type: "comment",
						value: "The Woman."
					},
					{
						id: "pi-4-file",
						type: "file",
						value: "passport_adler.pdf"
					}
				]
			}
		]
	},
	{
		orderId: "RQA00013",
		orderType: ENUM_ORDER_TYPE_OPTIONS.GROUP,
		dateCreated: "2025-08-28T10:00:00Z",
		client: "Booking Client",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.CORPORATE,
		pax: 10,
		dates: { from: "2025-11-15", to: "2025-11-25" },
		tourName: "Corporate Retreat",
		duration: "10 days",
		route: "Mountain Lodge",
		email: "booking@corp.com",
		phone: "+44444444",
		status: ENUM_ORDER_STATUS.BOOKING,
		manager: "Manager C",
		invoiceStatus: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		roomType: "Double Room",
		carClass: "Minivan",
		comment: "Corporate event, ensure conference room availability.",
		tourReview: [
			{
				id: "tr-1",
				item: "Business Class Flight: Berlin - Tashkent",
				supplier: "Lufthansa",
				plannedCost: "$2,500.00",
				estimatedRevenue: "$250.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Conference Venue Rental",
				supplier: "International Congress Center",
				plannedCost: "$5,000.00",
				estimatedRevenue: "$500.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "tr-3",
				item: "Executive Catering Service",
				supplier: "Gourmet Events",
				plannedCost: "$2,000.00",
				estimatedRevenue: "$200.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			},
			{
				id: "tr-4",
				item: "Luxury Minivan Fleet",
				supplier: "VIP Transport Ltd.",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$120.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Venue Deposit",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 2500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/venue/RQA00013-venue-dep.pdf",
					fileName: "RQA00013_Venue_Deposit.pdf"
				}
			},
			{
				id: "sp-2",
				item: "Flight Bookings",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 25000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					url: "https://example.com/flights/RQA00013-flights-all.pdf",
					fileName: "RQA00013_Flight_Tickets.pdf"
				}
			},
			{
				id: "sp-3",
				item: "Catering Advance",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 1000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED,
				confirmation: {
					url: "https://example.com/catering/RQA00013-cat-adv.pdf",
					fileName: "RQA00013_Catering_Advance.pdf"
				}
			},
			{
				id: "sp-4",
				item: "Transport Fleet Reservation",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 600.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/trans/RQA00013-fleet-res.pdf",
					fileName: "RQA00013_Fleet_Reservation.pdf"
				}
			}
		],
		tourSummary: {
			revenue: 55000,
			profit: 5500,
			paid: 25000,
			unpaid: 30000
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Michael Scott",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1964-03-15",
				passportNumber: "MSREG",
				expiredDate: "2034-03-15",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Regional Manager."
					},
					{
						id: "pi-1-file",
						type: "file",
						value: "passport_michael.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Dwight Schrute",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1970-01-20",
				passportNumber: "DSARM",
				expiredDate: "2040-01-20",
				items: [
					{
						id: "pi-2",
						type: "comment",
						value: "Assistant to the regional manager."
					},
					{
						id: "pi-2-file",
						type: "file",
						value: "passport_dwight.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Jim Halpert",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1978-10-01",
				passportNumber: "JHPrank",
				expiredDate: "2038-10-01",
				items: [
					{
						id: "pi-3-file",
						type: "file",
						value: "passport_jim.pdf"
					}
				]
			},
			{
				id: "pax-4",
				fullName: "Pam Beesly",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "1979-03-25",
				passportNumber: "PBArt",
				expiredDate: "2039-03-25",
				items: [
					{
						id: "pi-4-file",
						type: "file",
						value: "passport_pam.pdf"
					}
				]
			}
		]
	},
	// IN_PROGRESS (2 items)
	{
		orderId: "RQA00007",
		orderType: ENUM_ORDER_TYPE_OPTIONS.GROUP,
		dateCreated: "2025-08-15T14:20:00Z",
		client: "Global Corp Logistics",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.CORPORATE,
		pax: 45,
		dates: {
			from: "2025-12-01",
			to: "2025-12-25"
		},
		tourName: "Year End Retreat",
		duration: "10 days",
		route: "Bali - Ubud",
		email: "corporate-travel@globalcorp.com",
		phone: "+1 800 555 1234",
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		manager: "Sarah Connor",
		invoiceStatus: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		roomType: "Villa",
		carClass: "Coach",
		comment: "Large group, coordinate with local guide.",
		tourReview: [
			{
				id: "tr-1",
				item: "Charter Flight: London - Denpasar",
				supplier: "Garuda Indonesia",
				plannedCost: "$15,000.00",
				estimatedRevenue: "$2,000.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Villa Complex: Ubud",
				supplier: "-",
				plannedCost: "$20,000.00 - $30,000.00",
				estimatedRevenue: "$2,000.00 - $3,500.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Ayana Resort",
						supplier: "Ayana Group",
						plannedCost: "$25,000.00",
						estimatedRevenue: "$2,800.00",
						type: ENUM_EVENT.ACCOMMODATION,
						isApplied: true
					},
					{
						id: "tr-2-2",
						item: "Four Seasons Sayan",
						supplier: "Four Seasons",
						plannedCost: "$30,000.00",
						estimatedRevenue: "$3,500.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "tr-3",
				item: "VIP Bus Fleet: Island Tours",
				supplier: "Bali Trans",
				plannedCost: "$5,000.00",
				estimatedRevenue: "$800.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			},
			{
				id: "tr-4",
				item: "Team Building: Jungle Adventure",
				supplier: "Adventure Bali",
				plannedCost: "$3,500.00",
				estimatedRevenue: "$600.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "tr-5",
				item: "Gala Dinner: Beachfront",
				supplier: "Sunset Catering",
				plannedCost: "$4,000.00",
				estimatedRevenue: "$700.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Charter Flight Deposit",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 7500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/flights/RQA00007-charter-dep.pdf",
					fileName: "RQA00007_Charter_Deposit.pdf"
				}
			},
			{
				id: "sp-2",
				item: "Resort Initial Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 10000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					url: "https://example.com/resorts/RQA00007-ayana-init.pdf",
					fileName: "RQA00007_Resort_Initial.pdf"
				}
			},
			{
				id: "sp-3",
				item: "Bus Fleet Prepayment",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 2500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED,
				confirmation: {
					url: "https://example.com/trans/RQA00007-bus-fleet.pdf",
					fileName: "RQA00007_Bus_Fleet_Payment.pdf"
				}
			},
			{
				id: "sp-4",
				item: "Adventure Activity Fee",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 1750.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			}
		],
		tourSummary: {
			revenue: 47500,
			profit: 9000,
			paid: 17500,
			unpaid: 30000
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Alice Johnson",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Germany",
				dateOfBirth: "1990-05-05",
				passportNumber: "G1234567",
				expiredDate: "2030-05-05",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs a quiet room."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_alice.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Bob Marley",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Jamaica",
				dateOfBirth: "1945-02-06",
				passportNumber: "JAM001",
				expiredDate: "2025-02-06",
				items: [
					{
						id: "pi-3",
						type: "file",
						value: "passport_bob.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "John Lennon",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "1940-10-09",
				passportNumber: "UK999",
				expiredDate: "2030-10-09",
				items: [
					{
						id: "pi-4",
						type: "file",
						value: "passport_john.pdf"
					},
					{
						id: "pi-5",
						type: "comment",
						value: "Imagining no possessions."
					}
				]
			},
			{
				id: "pax-4",
				fullName: "Yoko Ono",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Japan",
				dateOfBirth: "1933-02-18",
				passportNumber: "JPN777",
				expiredDate: "2033-02-18",
				items: [
					{
						id: "pi-6",
						type: "file",
						value: "passport_yoko.pdf"
					}
				]
			}
		]
	},
	{
		orderId: "RQA00014",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-29T11:00:00Z",
		client: "Progress Client",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 5,
		dates: { from: "2025-11-20", to: "2025-11-30" },
		tourName: "Adventure Tour",
		duration: "10 days",
		route: "Amazon",
		email: "progress@trip.com",
		phone: "+55555555",
		status: ENUM_ORDER_STATUS.IN_PROGRESS,
		manager: "Manager D",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		roomType: "Tent",
		carClass: "Jeep 4x4",
		comment: "Adventure gear required.",
		tourReview: [
			{
				id: "tr-1",
				item: "Expedition Flight: Manaus - Base Camp",
				supplier: "Amazon Air",
				plannedCost: "$800.00",
				estimatedRevenue: "$100.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Jungle Lodge Accomodation",
				supplier: "-",
				plannedCost: "$1,200.00 - $1,800.00",
				estimatedRevenue: "$150.00 - $220.00",
				type: ENUM_EVENT.MULTIPLY_OPTION,
				subRows: [
					{
						id: "tr-2-1",
						item: "Amazon Eco Park",
						supplier: "Eco Lodges",
						plannedCost: "$1,200.00",
						estimatedRevenue: "$150.00",
						type: ENUM_EVENT.ACCOMMODATION,
						isApplied: true
					},
					{
						id: "tr-2-2",
						item: "Anavilhanas Jungle Lodge",
						supplier: "Luxury Amazon",
						plannedCost: "$1,800.00",
						estimatedRevenue: "$220.00",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "tr-3",
				item: "River Boat Expedition",
				supplier: "Amazon Cruises",
				plannedCost: "$1,000.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			},
			{
				id: "tr-4",
				item: "Guided Survival Trek",
				supplier: "Native Guides",
				plannedCost: "$500.00",
				estimatedRevenue: "$80.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true
			},
			{
				id: "tr-5",
				item: "Piranha Fishing Trip",
				supplier: "Native Guides",
				plannedCost: "$200.00",
				estimatedRevenue: "$40.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: false
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Expedition Flight Full Payment",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 800.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/exp/RQA00014-fly.pdf",
					fileName: "RQA00014_Exp_Flight.pdf"
				}
			},
			{
				id: "sp-2",
				item: "Lodge Deposit",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 600.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
				confirmation: {
					url: "https://example.com/exp/RQA00014-lodge-dep.pdf",
					fileName: "RQA00014_Lodge_Deposit.pdf"
				}
			},
			{
				id: "sp-3",
				item: "Boat Expedition Advance",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-4",
				item: "Guided Trek Fee",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.NOT_BOOKED,
				confirmation: {
					url: "https://example.com/exp/RQA00014-trek.pdf",
					fileName: "RQA00014_Trek_Payment.pdf"
				}
			},
			{
				id: "sp-5",
				item: "Equipment Rental",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			}
		],
		tourSummary: {
			revenue: 11000,
			profit: 1750,
			paid: 11000,
			unpaid: 0
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Indiana Jones",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1899-07-01",
				passportNumber: "IJ001",
				expiredDate: "1999-07-01",
				items: [
					{
						id: "pi-1",
						type: "file",
						value: "passport_indy.pdf"
					},
					{
						id: "pi-2",
						type: "comment",
						value: "Archaeologist."
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Marion Ravenwood",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "1909-03-23",
				passportNumber: "MR002",
				expiredDate: "2009-03-23",
				items: [
					{
						id: "pi-3",
						type: "file",
						value: "passport_marion.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Sallah Mohammed Faisel el-Kahir",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Egypt",
				dateOfBirth: "1897-01-01",
				passportNumber: "SM003",
				expiredDate: "1997-01-01",
				items: [
					{
						id: "pi-4",
						type: "file",
						value: "passport_sallah.pdf"
					}
				]
			},
			{
				id: "pax-4",
				fullName: "Short Round",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "China",
				dateOfBirth: "1924-02-08",
				passportNumber: "SR004",
				expiredDate: "2024-02-08",
				items: [
					{
						id: "pi-5",
						type: "file",
						value: "passport_shorty.pdf"
					}
				]
			},
			{
				id: "pax-5",
				fullName: "Marcus Brody",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "1878-01-01",
				passportNumber: "MB005",
				expiredDate: "1978-01-01",
				items: [
					{
						id: "pi-6",
						type: "file",
						value: "passport_marcus.pdf"
					}
				]
			}
		]
	},
	// COMPLETED (2 items)
	{
		orderId: "RQA00008",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-07-10T08:00:00Z",
		client: "Wonderland Tours & Events",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 3,
		dates: {
			from: "2025-07-20",
			to: "2025-07-25"
		},
		tourName: "Summer Holiday",
		duration: "7 days",
		route: "Antalya - Kemer",
		email: "events@wonderland.com",
		phone: "+90 555 123 45 67",
		status: ENUM_ORDER_STATUS.COMPLETED,
		manager: "James Bond",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		roomType: "Family Room",
		carClass: "SUV",
		comment: "Client left positive feedback.",
		tourReview: [
			{
				id: "tr-1",
				item: "International Flight: London - Antalya",
				supplier: "Turkish Airlines",
				plannedCost: "$1,200.00",
				estimatedRevenue: "$150.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Hotel: Akka Antedon Hotel",
				supplier: "Akka Group",
				plannedCost: "$3,500.00",
				estimatedRevenue: "$350.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "tr-3",
				item: "Private Transfer: Airport - Kemer",
				supplier: "Local Trans",
				plannedCost: "$100.00",
				estimatedRevenue: "$20.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Flight Ticket Payment",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 1200.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED
			},
			{
				id: "sp-2",
				item: "Hotel Full Payment",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 3500.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED
			},
			{
				id: "sp-3",
				item: "Transfer Payment",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 100.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED
			}
		],
		tourSummary: {
			revenue: 5500,
			profit: 1250,
			paid: 5500,
			unpaid: 0
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "George Williams",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "1970-01-01",
				passportNumber: "W111111",
				expiredDate: "2040-01-01",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs accessible room."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_george.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Jane Williams",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "1975-05-12",
				passportNumber: "W222222",
				expiredDate: "2042-05-12",
				items: [
					{
						id: "pi-3",
						type: "file",
						value: "passport_jane.pdf"
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Kevin Williams",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "2005-10-20",
				passportNumber: "W333333",
				expiredDate: "2045-10-20",
				items: [
					{
						id: "pi-4",
						type: "file",
						value: "passport_kevin.pdf"
					}
				]
			}
		]
	},
	{
		orderId: "RQA00015",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "2025-06-15T12:00:00Z",
		client: "Completed Client",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 2,
		dates: { from: "2025-06-20", to: "2025-06-30" },
		tourName: "Luxury Escape",
		duration: "10 days",
		route: "Maldives",
		email: "completed@luxury.com",
		phone: "+66666666",
		status: ENUM_ORDER_STATUS.COMPLETED,
		manager: "Manager E",
		invoiceStatus: ENUM_INVOICE_STATUS.PAID,
		roomType: "Water Villa",
		carClass: "Yacht",
		comment: "Honeymooners, complimentary champagne provided.",
		tourReview: [
			{
				id: "tr-1",
				item: "First Class Flight: Moscow - Male",
				supplier: "Aeroflot",
				plannedCost: "$5,000.00",
				estimatedRevenue: "$500.00",
				type: ENUM_EVENT.FLIGHT,
				isApplied: true
			},
			{
				id: "tr-2",
				item: "Hotel: Soneva Jani",
				supplier: "Soneva Group",
				plannedCost: "$15,000.00",
				estimatedRevenue: "$1,500.00",
				type: ENUM_EVENT.ACCOMMODATION,
				isApplied: true
			},
			{
				id: "tr-3",
				item: "Yacht Transfer",
				supplier: "Luxury Yachts Maldives",
				plannedCost: "$2,000.00",
				estimatedRevenue: "$200.00",
				type: ENUM_EVENT.TRANSPORTATION,
				isApplied: true
			}
		],
		supplierPayments: [
			{
				id: "sp-1",
				item: "Flight Payment Full",
				type: ENUM_EVENT.FLIGHT,
				supplierPayment: 5000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/conf/RQA00015-fly.pdf",
					fileName: "RQA00015_Flight.pdf"
				}
			},
			{
				id: "sp-2",
				item: "Resort Payment Full",
				type: ENUM_EVENT.ACCOMMODATION,
				supplierPayment: 15000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED,
				confirmation: {
					url: "https://example.com/conf/RQA00015-resort.pdf",
					fileName: "RQA00015_Resort.pdf"
				}
			},
			{
				id: "sp-3",
				item: "Yacht Payment",
				type: ENUM_EVENT.TRANSPORTATION,
				supplierPayment: 2000.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED
			}
		],
		tourSummary: {
			revenue: 22500,
			profit: 2250,
			paid: 22500,
			unpaid: 0
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Romeo Montague",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Italy",
				dateOfBirth: "1995-02-14",
				passportNumber: "ROMEO001",
				expiredDate: "2035-02-14",
				items: [
					{
						id: "pi-1",
						type: "file",
						value: "passport_romeo.pdf"
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Juliet Capulet",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Italy",
				dateOfBirth: "1997-09-12",
				passportNumber: "JULIET002",
				expiredDate: "2037-09-12",
				items: [
					{
						id: "pi-2",
						type: "file",
						value: "passport_juliet.pdf"
					}
				]
			}
		]
	},
	// CANCELLED (2 items)
	{
		orderId: "RQA00009",
		orderType: ENUM_ORDER_TYPE_OPTIONS.REGULAR,
		dateCreated: "2025-08-25T16:45:00Z",
		client: "Builder Construction Group",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.DIRECT,
		pax: 1,
		dates: {
			from: "2025-09-15",
			to: "2025-10-25"
		},
		tourName: "Business Trip",
		duration: "5 days",
		route: "Berlin - Munich",
		email: "projects@buildercorp.de",
		phone: "+49 30 1234567",
		status: ENUM_ORDER_STATUS.CANCELLED,
		manager: "Ethan Hunt",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		report: "Order cancelled by client request.",
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: 2250,
			profit: 500,
			paid: 0,
			unpaid: 2250
		},
		paxDetails: []
	},
	{
		orderId: "RQA00016",
		orderType: ENUM_ORDER_TYPE_OPTIONS.VIP,
		dateCreated: "2025-08-30T14:00:00Z",
		client: "Cancelled Client",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: 4,
		dates: { from: "2025-10-01", to: "2025-10-10" },
		tourName: "Cancelled Trip",
		duration: "10 days",
		route: "Japan",
		email: "cancelled@trip.com",
		phone: "+77777777",
		status: ENUM_ORDER_STATUS.CANCELLED,
		manager: "Manager F",
		invoiceStatus: ENUM_INVOICE_STATUS.UNPAID,
		report: "Cancelled due to weather conditions.",
		tourReview: [],
		supplierPayments: [],
		tourSummary: {
			revenue: 9000,
			profit: 900,
			paid: 0,
			unpaid: 9000
		},
		paxDetails: []
	}
];
