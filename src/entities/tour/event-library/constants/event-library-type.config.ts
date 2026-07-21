import type { TOptionsKeys } from "@/shared/config";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "@/entities/tour/itinerary";

/** Event types available in event library API (typ 1–9, no multiply-option). */
export const EVENT_LIBRARY_FILTER_TYPES: ENUM_EVENT_TYPE[] = [
	ENUM_EVENT.FLIGHT,
	ENUM_EVENT.TRANSPORTATION,
	ENUM_EVENT.ACCOMMODATION,
	ENUM_EVENT.ACTIVITY,
	ENUM_EVENT.INFO,
	ENUM_EVENT.SUPPLEMENT
];

export const EVENT_LIBRARY_TYPE_LABELS: Partial<
	Record<ENUM_EVENT_TYPE, TOptionsKeys>
> = {
	[ENUM_EVENT.FLIGHT]: "event_library.types.flight",
	[ENUM_EVENT.TRANSPORTATION]: "event_library.types.transportation",
	[ENUM_EVENT.ACCOMMODATION]: "event_library.types.accommodation",
	[ENUM_EVENT.ACTIVITY]: "event_library.types.activity",
	[ENUM_EVENT.INFO]: "event_library.types.info",
	[ENUM_EVENT.SUPPLEMENT]: "event_library.types.supplement"
};
