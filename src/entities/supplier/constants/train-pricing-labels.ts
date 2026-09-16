import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_TRAIN_PRICING,
	type ENUM_TRAIN_PRICING_TYPE
} from "../types/train/product.types";

export const TRAIN_PRICING_LABELS: Record<
	ENUM_TRAIN_PRICING_TYPE,
	TOptionsKeys
> = {
	[ENUM_TRAIN_PRICING.PER_FARE]: "train_pricing.per_fare",
	[ENUM_TRAIN_PRICING.WHOLE]: "train_pricing.whole"
};
