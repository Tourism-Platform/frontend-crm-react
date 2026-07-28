import { GuideType } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_GUIDE_TYPE, type ENUM_GUIDE_TYPE_TYPE } from "../../types";

const MAP_GUIDE_TYPE: Partial<Record<ENUM_GUIDE_TYPE_TYPE, GuideType>> = {
	[ENUM_GUIDE_TYPE.LOCAL]: GuideType.Local,
	[ENUM_GUIDE_TYPE.ACCOMPANYING]: GuideType.Route
};

export const guideTypeMapper = createEnumMapper<
	ENUM_GUIDE_TYPE_TYPE,
	GuideType
>(MAP_GUIDE_TYPE);
