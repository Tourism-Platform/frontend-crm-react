export const ENUM_SUPPLIER_PAYMENT_STATUS = {
	BOOKED: "booked",
	RECORDED: "recorded",
	NOT_BOOKED: "not_booked"
} as const;

export type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE =
	(typeof ENUM_SUPPLIER_PAYMENT_STATUS)[keyof typeof ENUM_SUPPLIER_PAYMENT_STATUS];
