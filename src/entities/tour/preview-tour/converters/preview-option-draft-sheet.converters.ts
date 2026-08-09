import { format } from "date-fns";

import type {
	AmenitiesTypes,
	AnyEventWithCostOutput,
	EmptyDetails,
	MultiEventReadOutput,
	TimeSchema
} from "@/shared/api";

import type { TPubEventMediaFields } from "../types/preview-option-media.types";
import type {
	IOptionEventSheet,
	IOptionFlightSegment,
	TOptionEventSheetExtra
} from "../types/preview-option-sheet.types";

import { formatLocation } from "./preview-option-location.utils";
import { toPublicImageUrl } from "./preview-option-media.utils";
import {
	formatJourneyPoint,
	formatPubTime
} from "./preview-option-sheet.converters";

type TOperatorEvent = AnyEventWithCostOutput["event"];
type TOperatorDetail = NonNullable<MultiEventReadOutput["details"]>[number];
type TOperatorSheetSource = TOperatorEvent | TOperatorDetail;

const resolveOperatorEventImagePaths = (
	event: TOperatorSheetSource
): string[] => {
	const media = event as TOperatorSheetSource & TPubEventMediaFields;
	const paths =
		media.image_paths ??
		(media.primary_image_path ? [media.primary_image_path] : []);

	return paths.map(toPublicImageUrl).filter(Boolean).slice(0, 5);
};

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
				| {
						departure?: {
							date?: string | null;
							time?: TimeSchema | null;
							location?: unknown;
						} | null;
						arrival?: {
							date?: string | null;
							time?: TimeSchema | null;
							location?: unknown;
						} | null;
				  }
				| null
				| undefined;
			return {
				kind: "transfer",
				pickup: formatJourneyPoint(
					transferDetails?.departure ?? undefined
				),
				dropoff: formatJourneyPoint(
					transferDetails?.arrival ?? undefined
				)
			};
		}
		case "housing": {
			const housingDetails = details as
				| {
						amenities?: AmenitiesTypes[] | null;
						duration?: number | null;
						check_in?: TimeSchema | null;
						check_out?: TimeSchema | null;
				  }
				| null
				| undefined;
			return {
				kind: "accommodation",
				amenities: housingDetails?.amenities ?? [],
				nights: `${housingDetails?.duration ?? 0} night${housingDetails?.duration === 1 ? "" : "s"}`,
				checkIn: formatPubTime(housingDetails?.check_in ?? undefined),
				checkOut: formatPubTime(housingDetails?.check_out ?? undefined)
			};
		}
		case "activity": {
			const activityDetails = details as
				| {
						location?: unknown;
						start_time?: TimeSchema | null;
						end_time?: TimeSchema | null;
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
			const infoDetails = details as EmptyDetails | undefined;
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
	images: resolveOperatorEventImagePaths(event),
	description: "description" in event ? event.description || "" : "",
	extra: mapSheetExtraFromOperator(event)
});
