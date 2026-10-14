import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

/** Language is part of the cache key — each `lang` is its own entry. */
export interface IBookingOrderQueryArgs {
	bookingId: string;
	language: ENUM_LANGUAGES_TYPE;
}
