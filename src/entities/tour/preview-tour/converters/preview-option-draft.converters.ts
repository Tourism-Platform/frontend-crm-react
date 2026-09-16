import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type TGetPricingBreakdownBackendResponse,
	type TMultiEventDetailBackend,
	type TMultiEventReadBackend,
	type TOperatorEventBackend,
	type TStandaloneBillableBackend,
	type TTourSummaryEventBackend,
	getMainPoolMember
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
import { cityFromLocation } from "./preview-option-location.utils";

const isStandaloneBillable = (
	item: TTourSummaryEventBackend
): item is TStandaloneBillableBackend => "event_id" in item && "event" in item;

type TOperatorCitySource = Exclude<
	TOperatorEventBackend | TMultiEventDetailBackend,
	{ typ: typeof ENUM_EVENT_BACKEND.OPTIONS }
>;

const extractCityFromOperatorDetails = (
	event: TOperatorCitySource
): string | undefined => {
	const details = event.details;
	if (!details || Array.isArray(details)) {
		return undefined;
	}
	const spec = getMainPoolMember(details)?.spec;
	switch (event.typ) {
		case ENUM_EVENT_BACKEND.HOUSING:
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return cityFromLocation(
				spec && "location" in spec ? spec.location : undefined
			);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return (
				cityFromLocation(event.details.plan.departure?.location) ??
				cityFromLocation(event.details.plan.arrival?.location)
			);
		case ENUM_EVENT_BACKEND.BUS: {
			const leg = event.details.plan.legs[0];
			return (
				cityFromLocation(leg?.departure?.location) ??
				cityFromLocation(leg?.arrival?.location)
			);
		}
		case ENUM_EVENT_BACKEND.FLIGHT: {
			const rawLeg = spec && "legs" in spec ? spec.legs?.[0] : undefined;
			const leg =
				rawLeg && "departure_location" in rawLeg ? rawLeg : undefined;
			return (
				cityFromLocation(leg?.departure_location) ??
				cityFromLocation(leg?.arrival_location)
			);
		}
		case ENUM_EVENT_BACKEND.TRAIN: {
			const rawLeg = spec && "legs" in spec ? spec.legs?.[0] : undefined;
			const leg = rawLeg && "departure" in rawLeg ? rawLeg : undefined;
			return (
				cityFromLocation(leg?.departure?.location) ??
				cityFromLocation(leg?.arrival?.location)
			);
		}
		default:
			return undefined;
	}
};

const extractCityFromOperatorEvent = (
	event: TOperatorEventBackend
): string | undefined => {
	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		for (const detail of event.details ?? []) {
			const city = extractCityFromOperatorDetails(detail);
			if (city) return city;
		}
		return undefined;
	}

	return extractCityFromOperatorDetails(event);
};

const mapDetailToSubOption = (
	parentKey: string,
	index: number,
	detail: TMultiEventDetailBackend
): ISubOption => ({
	id: `${parentKey}-sub-${index}`,
	title: detail.name || "",
	description: detail.description || "",
	sheet: buildSheetFromOperatorEvent(detail)
});

const mapMultiplyOptionEvent = (
	event: TMultiEventReadBackend
): IOptionEvent => {
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

const mapSingleOperatorEvent = (event: TOperatorEventBackend): IOptionEvent => {
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
	events?: TTourSummaryEventBackend[] | null
): IOptionDay[] => {
	const byDay = new Map<number, TOperatorEventBackend[]>();

	for (const item of events ?? []) {
		if (!isStandaloneBillable(item)) continue;

		const event = item?.event;
		if (!event) continue;

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
	backend: TGetPricingBreakdownBackendResponse,
	title = ""
): IOptionDetail => ({
	id: backend?.id ?? "",
	title,
	price: mapDraftOptionPriceToFrontend(backend?.estimated_revenue_per_person),
	days: groupOperatorEventsIntoDays(backend?.events)
});
