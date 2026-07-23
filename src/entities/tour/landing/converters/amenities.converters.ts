import { createEnumMapper } from "@/shared/utils";

import { ENUM_AMENITIES, type ENUM_AMENITIES_TYPE } from "../types";

/** Landing amenities are API `string[]` matching ENUM_AMENITIES — pass through 1:1. */
const IDENTITY = Object.fromEntries(
	Object.values(ENUM_AMENITIES).map((value) => [value, value])
) as Record<ENUM_AMENITIES_TYPE, ENUM_AMENITIES_TYPE>;

export const amenitiesMapper = createEnumMapper<
	ENUM_AMENITIES_TYPE,
	ENUM_AMENITIES_TYPE
>(IDENTITY);
