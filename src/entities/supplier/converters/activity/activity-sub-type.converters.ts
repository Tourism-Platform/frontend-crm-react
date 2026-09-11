import { ActivityType } from "@/shared/api/generated/Api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_ACTIVITY_SUB_TYPE,
	type ENUM_ACTIVITY_SUB_TYPE_TYPE
} from "../../types";

const MAP_ACTIVITY_SUB_TYPE: Record<ENUM_ACTIVITY_SUB_TYPE_TYPE, ActivityType> =
	{
		[ENUM_ACTIVITY_SUB_TYPE.FOOD]: ActivityType.Food,
		[ENUM_ACTIVITY_SUB_TYPE.MASTER_CLASS]: ActivityType.MasterClass,
		[ENUM_ACTIVITY_SUB_TYPE.SIGHTSEEING]: ActivityType.Sightseeing,
		[ENUM_ACTIVITY_SUB_TYPE.OUTDOOR]: ActivityType.Outdoor,
		[ENUM_ACTIVITY_SUB_TYPE.RIDING]: ActivityType.Riding,
		[ENUM_ACTIVITY_SUB_TYPE.EXTREME]: ActivityType.Extreme,
		[ENUM_ACTIVITY_SUB_TYPE.WELLNESS]: ActivityType.Wellness,
		[ENUM_ACTIVITY_SUB_TYPE.ENTERTAINMENT]: ActivityType.Entertainment,
		[ENUM_ACTIVITY_SUB_TYPE.WATER_ACTIVITIES]: ActivityType.WaterActivities,
		[ENUM_ACTIVITY_SUB_TYPE.PHOTOGRAPHY]: ActivityType.Photography,
		[ENUM_ACTIVITY_SUB_TYPE.SPIRITUAL]: ActivityType.Spiritual,
		[ENUM_ACTIVITY_SUB_TYPE.OTHER]: ActivityType.Other
	};

export const activitySubTypeConverter = createEnumMapper<
	ENUM_ACTIVITY_SUB_TYPE_TYPE,
	ActivityType
>(MAP_ACTIVITY_SUB_TYPE);
