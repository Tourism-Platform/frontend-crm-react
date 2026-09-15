import {
	mapBreakdownLineToFrontend,
	mapPricingWarningsToFrontend
} from "@/entities/tour";

import type {
	IRevisionEventBreakdown,
	TRevisionEventBreakdownBackend,
	TRevisionPreviewBackend
} from "../types/revision-event-product.types";

export const mapRevisionEventBreakdownToFrontend = (
	backend: TRevisionEventBreakdownBackend
): IRevisionEventBreakdown => ({
	eventId: backend.event_id,
	lines: backend.lines.map(mapBreakdownLineToFrontend),
	warnings: mapPricingWarningsToFrontend(backend.warnings)
});

export const mapRevisionPreviewBreakdownToFrontend = (
	backend: TRevisionPreviewBackend
): IRevisionEventBreakdown[] =>
	backend.breakdown.map(mapRevisionEventBreakdownToFrontend);
