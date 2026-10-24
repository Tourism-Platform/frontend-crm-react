import { formatSheetDate } from "@/shared/utils";

import type {
	ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE,
	ENUM_VEHICLE_BODY_TYPE_BACKEND_TYPE
} from "@/entities/supplier/types/supplier-backend-enum.types";
import {
	type TEventImageBackend,
	accommodationAmenityConverter,
	housingRoomTypeConverter,
	mapEventImageToFrontend,
	vehicleBodyTypeConverter
} from "@/entities/tour/itinerary";
import type { TTimeSchemaBackend } from "@/entities/tour/itinerary/types/event-backend.types";

import type {
	IOptionEventSheet,
	IOptionEventSheetCar,
	IOptionEventSheetPoint,
	IOptionEventSheetRoom,
	IOptionFlightSegment,
	TActivityEventPubBackend,
	TBusEventPubBackend,
	TFlightEventPubBackend,
	THousingEventPubBackend,
	TInformationEventPubBackend,
	TMultiEventPubBackend,
	TOptionDetailBackend,
	TOptionEventSheetExtra,
	TTrainEventPubBackend,
	TTransferEventPubBackend
} from "../types";

import { formatLocation } from "./preview-option-location.utils";

type TPubEvent = TOptionDetailBackend["events"][number];
type TPubDetail = NonNullable<TMultiEventPubBackend["details"]>[number];

export const formatPubTime = (time?: TTimeSchemaBackend | null): string => {
	if (!time?.time) return "";
	const tz = time.timezone ?? 5;
	const sign = tz >= 0 ? "+" : "";
	return `${time.time.slice(0, 5)} UTC ${sign}${tz}`;
};

export const formatJourneyPoint = (point?: {
	date?: string | null;
	time?: TTimeSchemaBackend | null;
	location?: unknown;
}): IOptionEventSheetPoint => {
	const place = formatLocation(point?.location) || "—";
	const datePart = formatSheetDate(point?.date, "MMM d");
	const timePart = formatPubTime(point?.time);
	const dateTime = [datePart, timePart].filter(Boolean).join(" • ") || "—";

	return { place, dateTime };
};

type TSheetCarSource = {
	typ?: ENUM_VEHICLE_BODY_TYPE_BACKEND_TYPE | null;
	body_type?: ENUM_VEHICLE_BODY_TYPE_BACKEND_TYPE | null;
	pax?: number | null;
	description?: string | null;
};

type TSheetRoomSource = {
	name?: string | null;
	typ?: ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE | null;
	pax?: number | null;
	description?: string | null;
};

type TSheetRoomCategorySource = {
	rooms?: TSheetRoomSource[] | null;
};

const hasCars = (
	expenses: unknown
): expenses is { cars?: TSheetCarSource[] | null } =>
	Boolean(expenses && typeof expenses === "object" && "cars" in expenses);

const hasRooms = (
	expenses: unknown
): expenses is {
	rooms?: TSheetRoomSource[] | null;
	categories?: TSheetRoomCategorySource[] | null;
} =>
	Boolean(
		expenses &&
			typeof expenses === "object" &&
			("rooms" in expenses || "categories" in expenses)
	);

export const mapSheetCarsFromExpenses = (
	expenses: unknown
): IOptionEventSheetCar[] => {
	if (!hasCars(expenses) || !expenses.cars?.length) return [];

	return expenses.cars
		.filter((car) => car.typ || car.body_type || car.description || car.pax)
		.map((car) => ({
			typ:
				vehicleBodyTypeConverter.from(car.typ ?? car.body_type) ?? null,
			pax: car.pax ?? null,
			description: car.description ?? ""
		}));
};

export const mapSheetRoomsFromExpenses = (
	expenses: unknown
): IOptionEventSheetRoom[] => {
	if (!hasRooms(expenses)) return [];

	if (expenses.rooms?.length) {
		return expenses.rooms
			.filter(
				(room) => room.name || room.typ || room.description || room.pax
			)
			.map((room) => ({
				name: room.name ?? "",
				typ: housingRoomTypeConverter.from(room.typ) ?? null,
				pax: room.pax ?? null,
				description: room.description ?? ""
			}));
	}

	return (
		expenses.categories?.flatMap((category) =>
			(category.rooms ?? [])
				.filter(
					(room) =>
						room.typ || room.description || room.pax || room.name
				)
				.map((room) => ({
					name: room.name ?? "",
					typ: housingRoomTypeConverter.from(room.typ) ?? null,
					pax: room.pax ?? null,
					description: room.description ?? ""
				}))
		) ?? []
	);
};

const mapTransferSheet = (
	event: { typ: "transfer" } & TTransferEventPubBackend
): TOptionEventSheetExtra => ({
	kind: "transfer",
	pickup: formatJourneyPoint(event.details?.departure ?? undefined),
	dropoff: formatJourneyPoint(event.details?.arrival ?? undefined),
	cars: (event.details?.spec?.cars ?? []).map((car) => ({
		typ: vehicleBodyTypeConverter.from(car.typ) ?? null,
		pax: car.pax ?? null,
		description: ""
	}))
});

const mapHousingSheet = (
	event: { typ: "housing" } & THousingEventPubBackend
): TOptionEventSheetExtra => {
	const details = event.details;
	const spec = details?.spec;

	return {
		kind: "accommodation",
		amenities: accommodationAmenityConverter.fromMany(
			spec?.amenities ?? []
		),
		nights: `${details?.duration ?? 0} night${details?.duration === 1 ? "" : "s"}`,
		checkIn: formatPubTime(details?.check_in ?? undefined),
		checkOut: formatPubTime(details?.check_out ?? undefined),
		rooms: (spec?.rooms ?? []).map((room) => ({
			name: "",
			typ: housingRoomTypeConverter.from(room.typ) ?? null,
			pax: room.pax ?? null,
			description: ""
		}))
	};
};

const mapActivitySheet = (
	event: { typ: "activity" } & TActivityEventPubBackend
): TOptionEventSheetExtra => ({
	kind: "activity",
	location: formatLocation(event.details?.spec?.location ?? undefined) || "—",
	startTime: formatPubTime(event.details?.start_time ?? undefined),
	endTime: formatPubTime(event.details?.end_time ?? undefined)
});

const mapInfoSheet = (
	event: { typ: "ref" } & TInformationEventPubBackend
): TOptionEventSheetExtra => {
	const details = event.details;
	return {
		kind: "info",
		startTime: formatPubTime(details?.start_time ?? undefined),
		endTime: formatPubTime(details?.end_time ?? undefined)
	};
};

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
		return {
			airlineCode: hop.airline_code ?? "",
			flightNumber: String(hop.flight_number ?? ""),
			route: routeLabel,
			dateRange: [
				formatSheetDate(hop.departure_date),
				formatSheetDate(hop.arrival_date)
			]
				.filter(Boolean)
				.join(" - "),
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
			.map((d) => formatSheetDate(d))
			.join(" - "),
		departureCode: "—",
		departureTime: formatPubTime(dep?.time ?? undefined),
		departurePlace: formatLocation(dep?.location ?? undefined),
		arrivalCode: "—",
		arrivalTime: formatPubTime(arr?.time ?? undefined),
		arrivalPlace: formatLocation(arr?.location ?? undefined)
	};
};

const mapFlightSheet = (
	event: { typ: "flight" } & TFlightEventPubBackend,
	routeLabel: string
): TOptionEventSheetExtra => ({
	kind: "flight",
	segments:
		event.details?.spec?.hop?.map((hop) =>
			mapHopToSegment(hop, routeLabel)
		) ?? []
});

const mapTrainBusSheet = (
	event:
		| ({ typ: "train" } & TTrainEventPubBackend)
		| ({ typ: "bus" } & TBusEventPubBackend),
	routeLabel: string
): TOptionEventSheetExtra => {
	const hops =
		event.typ === "bus" ? event.details?.hop : event.details?.spec?.hop;

	return {
		kind: "flight",
		segments: hops?.map((hop) => mapHopToSegment(hop, routeLabel)) ?? []
	};
};

const mapSheetExtraFromPub = (
	event: TPubEvent | TPubDetail
): TOptionEventSheetExtra => {
	const typ = event.typ;

	switch (typ) {
		case "transfer":
			return mapTransferSheet(
				event as { typ: "transfer" } & TTransferEventPubBackend
			);
		case "housing":
			return mapHousingSheet(
				event as { typ: "housing" } & THousingEventPubBackend
			);
		case "activity":
			return mapActivitySheet(
				event as { typ: "activity" } & TActivityEventPubBackend
			);
		case "flight":
			return mapFlightSheet(
				event as { typ: "flight" } & TFlightEventPubBackend,
				event.name || ""
			);
		case "train":
			return mapTrainBusSheet(
				event as { typ: "train" } & TTrainEventPubBackend,
				event.name || ""
			);
		case "bus":
			return mapTrainBusSheet(
				event as { typ: "bus" } & TBusEventPubBackend,
				event.name || ""
			);
		case "ref":
			return mapInfoSheet(
				event as { typ: "ref" } & TInformationEventPubBackend
			);
		default:
			return { kind: "info", startTime: "", endTime: "" };
	}
};

export const buildSheetFromPubEvent = (
	event: TPubEvent | TPubDetail
): IOptionEventSheet => {
	return {
		images:
			event?.images?.map((image) =>
				mapEventImageToFrontend(image as TEventImageBackend)
			) ?? [],
		description: event.description || "",
		extra: mapSheetExtraFromPub(event)
	};
};

export const buildSheetFromMultiplyChild = (
	detail: TPubDetail
): IOptionEventSheet => ({
	images:
		detail?.images?.map((image) =>
			mapEventImageToFrontend(image as TEventImageBackend)
		) ?? [],
	description: detail.description || "",
	extra: mapSheetExtraFromPub(detail)
});
