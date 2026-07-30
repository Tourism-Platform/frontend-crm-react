import { createEnumMapper } from "@/shared/utils";

import type { ENUM_FLIGHT_TRANSPORT_TYPE_TYPE } from "../../types";
import { ENUM_EVENT_BACKEND, ENUM_FLIGHT_TRANSPORT_TYPE } from "../../types";

type TBackendTransportTyp =
	| typeof ENUM_EVENT_BACKEND.FLIGHT
	| typeof ENUM_EVENT_BACKEND.TRAIN
	| typeof ENUM_EVENT_BACKEND.BUS;

const MAP_FLIGHT_TRANSPORT_TYPE_TO_BACKEND: Partial<
	Record<ENUM_FLIGHT_TRANSPORT_TYPE_TYPE, TBackendTransportTyp>
> = {
	[ENUM_FLIGHT_TRANSPORT_TYPE.FLY]: ENUM_EVENT_BACKEND.FLIGHT,
	[ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN]: ENUM_EVENT_BACKEND.TRAIN,
	[ENUM_FLIGHT_TRANSPORT_TYPE.BUS]: ENUM_EVENT_BACKEND.BUS
};

export const flightTransportTypeMapper = createEnumMapper<
	ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	TBackendTransportTyp
>(MAP_FLIGHT_TRANSPORT_TYPE_TO_BACKEND);

export const backendTransportTypToTransportType = (
	typ: TBackendTransportTyp | undefined
): ENUM_FLIGHT_TRANSPORT_TYPE_TYPE | undefined => {
	if (typ === ENUM_EVENT_BACKEND.FLIGHT)
		return ENUM_FLIGHT_TRANSPORT_TYPE.FLY;
	if (typ === ENUM_EVENT_BACKEND.TRAIN)
		return ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN;
	if (typ === ENUM_EVENT_BACKEND.BUS) return ENUM_FLIGHT_TRANSPORT_TYPE.BUS;
	return flightTransportTypeMapper.from(typ);
};
