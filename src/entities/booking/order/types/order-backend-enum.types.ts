import {
	ApplyAvailabilityInput,
	AvailabilityStatus,
	BookingClientType,
	BookingStatusLabel,
	EditOp
} from "@/shared/api";

export const ENUM_APPLY_AVAILABILITY_INPUT_BACKEND = {
	AVAILABLE: ApplyAvailabilityInput.Available,
	UNAVAILABLE: ApplyAvailabilityInput.Unavailable,
	SELECTED: ApplyAvailabilityInput.Selected,
	DESELECTED: ApplyAvailabilityInput.Deselected
} as const;

export type ENUM_APPLY_AVAILABILITY_INPUT_BACKEND_TYPE = ApplyAvailabilityInput;

export const ENUM_AVAILABILITY_STATUS_BACKEND = {
	PENDING: AvailabilityStatus.Pending,
	AVAILABLE: AvailabilityStatus.Available,
	UNAVAILABLE: AvailabilityStatus.Unavailable,
	SELECTED: AvailabilityStatus.Selected,
	DESELECTED: AvailabilityStatus.Deselected
} as const;

export type ENUM_AVAILABILITY_STATUS_BACKEND_TYPE = AvailabilityStatus;

export const ENUM_EDIT_OP_BACKEND = {
	CREATE: EditOp.Create,
	UPDATE: EditOp.Update,
	DELETE: EditOp.Delete,
	OVERRIDE: EditOp.Override
} as const;

export type ENUM_EDIT_OP_BACKEND_TYPE = EditOp;

export const ENUM_BOOKING_CLIENT_TYPE_BACKEND = {
	AGENCY: BookingClientType.Agency,
	TOURIST: BookingClientType.Tourist
} as const;

export type ENUM_BOOKING_CLIENT_TYPE_BACKEND_TYPE = BookingClientType;

export const ENUM_BOOKING_STATUS_LABEL_BACKEND = {
	DRAFT: BookingStatusLabel.Draft,
	NEW: BookingStatusLabel.New,
	IN_PROCESSING: BookingStatusLabel.InProcessing,
	BOOKED: BookingStatusLabel.Booked,
	IN_PROGRESS: BookingStatusLabel.InProgress,
	COMPLETE: BookingStatusLabel.Complete,
	CANCELLED: BookingStatusLabel.Cancelled,
	DECLINED: BookingStatusLabel.Declined
} as const;

export type ENUM_BOOKING_STATUS_LABEL_BACKEND_TYPE = BookingStatusLabel;
