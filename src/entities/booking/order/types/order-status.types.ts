export const ENUM_ORDER_STATUS = {
	NEW: "new",
	ACCEPTED: "accepted",
	REJECTED: "rejected",
	PENDING: "pending"
} as const;

export type ENUM_ORDER_STATUS_TYPE =
	(typeof ENUM_ORDER_STATUS)[keyof typeof ENUM_ORDER_STATUS];
