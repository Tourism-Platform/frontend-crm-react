export const ENUM_PAYMENT_STATUS = {
	ASSIGNED: "assigned",
	NOT_ASSIGNED: "not_assigned"
} as const;

export type ENUM_PAYMENT_STATUS_TYPE =
	(typeof ENUM_PAYMENT_STATUS)[keyof typeof ENUM_PAYMENT_STATUS];
