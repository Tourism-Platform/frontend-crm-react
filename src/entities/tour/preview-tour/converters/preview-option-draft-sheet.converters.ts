import { format } from "date-fns";

import {
	type TEventImageBackend,
	type TMultiEventDetailBackend,
	type TOperatorEventBackend,
	type TTimeSchemaBackend,
	accommodationAmenityConverter,
	mapEventImageToFrontend
} from "@/entities/tour/itinerary";

import type {
	IOptionEventSheet,
	IOptionFlightSegment,
	TOptionEventSheetExtra
} from "../types";

import { formatLocation } from "./preview-option-location.utils";
import {
	formatJourneyPoint,
	formatPubTime,
	mapSheetCarsFromExpenses,
	mapSheetRoomsFromExpenses
} from "./preview-option-sheet.converters";

type TOperatorSheetSource = TOperatorEventBackend | TMultiEventDetailBackend;

const mapHopToSegment = (
	hop: {
		airline_code?: string | null;
		flight_number?: number | null;
		departure_airport_code?: string | null;
		arrival_airport_code?: string | null;
		departure_location?: unknown;
		arrival_location?: unknown;
		departure_date?: string | null;
		arrival_date?: string | null;
		departure_time?: TTimeSchemaBackend | null;
		arrival_time?: TTimeSchemaBackend | null;
		departure_terminal?: string | null;
		departure_gate?: string | null;
		departure?: {
			location?: unknown;
			date?: string | null;
			time?: TTimeSchemaBackend | null;
		} | null;
		arrival?: {
			location?: unknown;
			date?: string | null;
			time?: TTimeSchemaBackend | null;
		} | null;
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
			departureTime: formatPubTime(hop.departure_time ?? undefined),
			departurePlace: `${formatLocation(hop.departure_location ?? undefined)}${hop.departure_terminal ? `, Terminal ${hop.departure_terminal}` : ""}${hop.departure_gate ? ` • Gate ${hop.departure_gate}` : ""}`,
			arrivalCode: hop.arrival_airport_code ?? "",
			arrivalTime: formatPubTime(hop.arrival_time ?? undefined),
			arrivalPlace: formatLocation(hop.arrival_location ?? undefined)
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
		departureTime: formatPubTime(dep?.time ?? undefined),
		departurePlace: formatLocation(dep?.location ?? undefined),
		arrivalCode: "—",
		arrivalTime: formatPubTime(arr?.time ?? undefined),
		arrivalPlace: formatLocation(arr?.location ?? undefined)
	};
};

const mapSheetExtraFromOperator = (
	event: TOperatorSheetSource
): TOptionEventSheetExtra => {
	const name = "name" in event ? (event.name ?? "") : "";

	switch (event.typ) {
		case "transfer": {
			const details = event.details;
			return {
				kind: "transfer",
				pickup: formatJourneyPoint(
					details?.plan.departure ?? undefined
				),
				dropoff: formatJourneyPoint(details?.plan.arrival ?? undefined),
				cars: mapSheetCarsFromExpenses({ cars: details?.spec.cars })
			};
		}
		case "housing": {
			const details = event.details;
			return {
				kind: "accommodation",
				amenities: accommodationAmenityConverter.fromMany(
					details?.spec.amenities ?? []
				),
				nights: `${details?.plan.duration ?? 0} night${details?.plan.duration === 1 ? "" : "s"}`,
				checkIn: formatPubTime(details?.plan.check_in ?? undefined),
				checkOut: formatPubTime(details?.plan.check_out ?? undefined),
				rooms: mapSheetRoomsFromExpenses({
					categories: details?.spec.categories
				})
			};
		}
		case "activity": {
			const details = event.details;
			return {
				kind: "activity",
				location:
					formatLocation(details?.spec.location ?? undefined) || "—",
				startTime: formatPubTime(details?.plan.start_time ?? undefined),
				endTime: formatPubTime(details?.plan.end_time ?? undefined)
			};
		}
		case "flight": {
			const details = event.details;
			return {
				kind: "flight",
				segments:
					details?.spec.legs.map((leg) =>
						mapHopToSegment(
							{
								...leg,
								departure_time: details.plan.departure_time,
								arrival_time: details.plan.arrival_time
							},
							name
						)
					) ?? []
			};
		}
		case "train": {
			const details = event.details;
			return {
				kind: "flight",
				segments:
					details?.spec.legs.map((leg) =>
						mapHopToSegment(
							{
								departure: {
									location: leg.departure?.location,
									time: details.plan.departure_time
								},
								arrival: {
									location: leg.arrival?.location,
									time: details.plan.arrival_time
								}
							},
							name
						)
					) ?? []
			};
		}
		case "bus": {
			const details = event.details;
			return {
				kind: "flight",
				segments:
					details?.plan.legs.map((leg) =>
						mapHopToSegment(
							{ departure: leg.departure, arrival: leg.arrival },
							name
						)
					) ?? []
			};
		}
		case "ref": {
			const details = event.details;
			return {
				kind: "info",
				startTime: formatPubTime(details?.plan.start_time ?? undefined),
				endTime: formatPubTime(details?.plan.end_time ?? undefined)
			};
		}
		default:
			return { kind: "info", startTime: "", endTime: "" };
	}
};

export const buildSheetFromOperatorEvent = (
	event: TOperatorSheetSource
): IOptionEventSheet => ({
	images:
		"images" in event
			? (event.images ?? []).map((image) =>
					mapEventImageToFrontend(image as TEventImageBackend)
				)
			: [],
	description: "description" in event ? event.description || "" : "",
	extra: mapSheetExtraFromOperator(event)
});
