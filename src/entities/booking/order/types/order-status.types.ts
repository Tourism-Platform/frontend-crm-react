import { BookingStatus, BookingTransition } from "@/shared/api";

export const ENUM_ORDER_STATUS = {
	NEW: "new",
	IN_PROCESSING: "in_processing",
	BOOKING: "booking",
	IN_PROGRESS: "in_progress",
	COMPLETED: "completed",
	CANCELLED: "cancelled"
} as const;

export type ENUM_ORDER_STATUS_TYPE =
	(typeof ENUM_ORDER_STATUS)[keyof typeof ENUM_ORDER_STATUS];

export const ENUM_ORDER_STATUS_BACKEND = {
	NEW: BookingStatus.New,
	IN_PROCESSING: BookingStatus.Pending,
	BOOKING: BookingStatus.Confirmed,
	IN_PROGRESS: BookingStatus.InProgress,
	COMPLETED: BookingStatus.Completed,
	CANCELLED: BookingStatus.Cancelled,
	DRAFT: BookingStatus.Draft,
	DECLINED: BookingStatus.Declined
} as const;

export type ENUM_ORDER_STATUS_BACKEND_TYPE = BookingStatus;

/** Переход, которым бэк переводит заказ в целевой статус */
export const ENUM_ORDER_TRANSITION_BACKEND = {
	IN_PROCESSING: BookingTransition.MoveToPending,
	BOOKING: BookingTransition.MoveToConfirmed,
	IN_PROGRESS: BookingTransition.MoveToInProgress,
	COMPLETED: BookingTransition.MoveToCompleted,
	SUBMIT: BookingTransition.Submit
} as const;

export type ENUM_ORDER_TRANSITION_BACKEND_TYPE = BookingTransition;
