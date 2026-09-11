import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type ENUM_SUPPLIER_VARIANT_CHARGE_TYPE
} from "../types/supplier-variant-charge.types";

export const FLIGHT_VARIANT_CHARGE_LABELS: Record<
	ENUM_SUPPLIER_VARIANT_CHARGE_TYPE,
	TOptionsKeys
> = {
	[ENUM_SUPPLIER_VARIANT_CHARGE.FIXED]: "flight_variant_charge.fixed",
	[ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON]:
		"flight_variant_charge.per_person"
};
