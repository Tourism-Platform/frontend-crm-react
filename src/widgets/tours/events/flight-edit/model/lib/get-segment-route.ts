import type { TGeoFormValue } from "@/shared/types/geo-form.types";
import { formatGeoFormDisplayLabel } from "@/shared/utils";

import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_BUS,
	ENUM_FORM_FLIGHT,
	ENUM_FORM_TRAIN,
	type TRouteSegment
} from "@/entities/tour";

const geoLabel = (value: TGeoFormValue | null | undefined) =>
	value ? formatGeoFormDisplayLabel(value) : "";

/** «From → To» of a route segment; empty until either end is set. */
export const getSegmentRoute = (segment: TRouteSegment | undefined) => {
	if (!segment) return "";

	let from: string;
	let to: string;
	switch (segment.transport_type) {
		case ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN:
			from = geoLabel(segment[ENUM_FORM_TRAIN.DEPARTURE_STATION]);
			to = geoLabel(segment[ENUM_FORM_TRAIN.ARRIVAL_STATION]);
			break;
		case ENUM_FLIGHT_TRANSPORT_TYPE.BUS:
			from = geoLabel(segment[ENUM_FORM_BUS.DEPARTURE_POINT]);
			to = geoLabel(segment[ENUM_FORM_BUS.ARRIVAL_POINT]);
			break;
		default:
			from = segment[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE] ?? "";
			to = segment[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE] ?? "";
	}

	return from || to ? `${from || "—"} → ${to || "—"}` : "";
};
