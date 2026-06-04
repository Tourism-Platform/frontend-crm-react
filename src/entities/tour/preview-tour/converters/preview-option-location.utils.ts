import type { LocationOutSchema } from "@/shared/api";

import type { TOptionDetailBackend } from "../types";

type TPubEvent = TOptionDetailBackend["events"][number];

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

export const extractCityFromPubEvent = (
	event: TPubEvent
): string | undefined => {
	if (event.typ === "8") {
		const first = event.details[0];
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
		};
		if (isLocationOut(point.departure?.location)) {
			return point.departure.location.city ?? undefined;
		}
		if (isLocationOut(point.arrival?.location)) {
			return point.arrival.location.city ?? undefined;
		}
	}

	const departure = details.departure as { location?: unknown } | undefined;

	if (isLocationOut(departure?.location)) {
		return (departure!.location as LocationOutSchema).city ?? undefined;
	}

	return undefined;
};
