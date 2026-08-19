import { format } from "date-fns";

import {
	type TEmptyDetailsBackend,
	type TEventImageBackend,
	type THousingDetailsBackend,
	type TMultiEventDetailBackend,
	type TOperatorEventBackend,
	type TTimeSchemaBackend,
	type TTransferDetailsBackend,
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
		airline_code?: string;
		flight_number?: number;
		departure_airport_code?: string;
		arrival_airport_code?: string;
		departure_location?: unknown;
		arrival_location?: unknown;
		departure_date?: string;
		arrival_date?: string;
		departure_time?: TTimeSchemaBackend;
		arrival_time?: TTimeSchemaBackend;
		departure_terminal?: string;
		departure_gate?: string;
		departure?: {
			location?: unknown;
			date?: string | null;
			time?: TTimeSchemaBackend;
		};
		arrival?: {
			location?: unknown;
			date?: string | null;
			time?: TTimeSchemaBackend;
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
	const typ = event.typ;
	const name = "name" in event ? (event.name ?? "") : "";
	const details = "details" in event ? event.details : undefined;

	switch (typ) {
		case "transfer": {
			const transferDetails = details as
				| TTransferDetailsBackend
				| null
				| undefined;
			return {
				kind: "transfer",
				pickup: formatJourneyPoint(
					transferDetails?.departure ?? undefined
				),
				dropoff: formatJourneyPoint(
					transferDetails?.arrival ?? undefined
				),
				cars: mapSheetCarsFromExpenses(transferDetails?.expenses)
			};
		}
		case "housing": {
			const housingDetails = details as
				| THousingDetailsBackend
				| null
				| undefined;
			return {
				kind: "accommodation",
				amenities: accommodationAmenityConverter.fromMany(
					housingDetails?.amenities ?? []
				),
				nights: `${housingDetails?.duration ?? 0} night${housingDetails?.duration === 1 ? "" : "s"}`,
				checkIn: formatPubTime(housingDetails?.check_in ?? undefined),
				checkOut: formatPubTime(housingDetails?.check_out ?? undefined),
				rooms: mapSheetRoomsFromExpenses(housingDetails?.expenses)
			};
		}
		case "activity": {
			const activityDetails = details as
				| {
						location?: unknown;
						start_time?: TTimeSchemaBackend | null;
						end_time?: TTimeSchemaBackend | null;
				  }
				| null
				| undefined;
			return {
				kind: "activity",
				location:
					formatLocation(activityDetails?.location ?? undefined) ||
					"—",
				startTime: formatPubTime(
					activityDetails?.start_time ?? undefined
				),
				endTime: formatPubTime(activityDetails?.end_time ?? undefined)
			};
		}
		case "flight":
		case "train":
		case "bus": {
			const hopDetails = details as
				| { hop?: unknown[] | null }
				| null
				| undefined;
			return {
				kind: "flight",
				segments:
					hopDetails?.hop?.map((hop) =>
						mapHopToSegment(
							hop as Parameters<typeof mapHopToSegment>[0],
							name
						)
					) ?? []
			};
		}
		case "ref": {
			const infoDetails = details as TEmptyDetailsBackend | undefined;
			return {
				kind: "info",
				startTime: formatPubTime(infoDetails?.start_time ?? undefined),
				endTime: formatPubTime(infoDetails?.end_time ?? undefined)
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
