import type { TOptionsKeys } from "@/shared/config";

import { ENUM_GUIDE_TYPE, type ENUM_GUIDE_TYPE_TYPE } from "../types";

export const GUIDE_TYPE_LABELS: Record<ENUM_GUIDE_TYPE_TYPE, TOptionsKeys> = {
	[ENUM_GUIDE_TYPE.LOCAL]: "guide.types.local",
	[ENUM_GUIDE_TYPE.ACCOMPANYING]: "guide.types.accompanying"
};
