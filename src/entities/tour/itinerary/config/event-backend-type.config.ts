import type { TOptionsKeys } from "@/shared/config";

import { ENUM_EVENT_BACKEND, type ENUM_EVENT_BACKEND_TYPE } from "../types";

export const EVENT_BACKEND_TYPE_LABELS: Record<
	ENUM_EVENT_BACKEND_TYPE,
	TOptionsKeys
> = {
	[ENUM_EVENT_BACKEND.FLIGHT]: "event_types.flight",
	[ENUM_EVENT_BACKEND.TRAIN]: "event_types.train",
	[ENUM_EVENT_BACKEND.BUS]: "event_types.bus",
	[ENUM_EVENT_BACKEND.TRANSFER]: "event_types.transfer",
	[ENUM_EVENT_BACKEND.HOUSING]: "event_types.housing",
	[ENUM_EVENT_BACKEND.ACTIVITY]: "event_types.activity",
	[ENUM_EVENT_BACKEND.REF]: "event_types.ref",
	[ENUM_EVENT_BACKEND.GUIDE]: "event_types.guide",
	[ENUM_EVENT_BACKEND.SUPPLEMENTARY]: "event_types.supplementary",
	[ENUM_EVENT_BACKEND.OPTIONS]: "event_types.options"
};
