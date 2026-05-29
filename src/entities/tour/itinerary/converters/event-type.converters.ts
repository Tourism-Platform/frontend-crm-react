import { createEnumMapper } from "@/shared/utils";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "../types";

const MAP_EVENT_TYPE_TO_BACKEND: Partial<Record<ENUM_EVENT_TYPE, string>> = {
	[ENUM_EVENT.FLIGHT]: "1",
	[ENUM_EVENT.TRANSPORTATION]: "4", // Transport. Note: Some might map Transfer (3) instead. Let's map Transportation to "2" and map both 2 and 3 back to TRANSPORTATION? Actually createEnumMapper is 1-to-1 generally. We will map to "2".
	[ENUM_EVENT.ACCOMMODATION]: "5",
	[ENUM_EVENT.ACTIVITY]: "6",
	[ENUM_EVENT.INFO]: "7",
	[ENUM_EVENT.MULTIPLY_OPTION]: "8"
};

export const eventTypeMapper = createEnumMapper<ENUM_EVENT_TYPE, string>(
	MAP_EVENT_TYPE_TO_BACKEND
);
