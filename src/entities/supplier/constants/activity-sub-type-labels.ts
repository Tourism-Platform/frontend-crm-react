import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_ACTIVITY_SUB_TYPE,
	type ENUM_ACTIVITY_SUB_TYPE_TYPE
} from "../types/activity/activity-sub-type.types";

export const ACTIVITY_SUB_TYPE_LABELS: Record<
	ENUM_ACTIVITY_SUB_TYPE_TYPE,
	TOptionsKeys
> = {
	[ENUM_ACTIVITY_SUB_TYPE.FOOD]: "activity_type.food",
	[ENUM_ACTIVITY_SUB_TYPE.MASTER_CLASS]: "activity_type.master_class",
	[ENUM_ACTIVITY_SUB_TYPE.SIGHTSEEING]: "activity_type.sightseeing",
	[ENUM_ACTIVITY_SUB_TYPE.OUTDOOR]: "activity_type.outdoor",
	[ENUM_ACTIVITY_SUB_TYPE.RIDING]: "activity_type.riding",
	[ENUM_ACTIVITY_SUB_TYPE.EXTREME]: "activity_type.extreme",
	[ENUM_ACTIVITY_SUB_TYPE.WELLNESS]: "activity_type.wellness",
	[ENUM_ACTIVITY_SUB_TYPE.ENTERTAINMENT]: "activity_type.entertainment",
	[ENUM_ACTIVITY_SUB_TYPE.WATER_ACTIVITIES]: "activity_type.water_activities",
	[ENUM_ACTIVITY_SUB_TYPE.PHOTOGRAPHY]: "activity_type.photography",
	[ENUM_ACTIVITY_SUB_TYPE.SPIRITUAL]: "activity_type.spiritual",
	[ENUM_ACTIVITY_SUB_TYPE.OTHER]: "activity_type.other"
};
