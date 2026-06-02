import { createEnumMapper } from "@/shared/utils";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "../types";

const BACKEND_TYP_TO_EVENT_TYPE: Partial<Record<string, ENUM_EVENT_TYPE>> = {
	"1": ENUM_EVENT.FLIGHT,
	"2": ENUM_EVENT.FLIGHT,
	"3": ENUM_EVENT.FLIGHT
};

const MAP_EVENT_TYPE_TO_BACKEND: Partial<Record<ENUM_EVENT_TYPE, string>> = {
	[ENUM_EVENT.FLIGHT]: "1",
	[ENUM_EVENT.TRANSPORTATION]: "4",
	[ENUM_EVENT.ACCOMMODATION]: "5",
	[ENUM_EVENT.ACTIVITY]: "6",
	[ENUM_EVENT.INFO]: "7",
	[ENUM_EVENT.MULTIPLY_OPTION]: "8"
};

export const eventTypeMapper = createEnumMapper<ENUM_EVENT_TYPE, string>(
	MAP_EVENT_TYPE_TO_BACKEND
);

export const mapBackendTypToEventType = (
	typ: string | undefined
): ENUM_EVENT_TYPE | undefined => {
	if (!typ) return undefined;
	return BACKEND_TYP_TO_EVENT_TYPE[typ] ?? eventTypeMapper.from(typ);
};
