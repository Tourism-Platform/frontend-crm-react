import { LanguageCode } from "@/shared/api";

import type { TTourEventUpdateBackend } from "../../../types/event-backend.types";
import { ENUM_FLIGHT_TRANSPORT_TYPE } from "../../../types/flight/flight-enum.types";
import type { TFlightEditSchema } from "../../../types/flight/flight.types";

import { mapBusFormToUpdate } from "./bus.converters";
import { mapFlyFormToUpdate } from "./fly.converters";
import { mapTrainFormToUpdate } from "./train.converters";

export { mapBusEventToForm, mapBusFormToUpdate } from "./bus.converters";
export { mapFlyEventToForm, mapFlyFormToUpdate } from "./fly.converters";
export { mapTrainEventToForm, mapTrainFormToUpdate } from "./train.converters";

/** @deprecated Use mapFlyEventToForm */
export { mapFlyEventToForm as mapFlightEventToForm } from "./fly.converters";

/** @deprecated Use mapFlyFormToUpdate */
export { mapFlyFormToUpdate as mapFlightFormToUpdate } from "./fly.converters";

export const mapTransportFormToUpdate = (
	frontend: Partial<TFlightEditSchema>,
	lang: LanguageCode = LanguageCode.En
): TTourEventUpdateBackend => {
	const transportType = frontend.general?.transport_type;

	switch (transportType) {
		case ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN:
			return mapTrainFormToUpdate(frontend, lang);
		case ENUM_FLIGHT_TRANSPORT_TYPE.BUS:
			return mapBusFormToUpdate(frontend, lang);
		case ENUM_FLIGHT_TRANSPORT_TYPE.FLY:
		default:
			return mapFlyFormToUpdate(frontend);
	}
};
