import { ENUM_INVOICE_STATUS, type IInvoice } from "@/entities/finance";

export const INVOICES_MOCK: IInvoice[] = [
	{
		paymentId: "INN-1234",
		orderId: "RQA00001",
		issueDate: "10/10/2024",
		dueDate: "10/10/2024",
		amount: 10000.0,
		paidAmount: 10000.0,
		remainingAmount: 0.0,
		currency: "USD",
		status: ENUM_INVOICE_STATUS.PAID,
		billingInfo: {
			company: "Global travel agency",
			address: "Strange st. 98, 123341",
			contact: "Jo Malou",
			email: "sample@gmail.com",
			phone: "+8 793 333 12 12"
		},
		bookingInfo: {
			tour: "Uzbekistan group tour",
			pax: 22,
			dates: "22.01.2026 - 27.01.2025",
			duration: "5D/4N"
		},
		payments: [
			{
				no: 1,
				amount: 10000.0,
				date: "10/10/2024",
				documentUrl: "#"
			}
		]
	},
	{
		paymentId: "INV-1235",
		orderId: "RQA00002",
		issueDate: "2024-10-12",
		dueDate: "2024-10-22",
		amount: 5000.0,
		paidAmount: 2500.0,
		remainingAmount: 2500.0,
		currency: "USD",
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		billingInfo: {
			company: "Best Tours Ltd",
			address: "Main St 1, London",
			contact: "John Doe",
			email: "john@tours.com",
			phone: "+1 234 567 89"
		},
		bookingInfo: {
			tour: "Grand Canyon Adventure",
			pax: 2,
			dates: "15.11.2024 - 20.11.2024",
			duration: "6D/5N"
		},
		payments: [
			{
				no: 1,
				amount: 2500.0,
				date: "2024-10-13",
				documentUrl: "#"
			}
		]
	},
	{
		paymentId: "INV-1236",
		orderId: "RQA00003",
		issueDate: "2024-10-15",
		dueDate: "2024-10-25",
		amount: 3000.0,
		paidAmount: 0.0,
		remainingAmount: 3000.0,
		currency: "USD",
		status: ENUM_INVOICE_STATUS.UNPAID,
		billingInfo: {
			company: "Adventure Seekers",
			address: "Mountain Rd 5, Denver",
			contact: "Jane Smith",
			email: "jane@adventure.com",
			phone: "+1 987 654 32"
		},
		bookingInfo: {
			tour: "Rocky Mountains Trek",
			pax: 4,
			dates: "01.12.2024 - 10.12.2024",
			duration: "10D/9N"
		},
		payments: []
	}
];
