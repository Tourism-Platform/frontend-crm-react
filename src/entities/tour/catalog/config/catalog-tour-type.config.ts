import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_CATALOG_TOUR_TYPES,
	type ENUM_CATALOG_TOUR_TYPES_TYPE
} from "../types";

export const CATALOG_TOUR_TYPE_LABELS: Record<
	ENUM_CATALOG_TOUR_TYPES_TYPE,
	TOptionsKeys
> = {
	[ENUM_CATALOG_TOUR_TYPES.PRIVATE]: "tour.tourTypes.private",
	[ENUM_CATALOG_TOUR_TYPES.GROUP]: "tour.tourTypes.group"
};
