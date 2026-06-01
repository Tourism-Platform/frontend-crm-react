import type { TOptionsKeys } from "@/shared/config";

import { ENUM_ACTIVITY_TYPE, type ENUM_ACTIVITY_TYPE_TYPE } from "../types";

export const ACTIVITY_TYPE_LABELS: Partial<
	Record<ENUM_ACTIVITY_TYPE_TYPE, TOptionsKeys>
> = {
	[ENUM_ACTIVITY_TYPE.FOOD]: "tour.activityTypes.food",
	[ENUM_ACTIVITY_TYPE.MASTER_CLASS]: "tour.activityTypes.master_class",
	[ENUM_ACTIVITY_TYPE.SIGHTSEEING]: "tour.activityTypes.sightseeing",
	[ENUM_ACTIVITY_TYPE.OUTDOOR]: "tour.activityTypes.outdoor",
	[ENUM_ACTIVITY_TYPE.RIDING]: "tour.activityTypes.riding",
	[ENUM_ACTIVITY_TYPE.EXTREME]: "tour.activityTypes.extreme",
	[ENUM_ACTIVITY_TYPE.WELLNESS]: "tour.activityTypes.wellness",
	[ENUM_ACTIVITY_TYPE.ENTERTAINMENT]: "tour.activityTypes.entertainment",
	[ENUM_ACTIVITY_TYPE.WATER_ACTIVITIES]:
		"tour.activityTypes.water_activities",
	[ENUM_ACTIVITY_TYPE.PHOTOGRAPHY]: "tour.activityTypes.photography",
	[ENUM_ACTIVITY_TYPE.SPIRITUAL]: "tour.activityTypes.spiritual"
};
