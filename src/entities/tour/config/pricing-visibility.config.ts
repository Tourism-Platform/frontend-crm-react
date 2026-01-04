import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_PRICING_VISIBILITY,
	type ENUM_PRICING_VISIBILITY_TYPE
} from "../types";

export const PRICING_VISIBILITY_LABELS: Record<
	ENUM_PRICING_VISIBILITY_TYPE,
	TOptionsKeys
> = {
	[ENUM_PRICING_VISIBILITY.SHOW_FROM]: "tour.visibility.show_from",
	[ENUM_PRICING_VISIBILITY.SHOW_EXACT]: "tour.visibility.show_exact",
	[ENUM_PRICING_VISIBILITY.HIDE]: "tour.visibility.hide"
};
