import type { LocationOutSchema } from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "@/entities/tour/itinerary";

import type { TOptionDetailBackend } from "../types";

type TPubEvent = TOptionDetailBackend["events"][number];

type TPubMultiDetail = Extract<
	TPubEvent,
	{ typ: typeof ENUM_EVENT_BACKEND.OPTIONS }
>["details"][number];

type TPubDetailsEvent =
	| Exclude<TPubEvent, { typ: typeof ENUM_EVENT_BACKEND.OPTIONS }>
	| TPubMultiDetail;

export const isLocationOut = (
	location: unknown
): location is LocationOutSchema =>
	typeof location === "object" &&
	location !== null &&
	"city" in location &&
	typeof (location as LocationOutSchema).city === "string";

export const formatLocation = (location: unknown): string => {
	if (!isLocationOut(location)) return "";
	const city = location.city ?? "";
	const address = location.address ?? "";
	return address ? `${city}, ${address}` : city;
};

export const cityFromLocation = (location: unknown): string | undefined =>
	isLocationOut(location) ? (location.city ?? undefined) : undefined;

const cityFromHops = <T>(
	hops: T[] | undefined,
	cityOf: (hop: T) => string | undefined
): string | undefined => {
	for (const hop of hops ?? []) {
		const city = cityOf(hop);
		if (city) return city;
	}
	return undefined;
};

const extractCityFromPubDetails = (
	event: TPubDetailsEvent
): string | undefined => {
	switch (event.typ) {
		case ENUM_EVENT_BACKEND.HOUSING:
			return undefined;
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return cityFromLocation(event.details?.spec?.location);
		case ENUM_EVENT_BACKEND.TRANSFER:
			return (
				cityFromLocation(event.details?.departure.location) ??
				cityFromLocation(event.details?.arrival.location)
			);
		case ENUM_EVENT_BACKEND.FLIGHT:
			return cityFromHops(
				event.details?.spec?.hop,
				(hop) =>
					cityFromLocation(hop.departure_location) ??
					cityFromLocation(hop.arrival_location)
			);
		case ENUM_EVENT_BACKEND.TRAIN:
			return cityFromHops(
				event.details?.spec?.hop,
				(hop) =>
					cityFromLocation(hop.departure.location) ??
					cityFromLocation(hop.arrival.location)
			);
		case ENUM_EVENT_BACKEND.BUS:
			return cityFromHops(
				event.details?.hop,
				(hop) =>
					cityFromLocation(hop.departure.location) ??
					cityFromLocation(hop.arrival.location)
			);
		default:
			return undefined;
	}
};

export const extractCityFromPubEvent = (
	event: TPubEvent
): string | undefined => {
	if (event.typ === ENUM_EVENT_BACKEND.OPTIONS) {
		for (const detail of event.details ?? []) {
			const city = extractCityFromPubDetails(detail);
			if (city) return city;
		}
		return undefined;
	}

	return extractCityFromPubDetails(event);
};
