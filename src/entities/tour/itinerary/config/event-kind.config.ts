import type { TOptionsKeys } from "@/shared/config";

import { ENUM_EVENT_KIND, type ENUM_EVENT_KIND_TYPE } from "../types";

export const EVENT_KIND_LABELS: Record<ENUM_EVENT_KIND_TYPE, TOptionsKeys> = {
	[ENUM_EVENT_KIND.FLIGHT]: "event_types.flight",
	[ENUM_EVENT_KIND.TRAIN]: "event_types.train",
	[ENUM_EVENT_KIND.BUS]: "event_types.bus",
	[ENUM_EVENT_KIND.TRANSFER]: "event_types.transfer",
	[ENUM_EVENT_KIND.HOUSING]: "event_types.housing",
	[ENUM_EVENT_KIND.ACTIVITY]: "event_types.activity",
	[ENUM_EVENT_KIND.REF]: "event_types.ref",
	[ENUM_EVENT_KIND.GUIDE]: "event_types.guide",
	[ENUM_EVENT_KIND.SUPPLEMENTARY]: "event_types.supplementary",
	[ENUM_EVENT_KIND.OPTIONS]: "event_types.options"
};

export const getEventKindLabelKey = (
	kind?: ENUM_EVENT_KIND_TYPE | null
): TOptionsKeys | undefined => (kind ? EVENT_KIND_LABELS[kind] : undefined);
