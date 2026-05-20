import { TourType } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_TOUR_TYPES, type ENUM_TOUR_TYPES_TYPE } from "../types";

const MAP_TOUR_TYPES: Partial<Record<ENUM_TOUR_TYPES_TYPE, TourType>> = {
	//!!! Поправить типы
	[ENUM_TOUR_TYPES.PRIVATE]: TourType.Custom,
	[ENUM_TOUR_TYPES.GROUP]: TourType.Regular
};

export const tourTypeMapper = createEnumMapper<ENUM_TOUR_TYPES_TYPE, TourType>(
	MAP_TOUR_TYPES
);
