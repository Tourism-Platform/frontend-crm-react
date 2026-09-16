import { TranslationState } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE, TLibraryPath } from "@/shared/config";
import { ENUM_PATH, buildRoute } from "@/shared/config";
import { type IPaginationResponse } from "@/shared/types";

import {
	ENUM_EVENT,
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type ENUM_EVENT_TYPE,
	type TEventDetailsBackend,
	type TEventDetailsWriteBackend,
	type TEventPoolMemberNewBackend,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventUpdate,
	backendEventTypeMapper,
	mapEventDetailsReadToWrite,
	mapEventTypeToBackendTyps,
	mapEventUpdateToBackend
} from "@/entities/tour/itinerary";
import {
	mapAccommodationEventToForm,
	mapActivityEventToForm,
	mapFlyEventToForm,
	mapGuideEventToForm,
	mapInfoEventToForm,
	mapSupplementaryEventToForm,
	mapTransferEventToForm
} from "@/entities/tour/itinerary/converters/event";
import { getMainPoolMember } from "@/entities/tour/itinerary/converters/event/event-pool.helpers";

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

/**
 * Short summary for the library table (contract 6):
 * times live in `details.plan`, route data in the main pool member `spec`.
 */
const mapEventLibrarySummary = (
	event: TEventLibraryItemBackend["event"]
): string | null => {
	switch (event.typ) {
		case ENUM_EVENT_BACKEND.FLIGHT: {
			const spec = getMainPoolMember(event.details)?.spec;
			const rawLeg = spec && "legs" in spec ? spec.legs?.[0] : undefined;
			const leg = rawLeg && "airline_code" in rawLeg ? rawLeg : undefined;

			const flightCode = leg
				? [
						leg.airline_code,
						leg.flight_number != null
							? String(leg.flight_number)
							: null
					]
						.filter(Boolean)
						.join("")
				: null;
			const from = leg?.departure_airport_code ?? null;
			const to = leg?.arrival_airport_code ?? null;
			const route = from && to ? `${from} → ${to}` : (from ?? to ?? null);
			const time = joinRange(
				formatTimeHhMm(event.details.plan?.departure_time?.time),
				formatTimeHhMm(event.details.plan?.arrival_time?.time)
			);

			const parts = [flightCode || null, route, time].filter(Boolean);
			return parts.length ? parts.join(" · ") : null;
		}
		case ENUM_EVENT_BACKEND.TRAIN: {
			return joinRange(
				formatTimeHhMm(event.details.plan?.departure_time?.time),
				formatTimeHhMm(event.details.plan?.arrival_time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.BUS: {
			const leg = event.details.plan?.legs?.[0];
			if (!leg) return null;
			return joinRange(
				formatTimeHhMm(leg.departure?.time?.time),
				formatTimeHhMm(leg.arrival?.time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.TRANSFER: {
			return joinRange(
				formatTimeHhMm(event.details.plan?.departure?.time?.time),
				formatTimeHhMm(event.details.plan?.arrival?.time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.ACTIVITY: {
			return joinRange(
				formatTimeHhMm(event.details.plan?.start_time?.time),
				formatTimeHhMm(event.details.plan?.end_time?.time)
			);
		}
		case ENUM_EVENT_BACKEND.HOUSING: {
			return joinRange(
				formatTimeHhMm(event.details.plan?.check_in?.time),
				formatTimeHhMm(event.details.plan?.check_out?.time)
			);
		}
		default:
			return null;
	}
};

/** Supplier id for the list row — from the main pool member `supply` (contract 6). */
const resolveEventSupplierId = (
	event: TEventLibraryItemBackend["event"]
): string | null => {
	const supply = getMainPoolMember(event.details)?.supply;
	if (!supply) return null;
	return supply.source === "product"
		? supply.supplier.id
		: (supply.supplier_id ?? null);
};

export const mapEventLibraryItemToFrontend = (
	data: TEventLibraryItemBackend
): IEventLibraryItem => {
	const eventType =
		backendEventTypeMapper.to(data.event?.typ as ENUM_EVENT_BACKEND_TYPE) ??
		ENUM_EVENT.TRANSPORTATION;

	return {
		id: data.id,
		name: data.event?.name ?? "",
		eventType,
		supplierId: data.event ? resolveEventSupplierId(data.event) : null,
		summary: data.event ? mapEventLibrarySummary(data.event) : null,
		primaryImagePath: data.primary_image_path ?? null
	};
};

const getFilterBackendTyps = (filters?: IEventLibraryFilters) =>
	(filters?.status ?? []).flatMap(mapEventTypeToBackendTyps);

export const mapEventLibraryListToFrontend = (
	response: TEventLibraryListBackendResponse,
	filters?: IEventLibraryFilters
): IPaginationResponse<IEventLibraryItem> => {
	let data = response.data.map(mapEventLibraryItemToFrontend);
	const backendTyps = getFilterBackendTyps(filters);

	if (filters?.status.length && backendTyps.length !== 1) {
		const allowed = new Set(filters.status);
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
	const backendTyps = getFilterBackendTyps(filters);
	const typ = backendTyps.length === 1 ? backendTyps[0] : undefined;

	return {
		...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
		...(filters.limit && { limit: filters.limit }),
		...(!!filters.search?.trim().length && { q: filters.search.trim() }),
		...(typ && { typ })
	};
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

export const buildEventLibraryEditRoute = (
	eventType: ENUM_EVENT_TYPE,
	params: { libraryId: string }
) => {
	const path = mapEventTypeToLibraryEditPath(eventType);
	if (!path) return undefined;
	return buildRoute(path, params);
};

/**
 * A library READ event is an option-row payload; the tour-event form
 * converters expect a single-event slot payload — add the slot-owned fields
 * (day/position/is_optional/images) as neutral defaults.
 */
const adaptLibraryEventToTourResponse = (
	backend: TEventLibraryItemBackend
): TTourEventBackendResponce => ({
	id: backend.id,
	tour_option_id: null,
	translation: TranslationState.Source,
	event: {
		...backend.event,
		day: 1,
		position: 0,
		is_optional: false,
		images: []
	}
});

/** Library response → form (same as mapEventToFrontend in itinerary). */
export const mapEventLibraryToForm = (
	backend: TEventLibraryItemBackend,
	selectedSupplyId?: string
): TTourEvent => {
	const adapted = adaptLibraryEventToTourResponse(backend);

	switch (backend.event?.typ) {
		case ENUM_EVENT_BACKEND.FLIGHT:
			return mapFlyEventToForm(adapted, selectedSupplyId);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return mapTransferEventToForm(adapted, selectedSupplyId);
		case ENUM_EVENT_BACKEND.HOUSING:
			return mapAccommodationEventToForm(adapted, selectedSupplyId);
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return mapActivityEventToForm(adapted, selectedSupplyId);
		case ENUM_EVENT_BACKEND.REF:
			return mapInfoEventToForm(adapted, selectedSupplyId);
		case ENUM_EVENT_BACKEND.SUPPLEMENTARY:
			return mapSupplementaryEventToForm(adapted, selectedSupplyId);
		case ENUM_EVENT_BACKEND.GUIDE:
			return mapGuideEventToForm(adapted, selectedSupplyId);
		default:
			throw new Error("Unsupported library event typ");
	}
};

/**
 * Form → library create/update body. Delegates to itinerary form converters,
 * then always echoes the full pool (library has no omit-pool PATCH).
 */
export const mapEventLibraryUpdateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TUpdateEventLibraryBackend => {
	const body = mapEventUpdateToBackend(
		type,
		frontend,
		language,
		currentDetails
	);
	if (!currentDetails) {
		return body;
	}

	const echoed = mapEventDetailsReadToWrite(
		body.typ as ENUM_EVENT_BACKEND_TYPE,
		currentDetails
	);
	const details = body.details as { pool?: unknown } | undefined;
	if (details?.pool) {
		return body;
	}

	return {
		...body,
		details: { ...body.details, pool: echoed.pool }
	} as TUpdateEventLibraryBackend;
};

export const mapEventLibraryCreateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate,
	language?: ENUM_LANGUAGES_TYPE
): TCreateEventLibraryBackend =>
	mapEventUpdateToBackend(type, frontend, language);

const asLibraryUpdateBody = (
	template: TEventLibraryItemBackend,
	pool: TEventDetailsWriteBackend["pool"]
): TUpdateEventLibraryBackend => {
	const typ = template.event.typ as ENUM_EVENT_BACKEND_TYPE;
	const echoed = mapEventDetailsReadToWrite(typ, template.event.details);

	return {
		typ,
		name: template.event.name,
		description: template.event.description,
		details: { ...echoed, pool }
	} as TUpdateEventLibraryBackend;
};

export const mapLibraryPoolAddToBackend = (
	template: TEventLibraryItemBackend,
	member: TEventPoolMemberNewBackend
): TUpdateEventLibraryBackend => {
	const typ = template.event.typ as ENUM_EVENT_BACKEND_TYPE;
	const echoed = mapEventDetailsReadToWrite(typ, template.event.details);
	const pool = [
		...(echoed.pool ?? []),
		{ supply: member.supply }
	] as TEventDetailsWriteBackend["pool"];

	return asLibraryUpdateBody(template, pool);
};

export const mapLibraryPoolRemoveToBackend = (
	template: TEventLibraryItemBackend,
	supplyId: string
): TUpdateEventLibraryBackend => {
	const typ = template.event.typ as ENUM_EVENT_BACKEND_TYPE;
	const echoed = mapEventDetailsReadToWrite(typ, template.event.details);
	const pool = (echoed.pool ?? []).filter(
		(member) => member.id !== supplyId
	) as TEventDetailsWriteBackend["pool"];

	return asLibraryUpdateBody(template, pool);
};
