import type { BOOKING_REVISION_PATHS } from "@/shared/api/generated/paths/booking-revision.paths";

import type {
	ENUM_PRICING_WARNING_TYPE,
	IEventProductLink,
	IPricingBreakdownLine,
	TEventOverride
} from "@/entities/tour";

export type TRevisionPreviewBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setEventProduct
>["_types"]["response"];

export type TRevisionEventBreakdownBackend =
	TRevisionPreviewBackend["breakdown"][number];

export type TRevisionEventProductLinkBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setEventProduct
>["_types"]["body"];

export type TRevisionEventProductQueryBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setEventProduct
>["_types"]["query"];

export interface IRevisionEventBreakdown {
	eventId: string;
	lines: IPricingBreakdownLine[];
	warnings: ENUM_PRICING_WARNING_TYPE[];
}

export interface ISetRevisionEventProduct {
	bookingId: string;
	eventId: string;
	data: IEventProductLink;
	optionIndex?: number | null;
}

export interface IClearRevisionEventProduct {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
}

export interface ISetRevisionEventOverride {
	bookingId: string;
	eventId: string;
	data: TEventOverride;
	optionIndex?: number | null;
}

export interface IClearRevisionEventOverride {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
}
