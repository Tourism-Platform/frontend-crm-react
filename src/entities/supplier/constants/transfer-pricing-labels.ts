import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_TRANSFER_PRICING,
	type ENUM_TRANSFER_PRICING_TYPE
} from "../types/transfer/product.types";

export const TRANSFER_PRICING_LABELS: Record<
	ENUM_TRANSFER_PRICING_TYPE,
	TOptionsKeys
> = {
	[ENUM_TRANSFER_PRICING.PER_CAR]: "transfer_pricing.per_car",
	[ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY]:
		"transfer_pricing.per_car_category",
	[ENUM_TRANSFER_PRICING.WHOLE]: "transfer_pricing.whole"
};
