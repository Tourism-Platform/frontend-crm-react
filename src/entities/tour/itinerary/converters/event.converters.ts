import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";

import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type ITourEvent,
	type ITourEventCreate,
	type ITourEventReorder,
	type TAccommodationEditSchema,
	type TActivityEditSchema,
	type TFlightEditSchema,
	type TGuideEditSchema,
	type TSupplementEditSchema,
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
	mapGuideEventToForm,
	mapGuideFormToUpdate,
	mapInfoEventToForm,
	mapInfoFormToUpdate,
	mapSupplementaryEventToForm,
	mapSupplementaryFormToUpdate,
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
): ITourEvent => {
	const event = {
		id: backend.id,
		tourOptionId: backend.tour_option_id,
		name: "",
		description: "",
		day: backend.event.day,
		position: backend.event.position,
		eventType:
			mapBackendTypToEventType(backend.event.typ) ||
			ENUM_EVENT.TOUR_DETAILS,
		details: backend.event.details as Record<string, unknown>
	};

	if ("name" in backend.event) {
		event.name = backend.event.name || "";
	}

	if ("description" in backend.event) {
		event.description = backend.event.description || "";
	}

	return event;
};

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
		case "8":
			return mapGuideEventToForm(backend);
		case "9":
			return mapSupplementaryEventToForm(backend);

		default:
			return backend as unknown as TTransportationEditSchema;
	}
};

export const mapEventUpdateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate,
	language?: ENUM_LANGUAGES_TYPE
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;

	if (type === ENUM_EVENT.FLIGHT)
		return mapTransportFormToUpdate(frontend as TFlightEditSchema, lang);
	else if (type === ENUM_EVENT.TRANSPORTATION)
		return mapTransferFormToUpdate(
			frontend as TTransportationEditSchema,
			lang
		);
	else if (type === ENUM_EVENT.SUPPLEMENT)
		return mapSupplementaryFormToUpdate(frontend as TSupplementEditSchema);
	else if (type === ENUM_EVENT.INFO) return mapInfoFormToUpdate(frontend);
	else if (type === ENUM_EVENT.ACCOMMODATION)
		return mapAccommodationFormToUpdate(
			frontend as TAccommodationEditSchema,
			lang
		);
	else if (type === ENUM_EVENT.ACTIVITY)
		return mapActivityFormToUpdate(frontend as TActivityEditSchema, lang);
	else if (type === ENUM_EVENT.GUIDE)
		return mapGuideFormToUpdate(frontend as TGuideEditSchema);

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
): TTourEventCreateBackend => {
	const typ = eventTypeMapper.to(frontend.eventType);
	const isMultipleOption = typ === "10";

	return {
		name: frontend.name,
		description: frontend.description,
		day: frontend.day,
		position: frontend.position,
		typ,
		details: isMultipleOption
			? (frontend.details ?? [])
			: frontend.details || {},
		...(frontend.supplierId !== undefined && {
			supplier_id: frontend.supplierId
		}),
		...(frontend.packageId !== undefined && {
			package_id: frontend.packageId
		})
	} as TTourEventCreateBackend;
};
