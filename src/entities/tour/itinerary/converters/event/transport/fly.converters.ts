import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_EVENT_BACKEND } from "../../../types";
import type {
	TFlightEditSchema,
	TFlightHopInputBackend,
	TFlightHopOutputBackend,
	TFlightLegOutputBackend,
	TFlightSingleEventBackend,
	TFlyRouteSegment,
	TInheritedFlightDetailsBackend,
	TTourEventBackendResponce,
	TTourEventUpdateBackend
} from "../../../types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_FLIGHT,
	ENUM_HOUSING_SOURCE
} from "../../../types";
import { isInheritedFlightDetails } from "../flight-details.helpers";
import {
	mapFlightPricingFromBackend,
	mapFlightPricingToBackend
} from "../flight-pricing.converters";
import { mapInheritedProductLinkToForm } from "../inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "../package-id.helpers";

import { mapEventMetaToForm } from "./shared.helpers";

const createEmptyFlySegment = (): TFlyRouteSegment => {
	const timezone = getDeviceUtcOffset();
	return {
		[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
		[ENUM_FORM_FLIGHT.AIRLINE_CODE]: "",
		[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: "",
		[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: "",
		[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: "",
		[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: null,
		[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: null,
		[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: timezone,
		[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: timezone,
		[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: "",
		[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: "",
		[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: "",
		[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: ""
	};
};

const mapHopToFlySegment = (
	hop: TFlightHopOutputBackend
): TFlyRouteSegment => ({
	[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
	[ENUM_FORM_FLIGHT.AIRLINE_CODE]: hop.airline_code ?? "",
	[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: String(hop.flight_number ?? ""),
	[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: hop.departure_airport_code ?? "",
	[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: hop.arrival_airport_code ?? "",
	[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: hop.departure_time?.time ?? null,
	[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: hop.arrival_time?.time ?? null,
	[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: String(
		hop.departure_time?.timezone ?? getDeviceUtcOffset()
	),
	[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: String(
		hop.arrival_time?.timezone ?? getDeviceUtcOffset()
	),
	[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: hop.departure_terminal ?? "",
	[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: hop.departure_gate ?? "",
	[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: "",
	[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: ""
});

const mapFlightLegToFlySegment = (
	leg: TFlightLegOutputBackend,
	inherited: TInheritedFlightDetailsBackend,
	index: number,
	total: number
): TFlyRouteSegment => {
	const isFirst = index === 0;
	const isLast = index === total - 1;
	const departureTime = isFirst ? inherited.departure_time : null;
	const arrivalTime = isLast ? inherited.arrival_time : null;

	return {
		[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
		[ENUM_FORM_FLIGHT.AIRLINE_CODE]: leg.airline_code ?? "",
		[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: String(leg.flight_number ?? ""),
		[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]:
			leg.departure_airport_code ?? "",
		[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: leg.arrival_airport_code ?? "",
		[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: departureTime?.time ?? null,
		[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: arrivalTime?.time ?? null,
		[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: String(
			departureTime?.timezone ?? getDeviceUtcOffset()
		),
		[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: String(
			arrivalTime?.timezone ?? getDeviceUtcOffset()
		),
		[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: leg.departure_terminal ?? "",
		[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: leg.departure_gate ?? "",
		[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: "",
		[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: ""
	};
};

const mapFlySegmentToHop = (
	segment: TFlyRouteSegment
): TFlightHopInputBackend => {
	const hop: TFlightHopOutputBackend = {
		airline_code: segment.airline_code,
		flight_number: Number(segment.flight_number) || null,
		departure_airport_code: segment.departure_airport_code,
		arrival_airport_code: segment.arrival_airport_code
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
): TFlightSingleEventBackend => {
	if (
		!("typ" in data.event) ||
		data.event.typ !== ENUM_EVENT_BACKEND.FLIGHT
	) {
		throw new Error(
			'mapFlyEventToForm: expected flight event with typ "flight"'
		);
	}
	return data.event;
};

export const mapFlyEventToForm = (
	data: TTourEventBackendResponce
): TFlightEditSchema => {
	const event = assertFlyEvent(data);
	const details = event.details ?? null;

	if (isInheritedFlightDetails(details)) {
		const legs = details.product?.hop ?? [];
		const route: TFlyRouteSegment[] =
			legs.length > 0
				? legs.map((leg, index) =>
						mapFlightLegToFlySegment(
							leg,
							details,
							index,
							legs.length
						)
					)
				: [createEmptyFlySegment()];

		return {
			...mapEventMetaToForm(event),
			...mapInheritedProductLinkToForm(details),
			general: {
				description: event.description ?? "",
				transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
				route
			},
			pricing: applyEventPackageIdToPricing(
				mapFlightPricingFromBackend(),
				event.package_id
			)
		};
	}

	const hops = details?.hop ?? [];
	const route: TFlyRouteSegment[] =
		hops.length > 0
			? hops.map(mapHopToFlySegment)
			: [createEmptyFlySegment()];

	return {
		...mapEventMetaToForm(event),
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.CUSTOM,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: false,
		general: {
			description: event.description ?? "",
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
			route
		},
		pricing: applyEventPackageIdToPricing(
			mapFlightPricingFromBackend(details),
			event.package_id
		)
	};
};

export const mapFlyFormToUpdate = (
	frontend: Partial<TFlightEditSchema>
): TTourEventUpdateBackend => {
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];

	if (productId) {
		return {
			typ: ENUM_EVENT_BACKEND.FLIGHT,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(frontend.general?.description !== undefined && {
				description: frontend.general.description
			}),
			details: {
				product_id: productId,
				variant_id: frontend[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID] ?? null
			}
		};
	}

	const g = frontend.general;
	const flyRoute = g?.route?.filter(
		(segment): segment is TFlyRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.FLY
	);
	const pricingDetails = mapFlightPricingToBackend(frontend?.pricing);

	return {
		typ: ENUM_EVENT_BACKEND.FLIGHT,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
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
