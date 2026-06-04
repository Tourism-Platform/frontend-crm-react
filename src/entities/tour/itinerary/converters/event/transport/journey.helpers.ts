import {
	type BusHopSchemaInput,
	type BusHopSchemaOutput,
	type BusJourneyPointSchemaInput,
	LanguageCode,
	type TrainHopSchemaInput,
	type TrainHopSchemaOutput
} from "@/shared/api";
import {
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

import type { TBusRouteSegment, TTrainRouteSegment } from "../../../types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_BUS,
	ENUM_FORM_TRAIN
} from "../../../types";

const buildJourneyPointInput = (
	date: string | null,
	time: string | null,
	timezone: string,
	location: TGeoFormValue | null | undefined,
	lang: LanguageCode
): BusJourneyPointSchemaInput => ({
	...(date ? { date } : {}),
	...(time && timezone ? { time: { time, timezone: Number(timezone) } } : {}),
	...(location !== undefined && {
		location: location ? mapGeoFormToBackendLocation(location, lang) : null
	})
});

export const mapTrainHopToSegment = (
	hop: TrainHopSchemaOutput
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
		[ENUM_FORM_TRAIN.DEPARTURE_DATE]: departure?.date ?? null,
		[ENUM_FORM_TRAIN.ARRIVAL_DATE]: arrival?.date ?? null,
		[ENUM_FORM_TRAIN.DEPARTURE_TIME]: departure?.time?.time ?? null,
		[ENUM_FORM_TRAIN.ARRIVAL_TIME]: arrival?.time?.time ?? null,
		[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: String(
			departure?.time?.timezone ?? ""
		),
		[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: String(
			arrival?.time?.timezone ?? ""
		)
	};
};

export const mapBusHopToSegment = (
	hop: BusHopSchemaOutput
): TBusRouteSegment => {
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
		[ENUM_FORM_BUS.DEPARTURE_DATE]: departure?.date ?? null,
		[ENUM_FORM_BUS.ARRIVAL_DATE]: arrival?.date ?? null,
		[ENUM_FORM_BUS.DEPARTURE_TIME]: departure?.time?.time ?? null,
		[ENUM_FORM_BUS.ARRIVAL_TIME]: arrival?.time?.time ?? null,
		[ENUM_FORM_BUS.DEPARTURE_TIMEZONE]: String(
			departure?.time?.timezone ?? ""
		),
		[ENUM_FORM_BUS.ARRIVAL_TIMEZONE]: String(arrival?.time?.timezone ?? "")
	};
};

export const mapTrainSegmentToHop = (
	segment: TTrainRouteSegment,
	lang: LanguageCode = LanguageCode.En
): TrainHopSchemaInput => ({
	departure: buildJourneyPointInput(
		segment.departure_date ?? null,
		segment.departure_time ?? null,
		segment.departure_timezone ?? "",
		segment.departure_station,
		lang
	),
	arrival: buildJourneyPointInput(
		segment.arrival_date ?? null,
		segment.arrival_time ?? null,
		segment.arrival_timezone ?? "",
		segment.arrival_station,
		lang
	)
});

export const mapBusSegmentToHop = (
	segment: TBusRouteSegment,
	lang: LanguageCode = LanguageCode.En
): BusHopSchemaInput => ({
	departure: buildJourneyPointInput(
		segment.departure_date ?? null,
		segment.departure_time ?? null,
		segment.departure_timezone ?? "",
		segment.departure_point,
		lang
	),
	arrival: buildJourneyPointInput(
		segment.arrival_date ?? null,
		segment.arrival_time ?? null,
		segment.arrival_timezone ?? "",
		segment.arrival_point,
		lang
	)
});
