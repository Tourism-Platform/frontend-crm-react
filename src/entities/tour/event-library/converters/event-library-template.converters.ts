import { mapEventPoolToSummary } from "@/entities/tour/itinerary";

import type { IEventLibraryTemplate, TEventLibraryItemBackend } from "../types";

import { mapLibraryTemplateToCreateEvent } from "./map-library-template-to-create-event";

export const mapEventLibraryTemplateToFrontend = (
	template: TEventLibraryItemBackend
): IEventLibraryTemplate => ({
	pool: mapEventPoolToSummary(template.event.details),
	createEvent: mapLibraryTemplateToCreateEvent(template)
});
