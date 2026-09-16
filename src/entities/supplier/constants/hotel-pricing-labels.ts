import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_HOTEL_PRICING,
	type ENUM_HOTEL_PRICING_TYPE
} from "../types/hotel/product.types";

export const HOTEL_PRICING_LABELS: Record<
	ENUM_HOTEL_PRICING_TYPE,
	TOptionsKeys
> = {
	[ENUM_HOTEL_PRICING.PER_ROOM]: "hotel_pricing.per_room",
	[ENUM_HOTEL_PRICING.WHOLE]: "hotel_pricing.whole"
};
