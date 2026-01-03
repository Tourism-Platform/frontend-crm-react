import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import { ENUM_INVOICE_STATUS } from "../types";
import type {
	IInvoiceBackend,
	IInvoiceDetailBackend
} from "../types/invoice-backend.interface";

export const INVOICE_LIST_MOCK: IInvoiceBackend[] = [
	{
		payment_id: "INV-1001",
		order_id: "ORD-0001",
		issue_date: "2024-10-01T10:00:00Z",
		amount: 1200.0,
		paid_amount: 1200.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1002",
		order_id: "ORD-0002",
		issue_date: "2024-10-02T10:00:00Z",
		amount: 500.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1003",
		order_id: "ORD-0003",
		issue_date: "2024-10-03T10:00:00Z",
		amount: 2500.0,
		paid_amount: 1000.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1004",
		order_id: "ORD-0004",
		issue_date: "2024-10-04T10:00:00Z",
		amount: 3000.0,
		paid_amount: 3000.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1005",
		order_id: "ORD-0005",
		issue_date: "2024-10-05T10:00:00Z",
		amount: 150.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1006",
		order_id: "ORD-0006",
		issue_date: "2024-10-06T10:00:00Z",
		amount: 4500.0,
		paid_amount: 2000.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1007",
		order_id: "ORD-0007",
		issue_date: "2024-10-07T10:00:00Z",
		amount: 800.0,
		paid_amount: 800.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1008",
		order_id: "ORD-0008",
		issue_date: "2024-10-08T10:00:00Z",
		amount: 1100.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1009",
		order_id: "ORD-0009",
		issue_date: "2024-10-09T10:00:00Z",
		amount: 900.0,
		paid_amount: 300.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1010",
		order_id: "ORD-0010",
		issue_date: "2024-10-10T10:00:00Z",
		amount: 6000.0,
		paid_amount: 6000.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1011",
		order_id: "ORD-0011",
		issue_date: "2024-10-11T10:00:00Z",
		amount: 200.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1012",
		order_id: "ORD-0012",
		issue_date: "2024-10-12T10:00:00Z",
		amount: 1700.0,
		paid_amount: 850.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1013",
		order_id: "ORD-0013",
		issue_date: "2024-10-13T10:00:00Z",
		amount: 3200.0,
		paid_amount: 3200.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1014",
		order_id: "ORD-0014",
		issue_date: "2024-10-14T10:00:00Z",
		amount: 400.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1015",
		order_id: "ORD-0015",
		issue_date: "2024-10-15T10:00:00Z",
		amount: 2100.0,
		paid_amount: 1050.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1016",
		order_id: "ORD-0016",
		issue_date: "2024-10-16T10:00:00Z",
		amount: 5500.0,
		paid_amount: 5500.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1017",
		order_id: "ORD-0017",
		issue_date: "2024-10-17T10:00:00Z",
		amount: 300.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1018",
		order_id: "ORD-0018",
		issue_date: "2024-10-18T10:00:00Z",
		amount: 1300.0,
		paid_amount: 650.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1019",
		order_id: "ORD-0019",
		issue_date: "2024-10-19T10:00:00Z",
		amount: 950.0,
		paid_amount: 950.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1020",
		order_id: "ORD-0020",
		issue_date: "2024-10-20T10:00:00Z",
		amount: 2200.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1021",
		order_id: "ORD-0021",
		issue_date: "2024-10-21T10:00:00Z",
		amount: 1800.0,
		paid_amount: 900.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1022",
		order_id: "ORD-0022",
		issue_date: "2024-10-22T10:00:00Z",
		amount: 4000.0,
		paid_amount: 4000.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1023",
		order_id: "ORD-0023",
		issue_date: "2024-10-23T10:00:00Z",
		amount: 650.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1024",
		order_id: "ORD-0024",
		issue_date: "2024-10-24T10:00:00Z",
		amount: 1250.0,
		paid_amount: 500.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1025",
		order_id: "ORD-0025",
		issue_date: "2024-10-25T10:00:00Z",
		amount: 7500.0,
		paid_amount: 7500.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1026",
		order_id: "ORD-0026",
		issue_date: "2024-10-26T10:00:00Z",
		amount: 120.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1027",
		order_id: "ORD-0027",
		issue_date: "2024-10-27T10:00:00Z",
		amount: 2800.0,
		paid_amount: 1400.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1028",
		order_id: "ORD-0028",
		issue_date: "2024-10-28T10:00:00Z",
		amount: 3500.0,
		paid_amount: 3500.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1029",
		order_id: "ORD-0029",
		issue_date: "2024-10-29T10:00:00Z",
		amount: 480.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1030",
		order_id: "ORD-0030",
		issue_date: "2024-10-30T10:00:00Z",
		amount: 1900.0,
		paid_amount: 950.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	},
	{
		payment_id: "INV-1031",
		order_id: "ORD-0031",
		issue_date: "2024-10-31T10:00:00Z",
		amount: 5000.0,
		paid_amount: 5000.0,
		status: ENUM_INVOICE_STATUS.PAID
	},
	{
		payment_id: "INV-1032",
		order_id: "ORD-0032",
		issue_date: "2024-11-01T10:00:00Z",
		amount: 350.0,
		paid_amount: 0.0,
		status: ENUM_INVOICE_STATUS.UNPAID
	},
	{
		payment_id: "INV-1033",
		order_id: "ORD-0033",
		issue_date: "2024-11-02T10:00:00Z",
		amount: 1450.0,
		paid_amount: 725.0,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID
	}
];

export const INVOICE_DETAILS_MAP: Record<string, IInvoiceDetailBackend> = {
	"INV-1001": {
		payment_id: "INV-1001",
		order_id: "ORD-0001",
		issue_date: "2024-10-01T10:00:00Z",
		due_date: "2024-10-11T10:00:00Z",
		amount: 1200.0,
		paid_amount: 1200.0,
		remaining_amount: 0.0,
		currency: "USD" as ENUM_CURRENCY_OPTIONS_TYPE,
		status: ENUM_INVOICE_STATUS.PAID,
		billing_info: {
			company: "Tech Solutions Inc",
			address: "123 Innovation Way, SF",
			contact: "Alice Smith",
			email: "alice@tech.com",
			phone: "+1 555-0101"
		},
		booking_info: {
			tour: "Silicon Valley Tech Tour",
			pax: 2,
			dates: "15.11.2024 - 17.11.2024",
			duration: "3D/2N"
		},
		payments: [
			{
				no: 1,
				amount: 1200.0,
				date: "2024-10-02T10:00:00Z",
				file: {
					url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
					file_name: "Payment-INV-1001.pdf"
				}
			}
		],
		export_file: {
			url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
			file_name: "INV-1001.pdf"
		}
	},
	"INV-1002": {
		payment_id: "INV-1002",
		order_id: "ORD-0002",
		issue_date: "2024-10-02T10:00:00Z",
		due_date: "2024-10-12T10:00:00Z",
		amount: 500.0,
		paid_amount: 0.0,
		remaining_amount: 500.0,
		currency: "USD" as ENUM_CURRENCY_OPTIONS_TYPE,
		status: ENUM_INVOICE_STATUS.UNPAID,
		billing_info: {
			company: "Best Tours Ltd",
			address: "Main St 1, London",
			contact: "John Doe",
			email: "john@tours.com",
			phone: "+44 20 7946 0000"
		},
		booking_info: {
			tour: "London City Walk",
			pax: 4,
			dates: "10.12.2024 - 10.12.2024",
			duration: "1D"
		},
		payments: [],
		export_file: {
			url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
			file_name: "INV-1002.pdf"
		}
	},
	"INV-1003": {
		payment_id: "INV-1003",
		order_id: "ORD-0003",
		issue_date: "2024-10-03T10:00:00Z",
		due_date: "2024-10-13T10:00:00Z",
		amount: 2500.0,
		paid_amount: 1000.0,
		remaining_amount: 1500.0,
		currency: "USD" as ENUM_CURRENCY_OPTIONS_TYPE,
		status: ENUM_INVOICE_STATUS.PARTIALLY_PAID,
		billing_info: {
			company: "Adventure Seekers",
			address: "Mountain Rd 5, Denver",
			contact: "Jane Smith",
			email: "jane@adventure.com",
			phone: "+1 303-555-0123"
		},
		booking_info: {
			tour: "Rocky Mountains Trek",
			pax: 4,
			dates: "01.12.2024 - 10.12.2024",
			duration: "10D/9N"
		},
		payments: [
			{
				no: 1,
				amount: 1000.0,
				date: "2024-10-04T10:00:00Z",
				file: {
					url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
					file_name: "Payment-INV-1003.pdf"
				}
			}
		],
		export_file: {
			url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
			file_name: "INV-1003.pdf"
		}
	},
	"INV-1004": {
		payment_id: "INV-1004",
		order_id: "ORD-0004",
		issue_date: "2024-10-04T10:00:00Z",
		due_date: "2024-10-14T10:00:00Z",
		amount: 3000.0,
		paid_amount: 3000.0,
		remaining_amount: 0.0,
		currency: "USD" as ENUM_CURRENCY_OPTIONS_TYPE,
		status: ENUM_INVOICE_STATUS.PAID,
		billing_info: {
			company: "Global Travel Agency",
			address: "Strange St. 98, NY",
			contact: "Jo Malou",
			email: "jo@global.com",
			phone: "+1 212-555-0199"
		},
		booking_info: {
			tour: "Uzbekistan Heritage Tour",
			pax: 22,
			dates: "22.01.2025 - 27.01.2025",
			duration: "5D/4N"
		},
		payments: [
			{
				no: 1,
				amount: 3000.0,
				date: "2024-10-05T10:00:00Z",
				file: {
					url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
					file_name: "Payment-INV-1004.pdf"
				}
			}
		],
		export_file: {
			url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX",
			file_name: "INV-1004.pdf"
		}
	}
};
