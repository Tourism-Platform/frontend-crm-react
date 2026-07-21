import { type EventTypes, LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";
import { type IPaginationResponse } from "@/shared/types";

import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventUpdate,
	type TTransportationEditSchema,
	eventTypeMapper,
	mapBackendTypToEventType
} from "@/entities/tour/itinerary";
import {
	mapTransferEventToForm,
	mapTransferFormToUpdate
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

export const mapEventLibraryItemToFrontend = (
	data: TEventLibraryItemBackend
): IEventLibraryItem => {
	const typ = data.event?.typ;
	const eventType =
		mapBackendTypToEventType(typ) ?? ENUM_EVENT.TRANSPORTATION;

	return {
		id: data.id,
		name: data.event?.name ?? "",
		eventType,
		supplierId: data.event?.supplier_id ?? null,
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
			? (eventTypeMapper.to(filters.types[0]) as EventTypes | undefined)
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
		default:
			return null;
	}
};

/** Library response → form (как mapEventToFrontend в itinerary). */
export const mapEventLibraryToForm = (
	backend: TEventLibraryItemBackend
): TTourEvent => {
	switch (backend.event?.typ) {
		case "4":
			return mapTransferEventToForm({
				id: backend.id,
				tour_option_id: null,
				origin_event_id: null,
				event: {
					typ: "4",
					day: 1,
					position: 0,
					name: backend.event.name,
					description: backend.event.description,
					supplier_id: backend.event.supplier_id,
					package_id: backend.event.package_id,
					is_optional: backend.event.is_optional,
					details: backend.event.details
				},
				image_paths: backend.image_paths ?? [],
				primary_image_path: backend.primary_image_path ?? null
			} as TTourEventBackendResponce);
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
