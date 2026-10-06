import type { BOOKING_REVISION_PATHS } from "@/shared/api/generated/paths/booking-revision.paths";

import type {
	ENUM_EVENT_BACKEND_TYPE,
	ENUM_PRICING_WARNING_TYPE,
	IEventProductLink,
	IPricingBreakdownLine,
	TOverrideProductFormValues
} from "@/entities/tour";

export type TRevisionPreviewBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setPoolMemberProduct
>["_types"]["response"];

export type TRevisionEventBreakdownBackend =
	TRevisionPreviewBackend["breakdown"][number];

export type TRevisionEventProductLinkBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setPoolMemberProduct
>["_types"]["body"];

export type TRevisionEventProductQueryBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setPoolMemberProduct
>["_types"]["query"];

export type TRevisionPoolMemberNewBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.addPoolMember
>["_types"]["body"];

export type TRevisionEventCopyBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.copyEvent
>["_types"]["body"];

export interface IRevisionEventBreakdown {
	eventId: string;
	lines: IPricingBreakdownLine[];
	warnings: ENUM_PRICING_WARNING_TYPE[];
}

export interface ISetRevisionEventProduct {
	bookingId: string;
	eventId: string;
	supplyId: string;
	data: IEventProductLink;
	optionIndex?: number | null;
}

export interface IClearRevisionEventProduct {
	bookingId: string;
	eventId: string;
	supplyId: string;
	optionIndex?: number | null;
}

export interface ISetRevisionEventOverride {
	bookingId: string;
	eventId: string;
	supplyId: string;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	data: TOverrideProductFormValues;
	optionIndex?: number | null;
}

export interface IClearRevisionEventOverride {
	bookingId: string;
	eventId: string;
	supplyId: string;
	optionIndex?: number | null;
}

export interface IAddRevisionPoolMember {
	bookingId: string;
	eventId: string;
	data: TRevisionPoolMemberNewBackend;
	optionIndex?: number | null;
}

export interface IRemoveRevisionPoolMember {
	bookingId: string;
	eventId: string;
	supplyId: string;
	optionIndex?: number | null;
}

/**
 * Copy source for `copyRevisionEvent`. `event` — a live event of the booked
 * tour option (frozen into the booking); `revision` — an event of the
 * booking's snapshot (duplicated right after itself).
 */
export interface IRevisionEventCopySource {
	kind: "event" | "revision";
	eventId: string;
}

export interface ICopyRevisionEvent {
	bookingId: string;
	source: IRevisionEventCopySource;
}
