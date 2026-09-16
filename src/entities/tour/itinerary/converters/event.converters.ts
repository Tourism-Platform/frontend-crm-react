import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type ENUM_EVENT_TYPE,
	type IEventOptionReorder,
	type IGetTourEventResult,
	type IMoveEventToMulti,
	type IMoveToMultiResult,
	type IMoveToSingleResult,
	type ITourEvent,
	type ITourEventCreate,
	type ITourEventReorder,
	type TAccommodationEditSchema,
	type TActivityEditSchema,
	type TEventDetailsBackend,
	type TEventOptionBodyBackend,
	type TEventOptionReorderBackend,
	type TFlightEditSchema,
	type TGuideEditSchema,
	type TMoveToMultiBodyBackend,
	type TMoveToMultiResultBackend,
	type TMoveToSingleResultBackend,
	type TMultiEventDetailBackend,
	type TSupplementEditSchema,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventCreateBackend,
	type TTourEventReorderBackend,
	type TTourEventUpdate,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../types";

import { backendEventTypeMapper } from "./backend-event-type.converters";
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
import { mapBackendEventToTimeSubtitle } from "./event-time-range.converters";
import { eventTypeMapper } from "./event-type.converters";
import { mapEventDetailsWriteOrEmpty } from "./event/empty-event-details.converters";

/**
 * Slot read → board/list domain model.
 *
 * ID semantics (contract 3.1):
 * - `id`            — event SLOT id (`TourEventResponse.id`), used in routes/API;
 * - `eventOptionId` — option ROW id (`event.id` on the read); single events only,
 *                     multi alternatives carry their own ids inside `options`.
 */
export const mapAllEventsToFrontend = (
	backend: TTourEventBackendResponce
): ITourEvent => {
	const slot = backend.event;

	if (slot.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return {
			id: backend.id,
			tourOptionId: backend.tour_option_id,
			name: "",
			description: "",
			day: slot.day,
			position: slot.position,
			eventType: ENUM_EVENT.MULTIPLY_OPTION,
			backendTyp: ENUM_EVENT_BACKEND.OPTIONS,
			details: null,
			options: (slot.details ?? [])
				.map(mapMultiplyOptionDetailToOption)
				.filter((opt): opt is NonNullable<typeof opt> => opt !== null)
		};
	}

	const backendTyp = slot.typ as ENUM_EVENT_BACKEND_TYPE;

	return {
		id: backend.id,
		tourOptionId: backend.tour_option_id,
		eventOptionId: slot.id,
		name: slot.name || "",
		description: slot.description || "",
		day: slot.day,
		position: slot.position,
		eventType:
			backendEventTypeMapper.to(backendTyp) || ENUM_EVENT.TOUR_DETAILS,
		backendTyp,
		details: slot.details,
		timeSubtitle: mapBackendEventToTimeSubtitle(slot)
	};
};

export const mapEventToFrontend = (
	backend: TTourEventBackendResponce,
	selectedSupplyId?: string
): TTourEvent => {
	switch (backend?.event?.typ) {
		case ENUM_EVENT_BACKEND.FLIGHT:
			return mapFlyEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.TRAIN:
			return mapTrainEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.BUS:
			return mapBusEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return mapTransferEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.HOUSING:
			return mapAccommodationEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return mapActivityEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.REF:
			return mapInfoEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.GUIDE:
			return mapGuideEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.SUPPLEMENTARY:
			return mapSupplementaryEventToForm(backend, selectedSupplyId);
		case ENUM_EVENT_BACKEND.OPTIONS:
			return mapMultiplyOptionEventToForm(backend);
		default:
			// All contract 3.1 typs are handled above.
			throw new Error("Unsupported event typ");
	}
};

export const mapEventOptionToFrontend = (
	backend: TTourEventBackendResponce,
	eventOptionId: string,
	selectedSupplyId?: string
): TTourEvent => {
	if (backend.event?.typ !== ENUM_EVENT_BACKEND.OPTIONS) {
		throw new Error("Event is not a multiply option");
	}

	const multiEvent = backend.event;
	const option = (multiEvent.details ?? []).find(
		(detail: TMultiEventDetailBackend) => detail.id === eventOptionId
	);
	if (!option) {
		throw new Error(`Event option ${eventOptionId} not found`);
	}

	// Re-embed the alternative as a single-event slot read so the type-specific
	// form converters can be reused unchanged. The slot-owned fields
	// (day/position/is_optional/images) come from the multi slot.
	const asResponse: TTourEventBackendResponce = {
		id: backend.id,
		tour_option_id: backend.tour_option_id,
		translation: backend.translation,
		event: {
			...option,
			day: multiEvent.day,
			position: multiEvent.position,
			is_optional: multiEvent.is_optional,
			images: multiEvent.images
		}
	};

	return mapEventToFrontend(asResponse, selectedSupplyId);
};

/**
 * Typed READ details of the addressed option row —
 * `{ plan, pool: [{ id, is_main, supply, spec }] }`; never send back as a WRITE body.
 */
export const mapTourEventDetailsFromBackend = (
	backend: TTourEventBackendResponce,
	eventOptionId?: string
): TEventDetailsBackend | undefined => {
	if (backend.event?.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		if (!eventOptionId) return undefined;
		return (backend.event.details ?? []).find(
			(detail: TMultiEventDetailBackend) => detail.id === eventOptionId
		)?.details;
	}

	return backend.event?.details;
};

export const mapGetTourEventToFrontend = (
	backend: TTourEventBackendResponce,
	eventOptionId?: string,
	selectedSupplyId?: string
): IGetTourEventResult => ({
	form: eventOptionId
		? mapEventOptionToFrontend(backend, eventOptionId, selectedSupplyId)
		: mapEventToFrontend(backend, selectedSupplyId),
	details: mapTourEventDetailsFromBackend(backend, eventOptionId),
	eventOptionId:
		backend.event?.typ === ENUM_EVENT_BACKEND.OPTIONS
			? eventOptionId
			: backend.event?.id,
	response: backend
});

export const mapEventUpdateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	if (type === ENUM_EVENT.FLIGHT)
		return mapTransportFormToUpdate(
			frontend as TFlightEditSchema,
			language,
			currentDetails
		);
	else if (type === ENUM_EVENT.TRANSPORTATION)
		return mapTransferFormToUpdate(
			frontend as TTransportationEditSchema,
			language,
			currentDetails
		);
	else if (type === ENUM_EVENT.SUPPLEMENT)
		return mapSupplementaryFormToUpdate(
			frontend as TSupplementEditSchema,
			currentDetails
		);
	else if (type === ENUM_EVENT.INFO) return mapInfoFormToUpdate(frontend);
	else if (type === ENUM_EVENT.ACCOMMODATION)
		return mapAccommodationFormToUpdate(
			frontend as TAccommodationEditSchema,
			language,
			currentDetails
		);
	else if (type === ENUM_EVENT.ACTIVITY)
		return mapActivityFormToUpdate(
			frontend as TActivityEditSchema,
			language,
			currentDetails
		);
	else if (type === ENUM_EVENT.GUIDE)
		return mapGuideFormToUpdate(
			frontend as TGuideEditSchema,
			language,
			currentDetails
		);

	throw new Error(`Unsupported event type for update: ${type}`);
};

export const mapEventReorderToBackend = (
	frontend: ITourEventReorder
): TTourEventReorderBackend => ({
	day: frontend.day,
	position: frontend.position
});

/** Option reorder payload — event option row IDs in the new order. */
export const mapOptionReorderToBackend = (
	frontend: IEventOptionReorder
): TEventOptionReorderBackend => ({
	order: frontend.order
});

/**
 * Body for `addOption` — a WRITE event union member (no day/position:
 * an alternative inherits the slot's placement).
 */
export const mapEventOptionCreateToBackend = (
	frontend: ITourEventCreate
): TEventOptionBodyBackend => {
	const typ = frontend.backendTyp ?? eventTypeMapper.to(frontend.eventType);
	if (!typ || typ === ENUM_EVENT_BACKEND.OPTIONS) {
		throw new Error(`Invalid option typ: ${String(typ)}`);
	}

	return {
		name: frontend.name,
		description: frontend.description,
		typ,
		details: mapEventDetailsWriteOrEmpty(typ, frontend.details),
		...(frontend.packageId !== undefined && {
			package_id: frontend.packageId
		})
	} as TEventOptionBodyBackend;
};

export const mapMoveToMultiToBackend = (
	frontend: Pick<IMoveEventToMulti, "optionPosition">
): NonNullable<TMoveToMultiBodyBackend> => ({
	option_position: frontend.optionPosition
});

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

/**
 * Body for `createEvent` — a SingleEvent WRITE union member (with day/position),
 * or a MultiEvent for an empty choice slot.
 */
export const mapEventCreateToBackend = (
	frontend: ITourEventCreate
): TTourEventCreateBackend => {
	const typ = frontend.backendTyp ?? eventTypeMapper.to(frontend.eventType);
	if (!typ) {
		throw new Error(`Cannot resolve backend typ for ${frontend.eventType}`);
	}

	if (typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return {
			day: frontend.day,
			position: frontend.position,
			typ: ENUM_EVENT_BACKEND.OPTIONS,
			details: [],
			...(frontend.isOptional !== undefined && {
				is_optional: frontend.isOptional
			})
		};
	}

	return {
		name: frontend.name,
		description: frontend.description,
		day: frontend.day,
		position: frontend.position,
		typ,
		details: mapEventDetailsWriteOrEmpty(typ, frontend.details),
		...(frontend.packageId !== undefined && {
			package_id: frontend.packageId
		}),
		...(frontend.isOptional !== undefined && {
			is_optional: frontend.isOptional
		})
	} as TTourEventCreateBackend;
};
