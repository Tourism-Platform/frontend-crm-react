import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type ENUM_SUPPLIER_VARIANT_CHARGE_TYPE
} from "../types/supplier-variant-charge.types";

export const ACTIVITY_VARIANT_CHARGE_LABELS: Record<
	ENUM_SUPPLIER_VARIANT_CHARGE_TYPE,
	TOptionsKeys
> = {
	[ENUM_SUPPLIER_VARIANT_CHARGE.FIXED]: "activity_variant_charge.fixed",
	[ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON]:
		"activity_variant_charge.per_person"
};
