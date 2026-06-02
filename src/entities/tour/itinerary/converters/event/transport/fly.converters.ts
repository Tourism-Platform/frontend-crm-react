import type {
	FlightEventSchemaOutput,
	FlightHopDetailsSchemaInput,
	FlightHopDetailsSchemaOutput
} from "@/shared/api";

import type {
	TFlightEditSchema,
	TFlyRouteSegment,
	TTourEventBackendResponce,
	TTourEventUpdateBackend
} from "../../../types";
import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_FLIGHT } from "../../../types";
import {
	mapFlightPricingFromBackend,
	mapFlightPricingToBackend
} from "../flight-pricing.converters";

import { mapEventMetaToForm } from "./shared.helpers";

const createEmptyFlySegment = (): TFlyRouteSegment => ({
	[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
	[ENUM_FORM_FLIGHT.AIRLINE_CODE]: "",
	[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: "",
	[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: "",
	[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: "",
	[ENUM_FORM_FLIGHT.DEPARTURE_DATE]: null,
	[ENUM_FORM_FLIGHT.ARRIVAL_DATE]: null,
	[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: null,
	[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: null,
	[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: "",
	[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: "",
	[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: "",
	[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: "",
	[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: "",
	[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: ""
});

const mapHopToFlySegment = (
	hop: FlightHopDetailsSchemaOutput
): TFlyRouteSegment => ({
	[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
	[ENUM_FORM_FLIGHT.AIRLINE_CODE]: hop.airline_code ?? "",
	[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: String(hop.flight_number ?? ""),
	[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: hop.departure_airport_code ?? "",
	[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: hop.arrival_airport_code ?? "",
	[ENUM_FORM_FLIGHT.DEPARTURE_DATE]: hop.departure_date ?? null,
	[ENUM_FORM_FLIGHT.ARRIVAL_DATE]: hop.arrival_date ?? null,
	[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: hop.departure_time?.time ?? null,
	[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: hop.arrival_time?.time ?? null,
	[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: String(
		hop.departure_time?.timezone ?? ""
	),
	[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: String(
		hop.arrival_time?.timezone ?? ""
	),
	[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: hop.departure_terminal ?? "",
	[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: hop.departure_gate ?? "",
	[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: "",
	[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: ""
});

const mapFlySegmentToHop = (
	segment: TFlyRouteSegment
): FlightHopDetailsSchemaInput => {
	const hop: FlightHopDetailsSchemaInput = {
		airline_code: segment.airline_code,
		flight_number: Number(segment.flight_number) || null,
		departure_airport_code: segment.departure_airport_code,
		arrival_airport_code: segment.arrival_airport_code,
		departure_date: segment.departure_date,
		arrival_date: segment.arrival_date
	};

	if (segment.departure_time && segment.departure_timezone) {
		hop.departure_time = {
			time: segment.departure_time,
			timezone: Number(segment.departure_timezone)
		};
	}

	if (segment.arrival_time && segment.arrival_timezone) {
		hop.arrival_time = {
			time: segment.arrival_time,
			timezone: Number(segment.arrival_timezone)
		};
	}

	if (segment.departure_terminal) {
		hop.departure_terminal = segment.departure_terminal;
	}

	if (segment.departure_gate) {
		hop.departure_gate = segment.departure_gate;
	}

	return hop;
};

const assertFlyEvent = (
	data: TTourEventBackendResponce
): FlightEventSchemaOutput => {
	if (!("typ" in data.event) || data.event.typ !== "1") {
		throw new Error(
			'mapFlyEventToForm: expected flight event with typ "1"'
		);
	}
	return data.event;
};

export const mapFlyEventToForm = (
	data: TTourEventBackendResponce
): TFlightEditSchema => {
	const event = assertFlyEvent(data);
	const hops = event.details?.hop ?? [];
	const route: TFlyRouteSegment[] =
		hops.length > 0
			? hops.map(mapHopToFlySegment)
			: [createEmptyFlySegment()];

	return {
		...mapEventMetaToForm(event),
		general: {
			description: event.description ?? "",
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
			route
		},
		pricing: mapFlightPricingFromBackend(event.details)
	};
};

export const mapFlyFormToUpdate = (
	frontend: Partial<TFlightEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend.general;
	const flyRoute = g?.route?.filter(
		(segment): segment is TFlyRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.FLY
	);
	const pricingDetails = mapFlightPricingToBackend(frontend?.pricing);

	return {
		typ: "1",
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		...(g?.description !== undefined && { description: g.description }),
		details: {
			...(flyRoute?.length && {
				hop: flyRoute.map(mapFlySegmentToHop)
			}),
			...pricingDetails.details
		}
	};
};
