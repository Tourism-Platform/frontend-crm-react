import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_TOUR_TYPE_BACKEND,
	type ENUM_TOUR_TYPE_BACKEND_TYPE
} from "@/entities/tour/tour/types/tour-backend-enum.types";

import {
	ENUM_PREVIEW_TOUR_TYPES,
	type ENUM_PREVIEW_TOUR_TYPES_TYPE
} from "../types";

const MAP_PREVIEW_TOUR_TYPES: Partial<
	Record<ENUM_PREVIEW_TOUR_TYPES_TYPE, ENUM_TOUR_TYPE_BACKEND_TYPE>
> = {
	[ENUM_PREVIEW_TOUR_TYPES.PRIVATE]: ENUM_TOUR_TYPE_BACKEND.CUSTOM,
	[ENUM_PREVIEW_TOUR_TYPES.GROUP]: ENUM_TOUR_TYPE_BACKEND.REGULAR
};

export const previewTourTypeMapper = createEnumMapper<
	ENUM_PREVIEW_TOUR_TYPES_TYPE,
	ENUM_TOUR_TYPE_BACKEND_TYPE
>(MAP_PREVIEW_TOUR_TYPES);
