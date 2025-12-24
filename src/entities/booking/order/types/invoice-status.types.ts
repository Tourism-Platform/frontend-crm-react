export const ENUM_INVOICE_STATUS = {
	PAID: "paid",
	PARTIALLY_PAID: "partially paid",
	UNPAID: "unpaid"
} as const;

export type ENUM_INVOICE_STATUS_TYPE =
	(typeof ENUM_INVOICE_STATUS)[keyof typeof ENUM_INVOICE_STATUS];
