import { ENUM_PAYMENT_STATUS, type IPayment } from "@/entities/finance";

export const PAYMENTS_MOCK: IPayment[] = [
	{
		id: "1",
		paymentId: "INV-1234",
		orderId: "RQA00001",
		dateCreated: "2024-10-10",
		amount: 10000.0,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.ASSIGNED
	},
	{
		id: "2",
		paymentId: "INV-1235",
		orderId: "RQA00002",
		dateCreated: "2024-10-10",
		amount: 2000.0,
		currency: "USD",
		status: ENUM_PAYMENT_STATUS.NOT_ASSIGNED
	}
];
