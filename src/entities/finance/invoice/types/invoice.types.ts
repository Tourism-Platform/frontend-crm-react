export const ENUM_INVOICE_STATUS = {
	PAID: "paid",
	UNPAID: "unpaid",
	PARTIALLY_PAID: "partially_paid"
} as const;

export type ENUM_INVOICE_STATUS_TYPE =
	(typeof ENUM_INVOICE_STATUS)[keyof typeof ENUM_INVOICE_STATUS];
