import { format } from "date-fns";

import type {
	ActivityEventPubReadOutput,
	BusEventPubReadOutput,
	FlightEventPubReadOutput,
	HousingEventPubReadOutput,
	MultipleOptionEventPubOutput,
	TimeSchema,
	TrainEventPubReadOutput,
	TransferEventPubReadOutput
} from "@/shared/api";

import type { TOptionDetailBackend } from "../types";
import type { TPubEventMediaFields } from "../types/preview-option-media.types";
import type {
	IOptionEventSheet,
	IOptionEventSheetPoint,
	IOptionFlightSegment,
	TOptionEventSheetExtra
} from "../types/preview-option-sheet.types";

import { formatLocation } from "./preview-option-location.utils";
import { toPublicImageUrl } from "./preview-option-media.utils";

type TPubEvent = TOptionDetailBackend["events"][number];
type TPubDetail = MultipleOptionEventPubOutput["details"][number];
type TPubEventWithMedia = (TPubEvent | TPubDetail) & TPubEventMediaFields;

export const resolveEventImagePaths = (
	event: TPubEvent | TPubDetail
): string[] => {
	const media = event as TPubEventWithMedia;
	const paths =
		media.image_paths ??
		(media.primary_image_path ? [media.primary_image_path] : []);

	return paths.map(toPublicImageUrl).filter(Boolean).slice(0, 5);
};

const formatPubTime = (time?: TimeSchema | null): string => {
	if (!time?.time) return "";
	const tz = time.timezone ?? 5;
	const sign = tz >= 0 ? "+" : "";
	return `${time.time.slice(0, 5)} UTC ${sign}${tz}`;
};

const formatJourneyPoint = (point?: {
	date?: string | null;
	time?: TimeSchema | null;
	location?: unknown;
}): IOptionEventSheetPoint => {
	const place = formatLocation(point?.location) || "—";
	const datePart = point?.date ? format(new Date(point.date), "MMM d") : "";
	const timePart = formatPubTime(point?.time);
	const dateTime = [datePart, timePart].filter(Boolean).join(" • ") || "—";

	return { place, dateTime };
};

const mapTransferSheet = (
	event: { typ: "4" } & TransferEventPubReadOutput
): TOptionEventSheetExtra => ({
	kind: "transfer",
	pickup: formatJourneyPoint(event.details.departure),
	dropoff: formatJourneyPoint(event.details.arrival)
});

const mapHousingSheet = (
	event: { typ: "5" } & HousingEventPubReadOutput
): TOptionEventSheetExtra => ({
	kind: "accommodation",
	amenities: event.details.amenities ?? [],
	nights: `${event.details.duration} night${event.details.duration === 1 ? "" : "s"}`,
	checkIn: formatPubTime(event.details.check_in),
	checkOut: formatPubTime(event.details.check_out)
});

const mapActivitySheet = (
	event: { typ: "6" } & ActivityEventPubReadOutput
): TOptionEventSheetExtra => ({
	kind: "activity",
	location: formatLocation(event.details.location) || "—",
	startTime: formatPubTime(event.details.start_time),
	endTime: formatPubTime(event.details.end_time)
});

const mapHopToSegment = (
	hop: {
		airline_code?: string;
		flight_number?: number;
		departure_airport_code?: string;
		arrival_airport_code?: string;
		departure_location?: unknown;
		arrival_location?: unknown;
		departure_date?: string;
		arrival_date?: string;
		departure_time?: TimeSchema;
		arrival_time?: TimeSchema;
		departure_terminal?: string;
		departure_gate?: string;
		departure?: {
			location?: unknown;
			date?: string | null;
			time?: TimeSchema;
		};
		arrival?: {
			location?: unknown;
			date?: string | null;
			time?: TimeSchema;
		};
	},
	routeLabel: string
): IOptionFlightSegment => {
	if ("departure_airport_code" in hop && hop.departure_airport_code) {
		const depDate = hop.departure_date
			? format(new Date(hop.departure_date), "d MMM, yyyy")
			: "";
		const arrDate = hop.arrival_date
			? format(new Date(hop.arrival_date), "d MMM, yyyy")
			: "";
		return {
			airlineCode: hop.airline_code ?? "",
			flightNumber: String(hop.flight_number ?? ""),
			route: routeLabel,
			dateRange: [depDate, arrDate].filter(Boolean).join(" - "),
			departureCode: hop.departure_airport_code,
			departureTime: formatPubTime(hop.departure_time),
			departurePlace: `${formatLocation(hop.departure_location)}${hop.departure_terminal ? `, Terminal ${hop.departure_terminal}` : ""}${hop.departure_gate ? ` • Gate ${hop.departure_gate}` : ""}`,
			arrivalCode: hop.arrival_airport_code ?? "",
			arrivalTime: formatPubTime(hop.arrival_time),
			arrivalPlace: formatLocation(hop.arrival_location)
		};
	}

	const dep = hop.departure;
	const arr = hop.arrival;
	return {
		airlineCode: "",
		flightNumber: "",
		route: routeLabel,
		dateRange: [dep?.date, arr?.date]
			.filter((d): d is string => Boolean(d))
			.map((d) => format(new Date(d), "d MMM, yyyy"))
			.join(" - "),
		departureCode: "—",
		departureTime: formatPubTime(dep?.time),
		departurePlace: formatLocation(dep?.location),
		arrivalCode: "—",
		arrivalTime: formatPubTime(arr?.time),
		arrivalPlace: formatLocation(arr?.location)
	};
};

const mapFlightSheet = (
	event: { typ: "1" } & FlightEventPubReadOutput,
	routeLabel: string
): TOptionEventSheetExtra => ({
	kind: "flight",
	segments: event.details.hop.map((hop) => mapHopToSegment(hop, routeLabel))
});

const mapTrainBusSheet = (
	event:
		| ({ typ: "2" } & TrainEventPubReadOutput)
		| ({ typ: "3" } & BusEventPubReadOutput),
	routeLabel: string
): TOptionEventSheetExtra => ({
	kind: "flight",
	segments: event.details.hop.map((hop) =>
		mapHopToSegment(hop as any, routeLabel)
	)
});

const mapSheetExtraFromPub = (
	event: TPubEvent | TPubDetail
): TOptionEventSheetExtra => {
	const typ = event.typ;

	switch (typ) {
		case "4":
			return mapTransferSheet(
				event as { typ: "4" } & TransferEventPubReadOutput
			);
		case "5":
			return mapHousingSheet(
				event as { typ: "5" } & HousingEventPubReadOutput
			);
		case "6":
			return mapActivitySheet(
				event as { typ: "6" } & ActivityEventPubReadOutput
			);
		case "1":
			return mapFlightSheet(
				event as { typ: "1" } & FlightEventPubReadOutput,
				event.name
			);
		case "2":
			return mapTrainBusSheet(
				event as { typ: "2" } & TrainEventPubReadOutput,
				event.name
			);
		case "3":
			return mapTrainBusSheet(
				event as { typ: "3" } & BusEventPubReadOutput,
				event.name
			);
		default:
			return { kind: "info" };
	}
};

export const buildSheetFromPubEvent = (
	event: TPubEvent | TPubDetail
): IOptionEventSheet => {
	return {
		images: resolveEventImagePaths(event),
		description: event.description,
		extra: mapSheetExtraFromPub(event)
	};
};

export const buildSheetFromMultiplyChild = (
	detail: TPubDetail
): IOptionEventSheet => ({
	images: resolveEventImagePaths(detail),
	description: detail.description,
	extra: mapSheetExtraFromPub(detail)
});
