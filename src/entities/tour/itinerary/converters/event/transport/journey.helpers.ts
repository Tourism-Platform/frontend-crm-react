import { LanguageCode } from "@/shared/api";
import type {
	BusLegInput,
	BusLegOutput,
	BusPointInput,
	TrainLegInput,
	TrainLegOutput,
	TrainStopInput
} from "@/shared/api";
import {
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

import type { TBusRouteSegment, TTrainRouteSegment } from "../../../types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_BUS,
	ENUM_FORM_TRAIN
} from "../../../types";

const buildBusPointInput = (
	time: string | null,
	timezone: string,
	location: TGeoFormValue | null | undefined,
	lang: LanguageCode
): BusPointInput => ({
	...(time && timezone ? { time: { time, timezone: Number(timezone) } } : {}),
	...(location !== undefined && {
		location: mapGeoFormToBackendLocation(location, lang)
	})
});

const buildTrainStopInput = (
	location: TGeoFormValue | null | undefined,
	lang: LanguageCode
): TrainStopInput => ({
	...(location !== undefined && {
		location: mapGeoFormToBackendLocation(location, lang)
	})
});

/**
 * Contract 3.1: a rail leg carries only its stations (`spec.legs[]`) — the
 * hours are event-level (`details.plan`), applied to the first/last segment
 * by the event converter.
 */
export const mapTrainHopToSegment = (
	hop: TrainLegOutput
): TTrainRouteSegment => {
	const departure = hop.departure;
	const arrival = hop.arrival;

	return {
		[ENUM_FORM_TRAIN.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
		[ENUM_FORM_TRAIN.CARRIER]: "",
		[ENUM_FORM_TRAIN.TRAIN_NUMBER]: "",
		[ENUM_FORM_TRAIN.DEPARTURE_STATION]: mapBackendLocationToGeoForm(
			departure?.location
		),
		[ENUM_FORM_TRAIN.ARRIVAL_STATION]: mapBackendLocationToGeoForm(
			arrival?.location
		),
		[ENUM_FORM_TRAIN.DEPARTURE_TIME]: null,
		[ENUM_FORM_TRAIN.ARRIVAL_TIME]: null,
		[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: String(getDeviceUtcOffset()),
		[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: String(getDeviceUtcOffset())
	};
};

export const mapBusHopToSegment = (hop: BusLegOutput): TBusRouteSegment => {
	const departure = hop.departure;
	const arrival = hop.arrival;

	return {
		[ENUM_FORM_BUS.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
		[ENUM_FORM_BUS.BUS_COMPANY]: "",
		[ENUM_FORM_BUS.BUS_NUMBER]: "",
		[ENUM_FORM_BUS.DEPARTURE_POINT]: mapBackendLocationToGeoForm(
			departure?.location
		),
		[ENUM_FORM_BUS.ARRIVAL_POINT]: mapBackendLocationToGeoForm(
			arrival?.location
		),
		[ENUM_FORM_BUS.DEPARTURE_TIME]: departure?.time?.time ?? null,
		[ENUM_FORM_BUS.ARRIVAL_TIME]: arrival?.time?.time ?? null,
		[ENUM_FORM_BUS.DEPARTURE_TIMEZONE]: String(
			departure?.time?.timezone ?? getDeviceUtcOffset()
		),
		[ENUM_FORM_BUS.ARRIVAL_TIMEZONE]: String(
			arrival?.time?.timezone ?? getDeviceUtcOffset()
		)
	};
};

export const mapTrainSegmentToHop = (
	segment: TTrainRouteSegment,
	lang: LanguageCode = LanguageCode.En
): TrainLegInput => ({
	departure: buildTrainStopInput(segment.departure_station, lang),
	arrival: buildTrainStopInput(segment.arrival_station, lang)
});

export const mapBusSegmentToHop = (
	segment: TBusRouteSegment,
	lang: LanguageCode = LanguageCode.En
): BusLegInput => ({
	departure: buildBusPointInput(
		segment.departure_time ?? null,
		segment.departure_timezone ?? "",
		segment.departure_point,
		lang
	),
	arrival: buildBusPointInput(
		segment.arrival_time ?? null,
		segment.arrival_timezone ?? "",
		segment.arrival_point,
		lang
	)
});
