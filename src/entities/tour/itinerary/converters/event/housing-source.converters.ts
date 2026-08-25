import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_HOUSING_SOURCE,
	type ENUM_HOUSING_SOURCE_TYPE,
	type THousingSourceBackend
} from "../../types";

const MAP_HOUSING_SOURCE: Record<
	ENUM_HOUSING_SOURCE_TYPE,
	THousingSourceBackend
> = {
	[ENUM_HOUSING_SOURCE.CUSTOM]: "custom",
	[ENUM_HOUSING_SOURCE.INHERITED]: "inherited"
};

export const housingSourceConverter = createEnumMapper<
	ENUM_HOUSING_SOURCE_TYPE,
	THousingSourceBackend
>(MAP_HOUSING_SOURCE);
