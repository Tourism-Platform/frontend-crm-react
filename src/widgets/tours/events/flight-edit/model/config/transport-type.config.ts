import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "@/entities/supplier";
import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	flightTransportTypeMapper
} from "@/entities/tour";

interface IFlightTransportTypeConfig {
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	supplierTyp: ENUM_SUPPLIER_TYPE_TYPE;
}

const SUPPLIER_TYPE_MAP: Record<
	ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	ENUM_SUPPLIER_TYPE_TYPE
> = {
	[ENUM_FLIGHT_TRANSPORT_TYPE.FLY]: ENUM_SUPPLIER_TYPE.FLIGHT,
	[ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN]: ENUM_SUPPLIER_TYPE.TRAIN,
	[ENUM_FLIGHT_TRANSPORT_TYPE.BUS]: ENUM_SUPPLIER_TYPE.BUS
};

/**
 * Single source for transport-type derived values. Widgets reference only the
 * frontend `ENUM_FLIGHT_TRANSPORT_TYPE`; backend enums stay inside this
 * config and the entities mapper.
 */
export const getFlightTransportTypeConfig = (
	transportType: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE | undefined
): IFlightTransportTypeConfig => {
	const typ = transportType ?? ENUM_FLIGHT_TRANSPORT_TYPE.FLY;

	return {
		eventTyp:
			flightTransportTypeMapper.to(typ) ?? ENUM_EVENT_BACKEND.FLIGHT,
		supplierTyp: SUPPLIER_TYPE_MAP[typ]
	};
};
