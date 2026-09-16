import {
	ENUM_EVENT,
	type ENUM_EVENT_BACKEND_TYPE,
	type ITourEventCreate,
	backendEventTypeMapper,
	mapEventDetailsReadToWrite
} from "@/entities/tour/itinerary";

import type { TEventLibraryItemBackend } from "../types";

/**
 * Library template (backend READ) → tour event create payload (contract 6).
 *
 * The library READ event is never sent back raw: its details cross the
 * READ → WRITE boundary (`mapEventDetailsReadToWrite`), which
 * - inline supply:  moves the read member `spec` into `pool[].supply.inline.spec`;
 * - product supply: keeps only `{ source, product_id, scope }`
 *   (supplier/override/resolved spec are dropped). `is_main` is never echoed.
 *
 * Library entry id, image_paths and primary_image_path are NOT carried over;
 * package_id is ignored by the backend on create; day/position come from the
 * drop target.
 */
export const mapLibraryTemplateToCreateEvent = (
	template: TEventLibraryItemBackend,
	day: number,
	position: number
): ITourEventCreate => {
	const event = template.event;
	const backendTyp = event.typ as ENUM_EVENT_BACKEND_TYPE;

	return {
		name: event.name ?? "",
		description: event.description ?? "",
		day,
		position,
		eventType:
			backendEventTypeMapper.to(backendTyp) ?? ENUM_EVENT.TRANSPORTATION,
		backendTyp,
		details: mapEventDetailsReadToWrite(backendTyp, event.details)
	};
};
