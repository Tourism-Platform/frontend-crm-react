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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
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
				dateOfBirth: "13/05/1988",
				passportNumber: "13213467",
				expiredDate: "13/05/2029",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Passenger requires a child seat."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_bill.pdf",
						metadata: {
							fileName: "Passport_Scan_Bill.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Amanda Jally",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "17/01/1999",
				passportNumber: "13289067",
				expiredDate: "17/01/2029",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Allergy to peanuts."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_jally.pdf",
						metadata: {
							fileName: "Passport_Scan_Jally.pdf",
							fileSize: "1.5 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Amad Diallo",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Ivory Coast",
				dateOfBirth: "11/07/2002",
				passportNumber: "AD998877",
				expiredDate: "11/07/2032",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "First time traveler."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_diallo.pdf",
						metadata: {
							fileName: "Passport_Scan_Diallo.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
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
				dateOfBirth: "02/09/1964",
				passportNumber: "JW777777",
				expiredDate: "02/09/2044",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Special security clearance."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_wick.pdf",
						metadata: {
							fileName: "Passport_Scan_Wick.pdf",
							fileSize: "1.0 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Winston Scott",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "05/09/1942",
				passportNumber: "WS007007",
				expiredDate: "05/09/2032",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Prefers Continental services."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_scott.pdf",
						metadata: {
							fileName: "Passport_Scan_Scott.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Charon",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "15/12/1962",
				passportNumber: "C111222",
				expiredDate: "15/12/2042",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Concierge level access."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_charon.pdf",
						metadata: {
							fileName: "Passport_Scan_Charon.pdf",
							fileSize: "0.9 MB"
						}
					}
				]
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
				isApplied: true,
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Bender Rodriguez",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Robot",
				dateOfBirth: "01/01/2999",
				passportNumber: "R000001",
				expiredDate: "01/01/3999",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Loves to bend things."
					},
					{
						id: "pi-2",
						type: "file",
						value: "robot_spec.pdf",
						metadata: {
							fileName: "Robot_Scan.pdf",
							fileSize: "0.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Philip J. Fry",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Earth",
				dateOfBirth: "14/08/1974",
				passportNumber: "E000002",
				expiredDate: "14/08/2029",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Frozen for 1000 years."
					},
					{
						id: "pi-4",
						type: "file",
						value: "fry_passport.pdf",
						metadata: {
							fileName: "Passport_Scan_Fry.pdf",
							fileSize: "0.5 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Turanga Leela",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Mutant",
				dateOfBirth: "20/09/2975",
				passportNumber: "M000003",
				expiredDate: "20/09/3999",
				items: [
					{ id: "pi-5", type: "comment", value: "Excellent pilot." },
					{
						id: "pi-6",
						type: "file",
						value: "leela_id.pdf",
						metadata: {
							fileName: "ID_Scan_Leela.pdf",
							fileSize: "0.6 MB"
						}
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "John Smith",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "12/12/1980",
				passportNumber: "AB123456",
				expiredDate: "12/12/2030",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Requested high floor."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_smith.pdf",
						metadata: {
							fileName: "Passport_Scan_Smith.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Mary Smith",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "05/05/1985",
				passportNumber: "CD789012",
				expiredDate: "05/05/2035",
				items: [
					{ id: "pi-3", type: "comment", value: "Special diet." },
					{
						id: "pi-4",
						type: "file",
						value: "passport_mary.pdf",
						metadata: {
							fileName: "Passport_Scan_Mary.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Junior Smith",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "10/10/2015",
				passportNumber: "EF345678",
				expiredDate: "10/10/2025",
				items: [
					{ id: "pi-5", type: "comment", value: "Needs child seat." },
					{
						id: "pi-6",
						type: "file",
						value: "passport_junior.pdf",
						metadata: {
							fileName: "Passport_Scan_Junior.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Alice Johnson",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Germany",
				dateOfBirth: "05/05/1990",
				passportNumber: "G1234567",
				expiredDate: "05/05/2030",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs a quiet room."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_alice.pdf",
						metadata: {
							fileName: "Passport_Scan_Alice.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Bob Schultz",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Germany",
				dateOfBirth: "10/10/1988",
				passportNumber: "G7654321",
				expiredDate: "10/10/2028",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Prefers window seat."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_bob.pdf",
						metadata: {
							fileName: "Passport_Scan_Bob.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Hans Müller",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Germany",
				dateOfBirth: "20/03/1985",
				passportNumber: "G9988776",
				expiredDate: "20/03/2035",
				items: [
					{ id: "pi-5", type: "comment", value: "Vegetarian meal." },
					{
						id: "pi-6",
						type: "file",
						value: "passport_hans.pdf",
						metadata: {
							fileName: "Passport_Scan_Hans.pdf",
							fileSize: "0.9 MB"
						}
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "George Williams",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "01/01/1970",
				passportNumber: "W111111",
				expiredDate: "01/01/2040",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs accessible room."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_george.pdf",
						metadata: {
							fileName: "Passport_Scan_George.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Sarah Williams",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "02/02/1975",
				passportNumber: "W222222",
				expiredDate: "02/02/2045",
				items: [
					{ id: "pi-3", type: "comment", value: "Allergic to dust." },
					{
						id: "pi-4",
						type: "file",
						value: "passport_sarah.pdf",
						metadata: {
							fileName: "Passport_Scan_Sarah.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Timmy Williams",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "15/05/2012",
				passportNumber: "W333333",
				expiredDate: "15/05/2032",
				items: [
					{ id: "pi-5", type: "comment", value: "Loves drawing." },
					{
						id: "pi-6",
						type: "file",
						value: "passport_timmy.pdf",
						metadata: {
							fileName: "Passport_Scan_Timmy.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 10999, to: 12432 },
			profit: { from: 2458, to: 2999 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Charlie Brown",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "30/10/1950",
				passportNumber: "CB123456",
				expiredDate: "30/10/2030",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Often feels unlucky."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_charlie.pdf",
						metadata: {
							fileName: "Passport_Scan_Charlie.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Sally Brown",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "20/05/1959",
				passportNumber: "SB998877",
				expiredDate: "20/05/2039",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Needs a comfortable seat."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_sally.pdf",
						metadata: {
							fileName: "Passport_Scan_Sally.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Linus van Pelt",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "12/10/1952",
				passportNumber: "LV112233",
				expiredDate: "12/10/2032",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Requires security blanket."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_linus.pdf",
						metadata: {
							fileName: "Passport_Scan_Linus.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 1000, to: 2000 },
			profit: { from: 100, to: 200 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Kevin Hart",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "06/07/1979",
				passportNumber: "KH123456",
				expiredDate: "06/07/2029",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Prefers aisle seat."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_kevin.pdf",
						metadata: {
							fileName: "Passport_Scan_Kevin.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Eniko Hart",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "18/08/1984",
				passportNumber: "EH654321",
				expiredDate: "18/08/2034",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Window seat requested."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_eniko.pdf",
						metadata: {
							fileName: "Passport_Scan_Eniko.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Heaven Hart",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "USA",
				dateOfBirth: "14/03/2005",
				passportNumber: "HH987654",
				expiredDate: "14/03/2025",
				items: [
					{ id: "pi-5", type: "comment", value: "Loves traveling." },
					{
						id: "pi-6",
						type: "file",
						value: "passport_heaven.pdf",
						metadata: {
							fileName: "Passport_Scan_Heaven.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 1500, to: 2500 },
			profit: { from: 150, to: 250 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Franz Kafka",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Czech",
				dateOfBirth: "03/07/1883",
				passportNumber: "FK112233",
				expiredDate: "03/07/2033",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs a quiet place to write."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_franz.pdf",
						metadata: {
							fileName: "Passport_Scan_Franz.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Milan Kundera",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "French",
				dateOfBirth: "01/04/1929",
				passportNumber: "MK445566",
				expiredDate: "01/04/2049",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Prefers window seat."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_milan.pdf",
						metadata: {
							fileName: "Passport_Scan_Milan.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Vaclav Havel",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Czech",
				dateOfBirth: "05/10/1936",
				passportNumber: "VH778899",
				expiredDate: "05/10/2036",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "VIP protocol requested."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_vaclav.pdf",
						metadata: {
							fileName: "Passport_Scan_Vaclav.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 1200, to: 2200 },
			profit: { from: 120, to: 220 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Jean Reno",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "French",
				dateOfBirth: "30/07/1948",
				passportNumber: "JR123456",
				expiredDate: "30/07/2038",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs a large car."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_jean.pdf",
						metadata: {
							fileName: "Passport_Scan_Jean.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Vincent Cassel",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "French",
				dateOfBirth: "23/11/1966",
				passportNumber: "VC998877",
				expiredDate: "23/11/2046",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Loves action tours."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_vincent.pdf",
						metadata: {
							fileName: "Passport_Scan_Vincent.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Marion Cotillard",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "French",
				dateOfBirth: "30/09/1975",
				passportNumber: "MC111222",
				expiredDate: "30/09/2045",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Requires hypoallergenic room."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_marion.pdf",
						metadata: {
							fileName: "Passport_Scan_Marion.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			}
		]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 3000, to: 4000 },
			profit: { from: 300, to: 400 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Michael Jordan",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "17/02/1963",
				passportNumber: "MJ232323",
				expiredDate: "17/02/2033",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Requires extra legroom."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_mike.pdf",
						metadata: {
							fileName: "Passport_Scan_Mike.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Scottie Pippen",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "25/09/1965",
				passportNumber: "SP333333",
				expiredDate: "25/09/2035",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Window seat preferred."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_scottie.pdf",
						metadata: {
							fileName: "Passport_Scan_Scottie.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Dennis Rodman",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "13/05/1961",
				passportNumber: "DR919191",
				expiredDate: "13/05/2031",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Needs a spot for a laptop."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_dennis.pdf",
						metadata: {
							fileName: "Passport_Scan_Dennis.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 5000, to: 6000 },
			profit: { from: 500, to: 600 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Elon Musk",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "28/06/1971",
				passportNumber: "EM424242",
				expiredDate: "28/06/2031",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs a Tesla at the airport."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_elon.pdf",
						metadata: {
							fileName: "Passport_Scan_Elon.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Jeff Bezos",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "12/01/1964",
				passportNumber: "JB000001",
				expiredDate: "12/01/2034",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Requests Amazon Fresh meals."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_jeff.pdf",
						metadata: {
							fileName: "Passport_Scan_Jeff.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Mark Zuckerberg",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "14/05/1984",
				passportNumber: "MZ888888",
				expiredDate: "14/05/2034",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Privacy settings enabled."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_mark.pdf",
						metadata: {
							fileName: "Passport_Scan_Mark.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
			revenue: { from: 2000, to: 3000 },
			profit: { from: 200, to: 300 }
		},
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Bob Smith",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Australia",
				dateOfBirth: "01/01/1985",
				passportNumber: "AU987654",
				expiredDate: "01/01/2030",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Surfing enthusiast."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_bob.pdf",
						metadata: {
							fileName: "Passport_Scan_Bob.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Jane Smith",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Australia",
				dateOfBirth: "01/01/1988",
				passportNumber: "AU111222",
				expiredDate: "01/01/2033",
				items: [
					{ id: "pi-5", type: "comment", value: "Yoga lover." },
					{
						id: "pi-6",
						type: "file",
						value: "passport_jane.pdf",
						metadata: {
							fileName: "Passport_Scan_Jane.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Tom Smith",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Australia",
				dateOfBirth: "01/01/2010",
				passportNumber: "AU333444",
				expiredDate: "01/01/2030",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Needs snorkeling gear."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_tom.pdf",
						metadata: {
							fileName: "Passport_Scan_Tom.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 2500, to: 3500 },
			profit: { from: 250, to: 350 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Ken Watanabe",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Japan",
				dateOfBirth: "21/10/1959",
				passportNumber: "KW111111",
				expiredDate: "21/10/2039",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Prefers traditional ryokan stay."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_ken.pdf",
						metadata: {
							fileName: "Passport_Scan_Ken.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Hiroyuki Sanada",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "Japan",
				dateOfBirth: "13/10/1960",
				passportNumber: "HS222222",
				expiredDate: "13/10/2040",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Needs accessible entrance."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_hiro.pdf",
						metadata: {
							fileName: "Passport_Scan_Hiro.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Rinko Kikuchi",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "Japan",
				dateOfBirth: "06/01/1981",
				passportNumber: "RK333333",
				expiredDate: "06/01/2041",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Requires hypoallergenic bedding."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_rinko.pdf",
						metadata: {
							fileName: "Passport_Scan_Rinko.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 1800, to: 2800 },
			profit: { from: 180, to: 280 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Bear Grylls",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "07/06/1974",
				passportNumber: "BG123456",
				expiredDate: "07/06/2034",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs survival kit."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_bear.pdf",
						metadata: {
							fileName: "Passport_Scan_Bear.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "David Attenborough",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "UK",
				dateOfBirth: "08/05/1926",
				passportNumber: "DA998877",
				expiredDate: "08/05/2036",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Prefers birdwatching spots."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_david.pdf",
						metadata: {
							fileName: "Passport_Scan_David.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Jane Goodall",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "UK",
				dateOfBirth: "03/04/1934",
				passportNumber: "JG112233",
				expiredDate: "03/04/2044",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Animal-friendly meals only."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_jane.pdf",
						metadata: {
							fileName: "Passport_Scan_Jane.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
				item: "Spain Summer Packages",
				supplier: "-",
				plannedCost: "$3,000.00 - $4,500.00",
				estimatedRevenue: "$300.00 - $500.00",
				type: ENUM_EVENT.ACTIVITY,
				isApplied: true,
				subRows: [
					{
						id: "1-1",
						item: "Basic Summer Tour",
						supplier: "Tui Spain",
						plannedCost: "$3,000.00",
						estimatedRevenue: "$300.00",
						type: ENUM_EVENT.ACTIVITY,
						isApplied: true
					},
					{
						id: "1-2",
						item: "Premium Beach Package",
						supplier: "Tui Spain",
						plannedCost: "$1,500.00",
						estimatedRevenue: "$200.00",
						type: ENUM_EVENT.ACTIVITY,
						isApplied: false
					}
				]
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
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
				status: ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED
			},
			{
				id: "sp-3",
				item: "Guide & Activities",
				type: ENUM_EVENT.ACTIVITY,
				supplierPayment: 150.0,
				status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED
			}
		],
		tourSummary: {
			revenue: { from: 8000, to: 9000 },
			profit: { from: 800, to: 900 }
		},
		paxDetails: [
			{
				id: "pax-1",
				fullName: "Leonardo DiCaprio",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "11/11/1974",
				passportNumber: "LD111111",
				expiredDate: "11/11/2044",
				items: [
					{
						id: "pi-1",
						type: "comment",
						value: "Needs a private deck."
					},
					{
						id: "pi-2",
						type: "file",
						value: "passport_leo.pdf",
						metadata: {
							fileName: "Passport_Scan_Leo.pdf",
							fileSize: "1.2 MB"
						}
					}
				]
			},
			{
				id: "pax-2",
				fullName: "Kate Winslet",
				gender: ENUM_GENDER_OPTIONS.FEMALE,
				nationality: "UK",
				dateOfBirth: "05/10/1975",
				passportNumber: "KW222222",
				expiredDate: "05/10/2045",
				items: [
					{
						id: "pi-3",
						type: "comment",
						value: "Prefers evening entertainment."
					},
					{
						id: "pi-4",
						type: "file",
						value: "passport_kate.pdf",
						metadata: {
							fileName: "Passport_Scan_Kate.pdf",
							fileSize: "1.1 MB"
						}
					}
				]
			},
			{
				id: "pax-3",
				fullName: "Brad Pitt",
				gender: ENUM_GENDER_OPTIONS.MALE,
				nationality: "USA",
				dateOfBirth: "18/12/1963",
				passportNumber: "BP333333",
				expiredDate: "18/12/2043",
				items: [
					{
						id: "pi-5",
						type: "comment",
						value: "Requests gym access."
					},
					{
						id: "pi-6",
						type: "file",
						value: "passport_brad.pdf",
						metadata: {
							fileName: "Passport_Scan_Brad.pdf",
							fileSize: "0.8 MB"
						}
					}
				]
			}
		]
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
