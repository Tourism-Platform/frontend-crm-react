import type {
	AnyEventWithCostOutput,
	MultiEventReadOutput,
	TourSummaryResponse
} from "@/shared/api";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE
} from "@/entities/tour/itinerary";

import type {
	IOptionDay,
	IOptionDetail,
	IOptionEvent,
	ISubOption
} from "../types";
import {
	ENUM_PREVIEW_OPTION_EVENT,
	type TPreviewOptionEventType
} from "../types/preview-option-event.types";

import { mapDraftOptionPriceToFrontend } from "./compose-draft-options.converters";
import { buildSheetFromOperatorEvent } from "./preview-option-draft-sheet.converters";
import { mapPreviewBackendTypToEventType } from "./preview-option-event-type.converters";
import { formatLocation, isLocationOut } from "./preview-option-location.utils";

type TOperatorEvent = AnyEventWithCostOutput["event"];
type TOperatorDetail = NonNullable<MultiEventReadOutput["details"]>[number];

const extractCityFromOperatorEvent = (
	event: TOperatorEvent
): string | undefined => {
	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		const first = event.details?.[0];
		if (first && "details" in first && first.details) {
			const details = first.details as { location?: unknown };
			if (isLocationOut(details.location)) {
				return details.location.city ?? undefined;
			}
		}
		return undefined;
	}

	if (!("details" in event) || !event.details) {
		return undefined;
	}

	const details = event.details as Record<string, unknown>;

	if (isLocationOut(details.location)) {
		return details.location.city ?? undefined;
	}

	const hop = details.hop;
	if (Array.isArray(hop) && hop[0]) {
		const point = hop[0] as {
			departure?: { location?: unknown };
			arrival?: { location?: unknown };
			departure_location?: unknown;
			arrival_location?: unknown;
		};
		if (isLocationOut(point.departure?.location)) {
			return point.departure.location.city ?? undefined;
		}
		if (isLocationOut(point.arrival?.location)) {
			return point.arrival.location.city ?? undefined;
		}
		const depLoc = formatLocation(point.departure_location);
		if (depLoc) return depLoc.split(",")[0]?.trim();
	}

	const departure = details.departure as { location?: unknown } | undefined;
	if (isLocationOut(departure?.location)) {
		return departure!.location.city ?? undefined;
	}

	return undefined;
};

const mapDetailToSubOption = (
	parentKey: string,
	index: number,
	detail: TOperatorDetail
): ISubOption => ({
	id: `${parentKey}-sub-${index}`,
	title: detail.name || "",
	description: detail.description || "",
	sheet: buildSheetFromOperatorEvent(detail)
});

const mapMultiplyOptionEvent = (event: MultiEventReadOutput): IOptionEvent => {
	const eventKey = `d${event.day}-p${event.position}`;

	return {
		id: eventKey,
		type: ENUM_PREVIEW_OPTION_EVENT.MULTIPLY_OPTION,
		title: "",
		description: "",
		sheet: buildSheetFromOperatorEvent(event),
		sub_options: event.details?.map((detail, index) =>
			mapDetailToSubOption(eventKey, index, detail)
		)
	};
};

const mapSingleOperatorEvent = (event: TOperatorEvent): IOptionEvent => {
	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return mapMultiplyOptionEvent(event);
	}

	const typ = event.typ ?? ENUM_EVENT_BACKEND.REF;
	const type: TPreviewOptionEventType = mapPreviewBackendTypToEventType(
		typ as ENUM_EVENT_BACKEND_TYPE | undefined
	);
	const day = "day" in event ? event.day : 0;
	const position = "position" in event ? event.position : 0;
	const eventKey = `d${day}-p${position}`;

	return {
		id: eventKey,
		type,
		title: event.name || "",
		description: event.description || "",
		sheet: buildSheetFromOperatorEvent(event)
	};
};

const groupOperatorEventsIntoDays = (
	events: AnyEventWithCostOutput[]
): IOptionDay[] => {
	const byDay = new Map<number, TOperatorEvent[]>();

	for (const item of events) {
		const event = item.event;
		const day = "day" in event ? event.day : 0;
		const list = byDay.get(day) ?? [];
		list.push(event);
		byDay.set(day, list);
	}

	return [...byDay.entries()]
		.sort(([a], [b]) => a - b)
		.map(([dayNumber, dayEvents]) => {
			const sorted = [...dayEvents].sort((a, b) => {
				const posA = "position" in a ? a.position : 0;
				const posB = "position" in b ? b.position : 0;
				return posA - posB;
			});
			const location =
				sorted.map(extractCityFromOperatorEvent).find(Boolean) ?? "";

			return {
				id: `day-${dayNumber}`,
				day_number: dayNumber,
				location,
				events: sorted.map(mapSingleOperatorEvent)
			};
		});
};

export const mapDraftPreviewOptionToFrontend = (
	backend: TourSummaryResponse,
	title = ""
): IOptionDetail => ({
	id: backend.id,
	title,
	price: mapDraftOptionPriceToFrontend(backend.total),
	days: groupOperatorEventsIntoDays(backend.events)
});
