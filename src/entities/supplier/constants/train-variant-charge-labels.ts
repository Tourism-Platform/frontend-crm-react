import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_TRAIN_VARIANT_CHARGE,
	type ENUM_TRAIN_VARIANT_CHARGE_TYPE
} from "../types/train/product.types";

export const TRAIN_VARIANT_CHARGE_LABELS: Record<
	ENUM_TRAIN_VARIANT_CHARGE_TYPE,
	TOptionsKeys
> = {
	[ENUM_TRAIN_VARIANT_CHARGE.FIXED]: "train_variant_charge.fixed",
	[ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON]: "train_variant_charge.per_person"
};
