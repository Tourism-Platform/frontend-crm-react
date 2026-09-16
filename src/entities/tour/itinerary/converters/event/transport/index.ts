import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import type { TEventDetailsBackend } from "../../../types/event-backend.types";
import type { TTourEventUpdateBackend } from "../../../types/event-backend.types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE
} from "../../../types/flight/flight-enum.types";
import type { TFlightEditSchema } from "../../../types/flight/flight.types";

import { createEmptyBusSegment, mapBusFormToUpdate } from "./bus.converters";
import { createEmptyFlySegment, mapFlyFormToUpdate } from "./fly.converters";
import {
	createEmptyTrainSegment,
	mapTrainFormToUpdate
} from "./train.converters";

export {
	createEmptyBusSegment,
	mapBusEventToForm,
	mapBusFormToUpdate
} from "./bus.converters";
export {
	createEmptyFlySegment,
	mapFlyEventToForm,
	mapFlyFormToUpdate
} from "./fly.converters";
export {
	createEmptyTrainSegment,
	mapTrainEventToForm,
	mapTrainFormToUpdate
} from "./train.converters";

export const createEmptyTransportSegment = (
	transportType: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE | undefined
): TFlightEditSchema["general"]["route"][number] => {
	switch (transportType) {
		case ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN:
			return createEmptyTrainSegment();
		case ENUM_FLIGHT_TRANSPORT_TYPE.BUS:
			return createEmptyBusSegment();
		default:
			return createEmptyFlySegment();
	}
};

/** @deprecated Use mapFlyEventToForm */
export { mapFlyEventToForm as mapFlightEventToForm } from "./fly.converters";

/** @deprecated Use mapFlyFormToUpdate */
export { mapFlyFormToUpdate as mapFlightFormToUpdate } from "./fly.converters";

export const mapTransportFormToUpdate = (
	frontend: Partial<TFlightEditSchema>,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const transportType = frontend.general?.transport_type;

	switch (transportType) {
		case ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN:
			return mapTrainFormToUpdate(frontend, language, currentDetails);
		case ENUM_FLIGHT_TRANSPORT_TYPE.BUS:
			return mapBusFormToUpdate(frontend, language, currentDetails);
		case ENUM_FLIGHT_TRANSPORT_TYPE.FLY:
		default:
			return mapFlyFormToUpdate(frontend, currentDetails);
	}
};
