import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type ITourEvent,
	type ITourEventCreate,
	type ITourEventReorder,
	type TAccommodationEditSchema,
	type TActivityEditSchema,
	type TFlightEditSchema,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventCreateBackend,
	type TTourEventReorderBackend,
	type TTourEventUpdate,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../types";

import {
	mapAccommodationEventToForm,
	mapAccommodationFormToUpdate,
	mapActivityEventToForm,
	mapActivityFormToUpdate,
	mapBusEventToForm,
	mapFlyEventToForm,
	mapInfoEventToForm,
	mapInfoFormToUpdate,
	mapTrainEventToForm,
	mapTransferEventToForm,
	mapTransferFormToUpdate,
	mapTransportFormToUpdate
} from "./event";
import {
	eventTypeMapper,
	mapBackendTypToEventType
} from "./event-type.converters";

export const mapAllEventsToFrontend = (
	backend: TTourEventBackendResponce
): ITourEvent => ({
	id: backend.id,
	tourOptionId: backend.tour_option_id,
	name: backend.event.name || "",
	description: backend.event.description || "",
	day: backend.event.day,
	position: backend.event.position,
	eventType:
		mapBackendTypToEventType(backend.event.typ) || ENUM_EVENT.TOUR_DETAILS,
	details: backend.event.details as Record<string, unknown>
});

// export const mapAllEventsToFrontend = (backend: TTourEventBackend): ITourEvent => ({
// 	id: backend.id,
// 	tourOptionId: backend.tour_option_id,
// 	name: backend.event.name,
// 	description: backend.event.description,
// 	day: backend.event.day,
// 	position: backend.event.position,
// 	eventType:
// 		eventTypeMapper.from(backend.event.typ as string) ||
// 		ENUM_EVENT.TOUR_DETAILS,
// 	details: backend.event.details as Record<string, unknown>
// });

export const mapEventToFrontend = (
	backend: TTourEventBackendResponce
): TTourEvent => {
	switch (backend?.event?.typ) {
		case "1":
			return mapFlyEventToForm(backend);
		case "2":
			return mapTrainEventToForm(backend);
		case "3":
			return mapBusEventToForm(backend);
		case "4":
			return mapTransferEventToForm(backend);
		case "5":
			return mapAccommodationEventToForm(backend);
		case "6":
			return mapActivityEventToForm(backend);
		case "7":
			return mapInfoEventToForm(backend);

		default:
			return backend as unknown as TTransportationEditSchema;
	}
};

export const mapEventUpdateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate
): TTourEventUpdateBackend => {
	if (type === ENUM_EVENT.FLIGHT)
		return mapTransportFormToUpdate(frontend as TFlightEditSchema);
	else if (type === ENUM_EVENT.TRANSPORTATION)
		return mapTransferFormToUpdate(frontend as TTransportationEditSchema);
	else if (type === ENUM_EVENT.INFO) return mapInfoFormToUpdate(frontend);
	else if (type === ENUM_EVENT.ACCOMMODATION)
		return mapAccommodationFormToUpdate(
			frontend as TAccommodationEditSchema
		);
	else if (type === ENUM_EVENT.ACTIVITY)
		return mapActivityFormToUpdate(frontend as TActivityEditSchema);

	return {
		name: frontend.name
	} as TTourEventUpdateBackend;
};

export const mapEventReorderToBackend = (
	frontend: ITourEventReorder
): TTourEventReorderBackend => ({
	day: frontend.day,
	position: frontend.position
});

export const mapEventCreateToBackend = (
	frontend: ITourEventCreate
): TTourEventCreateBackend => ({
	name: frontend.name,
	description: frontend.description,
	day: frontend.day,
	position: frontend.position,
	typ: eventTypeMapper.to(frontend.eventType) as any,
	details:
		eventTypeMapper.to(frontend.eventType) !== "8"
			? frontend.details || {}
			: []
});
