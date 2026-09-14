import type { TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "../types/supplier-type.types";

export const SUPPLIER_TYPE_BADGE: Record<
	ENUM_SUPPLIER_TYPE_TYPE,
	{ variant: BadgeVariant; label: TOptionsKeys }
> = {
	[ENUM_SUPPLIER_TYPE.HOTEL]: {
		variant: "cyan",
		label: "supplier_type.hotel"
	},
	[ENUM_SUPPLIER_TYPE.TRAIN]: {
		variant: "indigo",
		label: "supplier_type.train"
	},
	[ENUM_SUPPLIER_TYPE.FLIGHT]: {
		variant: "blue",
		label: "supplier_type.flight"
	},
	[ENUM_SUPPLIER_TYPE.BUS]: {
		variant: "violet",
		label: "supplier_type.bus"
	},
	[ENUM_SUPPLIER_TYPE.TRANSFER]: {
		variant: "emerald",
		label: "supplier_type.transfer"
	},
	[ENUM_SUPPLIER_TYPE.ACTIVITY]: {
		variant: "sky",
		label: "supplier_type.activity"
	},
	[ENUM_SUPPLIER_TYPE.MUSEUM]: {
		variant: "orange",
		label: "supplier_type.museum"
	}
};
