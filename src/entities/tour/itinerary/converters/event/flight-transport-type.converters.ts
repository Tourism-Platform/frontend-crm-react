import { createEnumMapper } from "@/shared/utils";

import type { ENUM_FLIGHT_TRANSPORT_TYPE_TYPE } from "../../types";
import { ENUM_FLIGHT_TRANSPORT_TYPE } from "../../types";

type TBackendTransportTyp = "1" | "2" | "3";

const MAP_FLIGHT_TRANSPORT_TYPE_TO_BACKEND: Partial<
	Record<ENUM_FLIGHT_TRANSPORT_TYPE_TYPE, TBackendTransportTyp>
> = {
	[ENUM_FLIGHT_TRANSPORT_TYPE.FLY]: "1",
	[ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN]: "2",
	[ENUM_FLIGHT_TRANSPORT_TYPE.BUS]: "3"
};

export const flightTransportTypeMapper = createEnumMapper<
	ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	TBackendTransportTyp
>(MAP_FLIGHT_TRANSPORT_TYPE_TO_BACKEND);

export const backendTransportTypToTransportType = (
	typ: TBackendTransportTyp | undefined
): ENUM_FLIGHT_TRANSPORT_TYPE_TYPE | undefined => {
	if (typ === "1") return ENUM_FLIGHT_TRANSPORT_TYPE.FLY;
	if (typ === "2") return ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN;
	if (typ === "3") return ENUM_FLIGHT_TRANSPORT_TYPE.BUS;
	return flightTransportTypeMapper.from(typ);
};
