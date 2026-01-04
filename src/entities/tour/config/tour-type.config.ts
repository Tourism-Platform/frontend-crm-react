import type { TOptionsKeys } from "@/shared/config";

import { ENUM_TOUR_TYPES, type ENUM_TOUR_TYPES_TYPE } from "../types";

export const TOUR_TYPE_LABELS: Record<ENUM_TOUR_TYPES_TYPE, TOptionsKeys> = {
	[ENUM_TOUR_TYPES.PRIVATE]: "tour.tourTypes.private",
	[ENUM_TOUR_TYPES.GROUP]: "tour.tourTypes.group"
};
