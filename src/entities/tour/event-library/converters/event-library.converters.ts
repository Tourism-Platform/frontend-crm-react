import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE, TLibraryPath } from "@/shared/config";
import { ENUM_PATH } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";
import { type IPaginationResponse } from "@/shared/types";

import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type ENUM_EVENT_TYPE,
	type TAccommodationEditSchema,
	type TActivityEditSchema,
	type TFlightEditSchema,
	type TGuideEditSchema,
	type TInfoEditSchema,
	type TSupplementEditSchema,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventUpdate,
	type TTransportationEditSchema,
	eventTypeMapper,
	mapBackendTypToEventType
} from "@/entities/tour/itinerary";
import {
	mapAccommodationEventToForm,
	mapAccommodationFormToUpdate,
	mapActivityEventToForm,
	mapActivityFormToUpdate,
	mapFlyEventToForm,
	mapGuideEventToForm,
	mapGuideFormToUpdate,
	mapInfoEventToForm,
	mapInfoFormToUpdate,
	mapSupplementaryEventToForm,
	mapSupplementaryFormToUpdate,
	mapTransferEventToForm,
	mapTransferFormToUpdate,
	mapTransportFormToUpdate
} from "@/entities/tour/itinerary/converters/event";

import type {
	IEventLibraryFilters,
	IEventLibraryItem,
	TCreateEventLibraryBackend,
	TEventLibraryItemBackend,
	TEventLibraryListBackendResponse,
	TListEventLibraryQuery,
	TUpdateEventLibraryBackend
} from "../types";

const formatTimeHhMm = (time?: string | null): string | null => {
	if (!time) return null;
	return time.slice(0, 5);
};

const joinRange = (from: string | null, to: string | null): string | null => {
	if (from && to) return `${from} – ${to}`;
	return from ?? to;
};

const mapEventLibrarySummary = (
	event: TEventLibraryItemBackend["event"]
): string | null => {
	switch (event.typ) {
		case ENUM_EVENT_BACKEND.FLIGHT: {
			const hop = event.details?.hop?.[0];
			if (!hop) return null;

			const flightCode = [
				hop.airline_code,
				hop.flight_number != null ? String(hop.flight_number) : null
			]
				.filter(Boolean)
				.join("");

			const from = hop.departure_airport_code ?? null;
			const to = hop.arrival_airport_code ?? null;
			const route = from && to ? `${from} → ${to}` : (from ?? to ?? null);

			const time = joinRange(
				formatTimeHhMm(hop.departure_time?.time),
				formatTimeHhMm(hop.arrival_time?.time)
			);

			const parts = [flightCode || null, route, time].filter(Boolean);
			return parts.length ? parts.join(" · ") : null;
		}
		case ENUM_EVENT_BACKEND.TRAIN:
		case ENUM_EVENT_BACKEND.BUS: {
			const hop = event.details?.hop?.[0];
			if (!hop) return null;
			return joinRange(
				formatTimeHhMm(hop.departure?.time?.time),
				formatTimeHhMm(hop.arrival?.time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.TRANSFER: {
			return joinRange(
				formatTimeHhMm(event.details?.departure?.time?.time),
				formatTimeHhMm(event.details?.arrival?.time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.ACTIVITY: {
			return joinRange(
				formatTimeHhMm(event.details?.start_time?.time),
				formatTimeHhMm(event.details?.end_time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.HOUSING: {
			return joinRange(
				formatTimeHhMm(event.details?.check_in?.time),
				formatTimeHhMm(event.details?.check_out?.time)
			);
		}
		default:
			return null;
	}
};

export const mapEventLibraryItemToFrontend = (
	data: TEventLibraryItemBackend
): IEventLibraryItem => {
	const typ = data.event?.typ as ENUM_EVENT_BACKEND_TYPE | undefined;
	const eventType =
		mapBackendTypToEventType(typ) ?? ENUM_EVENT.TRANSPORTATION;

	return {
		id: data.id,
		name: data.event?.name ?? "",
		eventType,
		supplierId: data.event?.supplier_id ?? null,
		summary: mapEventLibrarySummary(data.event),
		primaryImagePath: data.primary_image_path ?? null
	};
};

export const mapEventLibraryListToFrontend = (
	response: TEventLibraryListBackendResponse,
	filters?: IEventLibraryFilters
): IPaginationResponse<IEventLibraryItem> => {
	let data = response.data.map(mapEventLibraryItemToFrontend);

	if (filters && filters.types.length > 1) {
		const allowed = new Set(filters.types);
		data = data.filter((item) => allowed.has(item.eventType));
	}

	return {
		data,
		total: response.total_count
	};
};

export const mapEventLibraryFiltersToBackend = (
	filters: IEventLibraryFilters
): TListEventLibraryQuery => {
	const typ =
		filters.types.length === 1
			? (eventTypeMapper.to(filters.types[0]) as
					| ENUM_EVENT_BACKEND_TYPE
					| undefined)
			: undefined;

	return {
		...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
		...(filters.limit && { limit: filters.limit }),
		...(!!filters.search?.trim().length && { q: filters.search.trim() }),
		...(typ && { typ })
	};
};

export const mapEventTypeToLibraryPathSegment = (
	eventType: ENUM_EVENT_TYPE
): string | null => {
	switch (eventType) {
		case ENUM_EVENT.TRANSPORTATION:
			return "transfer";
		case ENUM_EVENT.SUPPLEMENT:
			return "supplement";
		case ENUM_EVENT.GUIDE:
			return "guide";
		case ENUM_EVENT.FLIGHT:
			return "flight";
		case ENUM_EVENT.ACCOMMODATION:
			return "accommodation";
		case ENUM_EVENT.ACTIVITY:
			return "activity";
		case ENUM_EVENT.INFO:
			return "info";
		default:
			return null;
	}
};

export const mapEventTypeToLibraryEditPath = (
	eventType: ENUM_EVENT_TYPE
): TLibraryPath | null => {
	switch (eventType) {
		case ENUM_EVENT.TRANSPORTATION:
			return ENUM_PATH.LIBRARY.EVENT_TRANSFER;
		case ENUM_EVENT.SUPPLEMENT:
			return ENUM_PATH.LIBRARY.EVENT_SUPPLEMENT;
		case ENUM_EVENT.GUIDE:
			return ENUM_PATH.LIBRARY.EVENT_GUIDE;
		case ENUM_EVENT.FLIGHT:
			return ENUM_PATH.LIBRARY.EVENT_FLIGHT;
		case ENUM_EVENT.ACCOMMODATION:
			return ENUM_PATH.LIBRARY.EVENT_ACCOMMODATION;
		case ENUM_EVENT.ACTIVITY:
			return ENUM_PATH.LIBRARY.EVENT_ACTIVITY;
		case ENUM_EVENT.INFO:
			return ENUM_PATH.LIBRARY.EVENT_INFO;
		default:
			return null;
	}
};

const adaptLibraryEventToTourResponse = (
	backend: TEventLibraryItemBackend
): TTourEventBackendResponce =>
	({
		id: backend.id,
		tour_option_id: null,
		origin_event_id: null,
		event: {
			typ: backend.event.typ,
			day: 1,
			position: 0,
			name: backend.event.name,
			description: backend.event.description,
			supplier_id: backend.event.supplier_id,
			package_id: backend.event.package_id,
			// is_optional: backend.event.is_optional,
			details: backend.event.details
		},
		image_paths: backend.image_paths ?? [],
		primary_image_path: backend.primary_image_path ?? null
	}) as TTourEventBackendResponce;

/** Library response → form (как mapEventToFrontend в itinerary). */
export const mapEventLibraryToForm = (
	backend: TEventLibraryItemBackend
): TTourEvent => {
	const adapted = adaptLibraryEventToTourResponse(backend);

	switch (backend.event?.typ) {
		case ENUM_EVENT_BACKEND.FLIGHT:
			return mapFlyEventToForm(adapted);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return mapTransferEventToForm(adapted);
		case ENUM_EVENT_BACKEND.HOUSING:
			return mapAccommodationEventToForm(adapted);
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return mapActivityEventToForm(adapted);
		case ENUM_EVENT_BACKEND.REF:
			return mapInfoEventToForm(adapted);
		case ENUM_EVENT_BACKEND.SUPPLEMENTARY:
			return mapSupplementaryEventToForm(adapted);
		case ENUM_EVENT_BACKEND.GUIDE:
			return mapGuideEventToForm(adapted);
		default:
			return backend as unknown as TTransportationEditSchema;
	}
};

/** Form → library create/update body (как mapEventUpdateToBackend в itinerary). */
export const mapEventLibraryUpdateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateEventLibraryBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;

	if (type === ENUM_EVENT.FLIGHT) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapTransportFormToUpdate(
			frontend as TFlightEditSchema,
			lang
		) as Record<string, unknown>;
		return body as TUpdateEventLibraryBackend;
	}

	if (type === ENUM_EVENT.TRANSPORTATION) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapTransferFormToUpdate(
			frontend as TTransportationEditSchema,
			lang
		) as Record<string, unknown>;
		return body as TUpdateEventLibraryBackend;
	}

	if (type === ENUM_EVENT.SUPPLEMENT) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapSupplementaryFormToUpdate(
			frontend as TSupplementEditSchema
		) as Record<string, unknown>;
		return body as TUpdateEventLibraryBackend;
	}

	if (type === ENUM_EVENT.GUIDE) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapGuideFormToUpdate(frontend as TGuideEditSchema) as Record<
			string,
			unknown
		>;
		return body as TUpdateEventLibraryBackend;
	}

	if (type === ENUM_EVENT.INFO) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapInfoFormToUpdate(frontend as TInfoEditSchema) as Record<
			string,
			unknown
		>;
		return body as TUpdateEventLibraryBackend;
	}

	if (type === ENUM_EVENT.ACCOMMODATION) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapAccommodationFormToUpdate(
			frontend as TAccommodationEditSchema,
			lang
		) as Record<string, unknown>;
		return body as TUpdateEventLibraryBackend;
	}

	if (type === ENUM_EVENT.ACTIVITY) {
		const {
			// day: _day,
			// position: _position,
			...body
		} = mapActivityFormToUpdate(
			frontend as TActivityEditSchema,
			lang
		) as Record<string, unknown>;
		return body as TUpdateEventLibraryBackend;
	}

	return {
		name: frontend.name
	} as TUpdateEventLibraryBackend;
};

export const mapEventLibraryCreateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate,
	language?: ENUM_LANGUAGES_TYPE
): TCreateEventLibraryBackend =>
	mapEventLibraryUpdateToBackend(
		type,
		frontend,
		language
	) as TCreateEventLibraryBackend;
