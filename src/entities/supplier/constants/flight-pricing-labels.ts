import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_FLIGHT_PRICING,
	type ENUM_FLIGHT_PRICING_TYPE
} from "../types/flight/product.types";

export const FLIGHT_PRICING_LABELS: Record<
	ENUM_FLIGHT_PRICING_TYPE,
	TOptionsKeys
> = {
	[ENUM_FLIGHT_PRICING.PER_FARE]: "flight_pricing.per_fare",
	[ENUM_FLIGHT_PRICING.WHOLE]: "flight_pricing.whole"
};
