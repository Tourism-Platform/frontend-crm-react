import { ENUM_PAYMENT_STATUS, type IPayment } from "@/entities/finance";

export const PAYMENTS_MOCK: IPayment[] = [
	{
		paymentId: "INV-1234",
		orderId: "RQA00001",
		issueDate: "2024-10-10",
		amount: 10000.0,
		paidAmount: 10000.0,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.PAID
	},
	{
		paymentId: "INV-1235",
		orderId: "RQA00002",
		issueDate: "2024-10-12",
		amount: 5000.0,
		paidAmount: 2500.0,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.PARTIALLY_PAID
	},
	{
		paymentId: "INV-1236",
		orderId: "RQA00003",
		issueDate: "2024-10-15",
		amount: 3000.0,
		paidAmount: 0.0,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.UNPAID
	}
];
