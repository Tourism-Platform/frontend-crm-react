import { TourStatus } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_TOUR_STATUS, type ENUM_TOUR_STATUS_TYPE } from "../types";

const MAP_TOUR_STATUS: Partial<Record<ENUM_TOUR_STATUS_TYPE, TourStatus>> = {
	[ENUM_TOUR_STATUS.PUBLISHED]: TourStatus.Published,
	[ENUM_TOUR_STATUS.ARCHIVED]: TourStatus.Archived,
	[ENUM_TOUR_STATUS.DRAFT]: TourStatus.Draft
};

export const tourStatusMapper = createEnumMapper<
	ENUM_TOUR_STATUS_TYPE,
	TourStatus
>(MAP_TOUR_STATUS);
