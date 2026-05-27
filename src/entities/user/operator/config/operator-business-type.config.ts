import { type TOptionsKeys } from "@/shared/config";

import { ENUM_ROLE, type ENUM_ROLE_TYPE } from "../../account";

export const OPERATOR_BUSINESS_TYPE_LABELS: Record<
	ENUM_ROLE_TYPE,
	TOptionsKeys
> = {
	[ENUM_ROLE.TOUR_OPERATOR]: "user.business.types.tour_operator",
	[ENUM_ROLE.AGENCY]: "user.business.types.agency"
};
