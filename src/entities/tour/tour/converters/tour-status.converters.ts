import { TourStatus } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_TOUR_STATUS, type ENUM_TOUR_STATUS_TYPE } from "../types";

const MAP_TOUR_STATUS: Partial<Record<ENUM_TOUR_STATUS_TYPE, TourStatus>> = {
	//!!! Поправить типы
	[ENUM_TOUR_STATUS.ACTIVE]: TourStatus.Published,
	[ENUM_TOUR_STATUS.MODERATE]: TourStatus.Published,
	[ENUM_TOUR_STATUS.CANCELLED]: TourStatus.Published,
	[ENUM_TOUR_STATUS.DRAFT]: TourStatus.Draft
};

export const tourStatusMapper = createEnumMapper<
	ENUM_TOUR_STATUS_TYPE,
	TourStatus
>(MAP_TOUR_STATUS);
