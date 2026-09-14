import { EventTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "../types";

/**
 * Backend `EventTypes` → UI event kind.
 *
 * Flight/train/bus all collapse to the single UI `FLIGHT` (transport mode
 * lives in the form, not in the board event type).
 */
const MAP_BACKEND_TYP_TO_EVENT_TYPE: Partial<
	Record<EventTypes, ENUM_EVENT_TYPE>
> = {
	[EventTypes.Flight]: ENUM_EVENT.FLIGHT,
	[EventTypes.Train]: ENUM_EVENT.FLIGHT,
	[EventTypes.Bus]: ENUM_EVENT.FLIGHT,
	[EventTypes.Transfer]: ENUM_EVENT.TRANSPORTATION,
	[EventTypes.Housing]: ENUM_EVENT.ACCOMMODATION,
	[EventTypes.Activity]: ENUM_EVENT.ACTIVITY,
	[EventTypes.Ref]: ENUM_EVENT.INFO,
	[EventTypes.Guide]: ENUM_EVENT.GUIDE,
	[EventTypes.Supplementary]: ENUM_EVENT.SUPPLEMENT,
	[EventTypes.Options]: ENUM_EVENT.MULTIPLY_OPTION
};

export const backendEventTypeMapper = createEnumMapper<
	EventTypes,
	ENUM_EVENT_TYPE
>(MAP_BACKEND_TYP_TO_EVENT_TYPE);
