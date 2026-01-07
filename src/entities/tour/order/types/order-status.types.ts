export const ENUM_TOUR_ORDER_STATUS = {
	NEW: "new",
	IN_PROCESSING: "in_processing",
	BOOKING: "booking",
	IN_PROGRESS: "in_progress",
	COMPLETED: "completed",
	CANCELLED: "cancelled"
} as const;

export type ENUM_TOUR_ORDER_STATUS_TYPE =
	(typeof ENUM_TOUR_ORDER_STATUS)[keyof typeof ENUM_TOUR_ORDER_STATUS];
