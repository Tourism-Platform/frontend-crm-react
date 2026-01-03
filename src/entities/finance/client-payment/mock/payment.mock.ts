import { ENUM_PAYMENT_STATUS } from "../types";
import { type IPaymentBackend } from "../types/payment-backend.interface";

export const PAYMENTS_MOCK: IPaymentBackend[] = [
	{
		id: "1",
		payment_id: "INV-0001",
		order_id: "ORD-12345",
		date_created: "2024-12-01T10:00:00Z",
		amount: 1500,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.ASSIGNED,
		note: "First payment"
	},
	{
		id: "2",
		payment_id: "INV-0002",
		order_id: "ORD-12346",
		date_created: "2024-12-05T14:30:00Z",
		amount: 2300,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED,
		note: "Pending payment"
	},
	{
		id: "3",
		payment_id: "INV-0003",
		order_id: "ORD-12347",
		date_created: "2024-12-10T09:15:00Z",
		amount: 750,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.ASSIGNED
	},
	{
		id: "4",
		payment_id: "INV-0004",
		order_id: "ORD-12348",
		date_created: "2024-12-15T16:45:00Z",
		amount: 3100,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED
	},
	{
		id: "5",
		payment_id: "INV-0005",
		order_id: "ORD-12349",
		date_created: "2024-12-20T11:20:00Z",
		amount: 1250,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.ASSIGNED
	},
	{
		id: "6",
		payment_id: "INV-0006",
		order_id: "ORD-12350",
		date_created: "2024-12-21T09:00:00Z",
		amount: 500,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED,
		note: "Partially paid"
	},
	{
		id: "7",
		payment_id: "INV-0007",
		order_id: "ORD-12351",
		date_created: "2024-12-22T14:15:00Z",
		amount: 4200,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.ASSIGNED
	},
	{
		id: "8",
		payment_id: "INV-0008",
		order_id: "ORD-12352",
		date_created: "2024-12-23T11:45:00Z",
		amount: 1100,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED,
		note: "Awaiting confirmation"
	},
	{
		id: "9",
		payment_id: "INV-0009",
		order_id: "ORD-12353",
		date_created: "2024-12-24T16:30:00Z",
		amount: 2750,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.ASSIGNED
	},
	{
		id: "10",
		payment_id: "INV-0010",
		order_id: "ORD-12354",
		date_created: "2024-12-25T10:00:00Z",
		amount: 3500,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED
	}
];
