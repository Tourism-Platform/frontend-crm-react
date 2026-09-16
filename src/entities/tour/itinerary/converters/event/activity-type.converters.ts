import { ActivityType, GeneralVenueInputSubTypEnum } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_ACTIVITY_TYPE, type ENUM_ACTIVITY_TYPE_TYPE } from "../../types";

const MAP_ACTIVITY_TYPE: Partial<
	Record<ENUM_ACTIVITY_TYPE_TYPE, ActivityType>
> = {
	[ENUM_ACTIVITY_TYPE.FOOD]: ActivityType.Food,
	[ENUM_ACTIVITY_TYPE.MASTER_CLASS]: ActivityType.MasterClass,
	[ENUM_ACTIVITY_TYPE.SIGHTSEEING]: ActivityType.Sightseeing,
	[ENUM_ACTIVITY_TYPE.OUTDOOR]: ActivityType.Outdoor,
	[ENUM_ACTIVITY_TYPE.RIDING]: ActivityType.Riding,
	[ENUM_ACTIVITY_TYPE.EXTREME]: ActivityType.Extreme,
	[ENUM_ACTIVITY_TYPE.WELLNESS]: ActivityType.Wellness,
	[ENUM_ACTIVITY_TYPE.ENTERTAINMENT]: ActivityType.Entertainment,
	[ENUM_ACTIVITY_TYPE.WATER_ACTIVITIES]: ActivityType.WaterActivities,
	[ENUM_ACTIVITY_TYPE.PHOTOGRAPHY]: ActivityType.Photography,
	[ENUM_ACTIVITY_TYPE.SPIRITUAL]: ActivityType.Spiritual
};

export const activityTypeMapper = createEnumMapper<
	ENUM_ACTIVITY_TYPE_TYPE,
	ActivityType
>(MAP_ACTIVITY_TYPE);

/** Form `ActivityType` → WRITE general-venue `sub_typ` (excludes food). */
export const ACTIVITY_TYPE_TO_GENERAL_SUB_TYP: Partial<
	Record<ActivityType, GeneralVenueInputSubTypEnum>
> = {
	[ActivityType.MasterClass]: GeneralVenueInputSubTypEnum.MasterClass,
	[ActivityType.Sightseeing]: GeneralVenueInputSubTypEnum.Sightseeing,
	[ActivityType.Outdoor]: GeneralVenueInputSubTypEnum.Outdoor,
	[ActivityType.Riding]: GeneralVenueInputSubTypEnum.Riding,
	[ActivityType.Extreme]: GeneralVenueInputSubTypEnum.Extreme,
	[ActivityType.Wellness]: GeneralVenueInputSubTypEnum.Wellness,
	[ActivityType.Entertainment]: GeneralVenueInputSubTypEnum.Entertainment,
	[ActivityType.WaterActivities]: GeneralVenueInputSubTypEnum.WaterActivities,
	[ActivityType.Photography]: GeneralVenueInputSubTypEnum.Photography,
	[ActivityType.Spiritual]: GeneralVenueInputSubTypEnum.Spiritual
};
