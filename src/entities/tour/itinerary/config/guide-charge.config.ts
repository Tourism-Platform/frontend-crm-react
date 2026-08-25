import type { TOptionsKeys } from "@/shared/config";

import { ENUM_GUIDE_CHARGE, type ENUM_GUIDE_CHARGE_TYPE } from "../types";

export const GUIDE_CHARGE_LABELS: Record<ENUM_GUIDE_CHARGE_TYPE, TOptionsKeys> =
	{
		[ENUM_GUIDE_CHARGE.FIXED]: "guide.charge.fixed",
		[ENUM_GUIDE_CHARGE.PER_DURATION]: "guide.charge.per_duration"
	};
