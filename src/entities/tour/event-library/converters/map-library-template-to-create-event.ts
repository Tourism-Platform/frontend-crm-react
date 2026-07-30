import type {
	ENUM_EVENT_BACKEND_TYPE,
	ITourEventCreate
} from "@/entities/tour/itinerary";
import {
	ENUM_EVENT,
	mapBackendTypToEventType
} from "@/entities/tour/itinerary";

import type { TEventLibraryItemBackend } from "../types";

/**
 * Library template (backend) → tour event create payload.
 * Does not use form/update mappers — Library ≠ Edit Form ≠ Create Request.
 */
export const mapLibraryTemplateToCreateEvent = (
	template: TEventLibraryItemBackend,
	day: number,
	position: number
): ITourEventCreate => {
	const event = template.event;
	const eventType =
		mapBackendTypToEventType(
			event?.typ as ENUM_EVENT_BACKEND_TYPE | undefined
		) ?? ENUM_EVENT.TRANSPORTATION;

	const description =
		event && "description" in event && event.description != null
			? String(event.description)
			: "";

	const details =
		event && "details" in event && event.details != null
			? (event.details as Record<string, unknown>)
			: {};

	const supplierId =
		event && "supplier_id" in event ? (event.supplier_id ?? null) : null;
	const packageId =
		event && "package_id" in event ? (event.package_id ?? null) : null;

	return {
		name: event?.name ?? "",
		description,
		day,
		position,
		eventType,
		details,
		...(supplierId != null && { supplierId }),
		...(packageId != null && { packageId })
	};
};
