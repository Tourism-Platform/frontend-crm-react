import { type TOptionsKeys } from "@/shared/config";

import { ENUM_BUSINESS_TYPES, type ENUM_BUSINESS_TYPES_TYPE } from "../types";

export const BUSINESS_TYPE_LABELS: Record<
	ENUM_BUSINESS_TYPES_TYPE,
	TOptionsKeys
> = {
	[ENUM_BUSINESS_TYPES.TOUR_OPERATOR]: "user.business.types.tour_operator",
	[ENUM_BUSINESS_TYPES.AGENCY]: "user.business.types.agency"
};
