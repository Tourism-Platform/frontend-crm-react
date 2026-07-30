import { LanguageCode, type MultiEventReadOutput } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";

import {
	ENUM_EVENT,
	type ENUM_EVENT_BACKEND_TYPE,
	type ENUM_EVENT_TYPE,
	type IEventOptionReorder,
	type IMoveToMultiResult,
	type IMoveToSingleResult,
	type ITourEvent,
	type ITourEventCreate,
	type ITourEventOption,
	type ITourEventReorder,
	type TAccommodationEditSchema,
	type TActivityEditSchema,
	type TEventOptionBodyBackend,
	type TEventOptionReorderBackend,
	type TFlightEditSchema,
	type TGuideEditSchema,
	type TMoveToMultiResultBackend,
	type TMoveToSingleResultBackend,
	type TSupplementEditSchema,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventCreateBackend,
	type TTourEventReorderBackend,
	type TTourEventUpdate,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../types";
import { ENUM_EVENT_BACKEND } from "../types";

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
	mapMultiplyOptionDetailToOption,
	mapMultiplyOptionEventToForm,
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
	const event: ITourEvent = {
		id: backend.id,
		tourOptionId: backend.tour_option_id,
		name: "",
		description: "",
		day: backend.event.day,
		position: backend.event.position,
		eventType:
			mapBackendTypToEventType(
				backend.event.typ as ENUM_EVENT_BACKEND_TYPE | undefined
			) || ENUM_EVENT.TOUR_DETAILS,
		details: (backend.event.details as Record<string, unknown>) || {}
	};

	if ("name" in backend.event) {
		event.name = backend.event.name || "";
	}

	if ("description" in backend.event) {
		event.description = backend.event.description || "";
	}

	if (backend.event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		const multiEvent = backend.event as MultiEventReadOutput;
		event.options = (multiEvent.details ?? [])
			.map(mapMultiplyOptionDetailToOption)
			.filter((opt): opt is ITourEventOption => opt !== null);
		event.details = {};
	}

	return event;
};

export const mapEventToFrontend = (
	backend: TTourEventBackendResponce
): TTourEvent => {
	switch (backend?.event?.typ) {
		case ENUM_EVENT_BACKEND.FLIGHT:
			return mapFlyEventToForm(backend);
		case ENUM_EVENT_BACKEND.TRAIN:
			return mapTrainEventToForm(backend);
		case ENUM_EVENT_BACKEND.BUS:
			return mapBusEventToForm(backend);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return mapTransferEventToForm(backend);
		case ENUM_EVENT_BACKEND.HOUSING:
			return mapAccommodationEventToForm(backend);
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return mapActivityEventToForm(backend);
		case ENUM_EVENT_BACKEND.REF:
			return mapInfoEventToForm(backend);
		case ENUM_EVENT_BACKEND.GUIDE:
			return mapGuideEventToForm(backend);
		case ENUM_EVENT_BACKEND.SUPPLEMENTARY:
			return mapSupplementaryEventToForm(backend);
		case ENUM_EVENT_BACKEND.OPTIONS:
			return mapMultiplyOptionEventToForm(backend);

		default:
			return backend as unknown as TTransportationEditSchema;
	}
};

export const mapEventOptionToFrontend = (
	backend: TTourEventBackendResponce,
	eventOptionId: string
): TTourEvent => {
	if (backend.event?.typ !== ENUM_EVENT_BACKEND.OPTIONS) {
		throw new Error("Event is not a multiply option");
	}

	const multiEvent = backend.event as MultiEventReadOutput;
	const option = (multiEvent.details ?? []).find(
		(detail) => detail.id === eventOptionId
	);
	if (!option) {
		throw new Error(`Event option ${eventOptionId} not found`);
	}

	const asResponse = {
		id: eventOptionId,
		tour_option_id: backend.tour_option_id,
		event: {
			...option,
			day: multiEvent.day,
			position: multiEvent.position
		}
	} as TTourEventBackendResponce;

	return mapEventToFrontend(asResponse);
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

export const mapOptionReorderToBackend = (
	frontend: IEventOptionReorder
): TEventOptionReorderBackend => ({
	order: frontend.order
});

/** Body for addEventOption / updateEventOption kind:"option" (no day/position). */
export const mapEventOptionCreateToBackend = (
	frontend: ITourEventCreate
): TEventOptionBodyBackend => {
	const typ = eventTypeMapper.to(frontend.eventType);

	return {
		name: frontend.name,
		description: frontend.description,
		typ,
		details: frontend.details || {},
		...(frontend.supplierId !== undefined && {
			supplier_id: frontend.supplierId
		}),
		...(frontend.packageId !== undefined && {
			package_id: frontend.packageId
		}),
		is_optional: Boolean(frontend.isOptional)
	} as TEventOptionBodyBackend;
};

export const mapMoveToMultiResultToFrontend = (
	backend: TMoveToMultiResultBackend
): IMoveToMultiResult => ({
	targetEvent: mapAllEventsToFrontend(backend.target_event),
	removedEventId: backend.removed_event_id
});

export const mapMoveToSingleResultToFrontend = (
	backend: TMoveToSingleResultBackend
): IMoveToSingleResult => ({
	newEvent: mapAllEventsToFrontend(backend.new_event),
	sourceEvent: mapAllEventsToFrontend(backend.source_event)
});

export const mapEventCreateToBackend = (
	frontend: ITourEventCreate
): TTourEventCreateBackend => {
	const typ = eventTypeMapper.to(frontend.eventType);
	const isMultipleOption = typ === ENUM_EVENT_BACKEND.OPTIONS;

	return {
		name: frontend.name,
		description: frontend.description,
		day: frontend.day,
		position: frontend.position,
		typ,
		...(isMultipleOption &&
			frontend.details && { details: frontend.details }),
		...(!isMultipleOption
			? { details: frontend.details }
			: { details: [] }),
		...(frontend.supplierId !== undefined && {
			supplier_id: frontend.supplierId
		}),
		...(frontend.packageId !== undefined && {
			package_id: frontend.packageId
		})
	} as TTourEventCreateBackend;
};
