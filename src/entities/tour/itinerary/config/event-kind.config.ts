import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

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

/** Цвет бейджа типа — в тон типам поставщиков (`SUPPLIER_TYPE_BADGE`) и шаблонов событий */
export const EVENT_KIND_VARIANTS: Record<ENUM_EVENT_KIND_TYPE, BadgeVariant> = {
	[ENUM_EVENT_KIND.FLIGHT]: "blue",
	[ENUM_EVENT_KIND.TRAIN]: "indigo",
	[ENUM_EVENT_KIND.BUS]: "violet",
	[ENUM_EVENT_KIND.TRANSFER]: "emerald",
	[ENUM_EVENT_KIND.HOUSING]: "cyan",
	[ENUM_EVENT_KIND.ACTIVITY]: "sky",
	[ENUM_EVENT_KIND.REF]: "secondary",
	[ENUM_EVENT_KIND.GUIDE]: "orange",
	[ENUM_EVENT_KIND.SUPPLEMENTARY]: "yellow",
	[ENUM_EVENT_KIND.OPTIONS]: "secondary"
};

export const getEventKindLabelKey = (
	kind?: ENUM_EVENT_KIND_TYPE | null
): TOptionsKeys | undefined => (kind ? EVENT_KIND_LABELS[kind] : undefined);
