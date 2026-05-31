import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type ITourEvent,
	type ITourEventCreate,
	type ITourEventReorder,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventCreateBackend,
	type TTourEventReorderBackend,
	type TTourEventUpdate,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../types";

import { eventTypeMapper } from "./event-type.converters";
import {
	mapInfoEventToForm,
	mapInfoFormToUpdate
} from "./event/info.converters";
import {
	mapTransferEventToForm,
	mapTransferFormToUpdate
} from "./event/transportation.converters";

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
		eventTypeMapper.from(backend.event.typ as string) ||
		ENUM_EVENT.TOUR_DETAILS,
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
		case "4":
			return mapTransferEventToForm(backend);
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
	if (type === ENUM_EVENT.TRANSPORTATION)
		return mapTransferFormToUpdate(frontend);
	else if (type === ENUM_EVENT.INFO) return mapInfoFormToUpdate(frontend);

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
