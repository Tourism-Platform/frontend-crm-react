import type { BOOKING_REVISION_PATHS } from "@/shared/api/generated/paths/booking-revision.paths";

import type { IEventProductLink, TEventOverride } from "@/entities/tour";

export type TRevisionPreviewBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setEventProduct
>["_types"]["response"];

export type TRevisionEventProductLinkBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setEventProduct
>["_types"]["body"];

export type TRevisionEventProductQueryBackend = ReturnType<
	typeof BOOKING_REVISION_PATHS.setEventProduct
>["_types"]["query"];

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
