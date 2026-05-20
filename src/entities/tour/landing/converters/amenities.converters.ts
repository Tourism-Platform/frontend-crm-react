import { SrcCommonConstantsAmenitiesTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_AMENITIES, type ENUM_AMENITIES_TYPE } from "../types";

const MAP_AMENITIES: Partial<
	Record<ENUM_AMENITIES_TYPE, SrcCommonConstantsAmenitiesTypes>
> = {
	[ENUM_AMENITIES.AIR_CONDITIONING]:
		SrcCommonConstantsAmenitiesTypes.Conditioner,
	[ENUM_AMENITIES.WIFI_ON_BOARD]: SrcCommonConstantsAmenitiesTypes.Wifi
};

export const amenitiesMapper = createEnumMapper<
	ENUM_AMENITIES_TYPE,
	SrcCommonConstantsAmenitiesTypes
>(MAP_AMENITIES);
