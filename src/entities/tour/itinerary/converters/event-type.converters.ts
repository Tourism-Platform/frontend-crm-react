import { EventTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "../types";

const MAP_EVENT_TYPE_TO_BACKEND: Partial<Record<ENUM_EVENT_TYPE, EventTypes>> =
	{
		[ENUM_EVENT.FLIGHT]: EventTypes.Flight,
		[ENUM_EVENT.TRANSPORTATION]: EventTypes.Transfer,
		[ENUM_EVENT.ACCOMMODATION]: EventTypes.Housing,
		[ENUM_EVENT.ACTIVITY]: EventTypes.Activity,
		[ENUM_EVENT.INFO]: EventTypes.Ref,
		[ENUM_EVENT.GUIDE]: EventTypes.Guide,
		[ENUM_EVENT.SUPPLEMENT]: EventTypes.Supplementary,
		[ENUM_EVENT.MULTIPLY_OPTION]: EventTypes.Options
	};

/** UI event kind ↔ generated backend `EventTypes`. */
export const eventTypeMapper = createEnumMapper<ENUM_EVENT_TYPE, EventTypes>(
	MAP_EVENT_TYPE_TO_BACKEND
);

export const mapEventTypeToBackendTyps = (
	type: ENUM_EVENT_TYPE
): EventTypes[] => {
	if (type === ENUM_EVENT.FLIGHT) {
		return [EventTypes.Flight, EventTypes.Train, EventTypes.Bus];
	}

	const typ = eventTypeMapper.to(type);
	return typ ? [typ] : [];
};
