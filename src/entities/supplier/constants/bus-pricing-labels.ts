import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_BUS_PRICING,
	type ENUM_BUS_PRICING_TYPE
} from "../types/bus/product.types";

export const BUS_PRICING_LABELS: Record<ENUM_BUS_PRICING_TYPE, TOptionsKeys> = {
	[ENUM_BUS_PRICING.PER_VEHICLE]: "bus_pricing.per_vehicle",
	[ENUM_BUS_PRICING.WHOLE]: "bus_pricing.whole"
};
