import { PaymentMethod } from "@/shared/api";

export const ENUM_INVOICE_PAYMENT_METHOD = {
	BANK: PaymentMethod.Bank,
	WIRE: PaymentMethod.Wire,
	CHECK: PaymentMethod.Check,
	CASH: PaymentMethod.Cash,
	CREDIT_CARD: PaymentMethod.CreditCard,
	OTHER: PaymentMethod.Other
} as const;

export type ENUM_INVOICE_PAYMENT_METHOD_TYPE = PaymentMethod;

export interface IGenerateInvoiceRequest {
	bookingId: string;
	paymentRouteId: string;
}

export interface IUploadInvoicePdfRequest {
	invoiceId: string;
	file: File;
}

export interface IRecordInvoicePaymentRequest {
	invoiceId: string;
	amount: number;
	method?: ENUM_INVOICE_PAYMENT_METHOD_TYPE;
}
