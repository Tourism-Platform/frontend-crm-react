import { UserRoles } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_ROLE, type ENUM_ROLE_TYPE } from "@/entities/user";

const MAP_ROLES: Partial<Record<ENUM_ROLE_TYPE, UserRoles>> = {
	[ENUM_ROLE.TOUR_OPERATOR]: UserRoles.OperatorAdmin,
	[ENUM_ROLE.AGENCY]: UserRoles.AgencyAdmin
};

export const roleMapper = createEnumMapper<ENUM_ROLE_TYPE, string>(MAP_ROLES);
