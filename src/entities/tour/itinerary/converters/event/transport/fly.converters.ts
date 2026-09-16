import type {
	FlightDetailsWrite,
	FlightInlineSupplyNew,
	FlightLegInput,
	FlightLegOutput,
	Schedule
} from "@/shared/api";
import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_EVENT_BACKEND } from "../../../types";
import type {
	TEventDetailsBackend,
	TFlightEditSchema,
	TFlightSingleEventBackend,
	TFlyRouteSegment,
	TTourEventBackendResponce,
	TTourEventUpdateBackend
} from "../../../types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_FLIGHT,
	ENUM_HOUSING_SOURCE
} from "../../../types";
import { mapInlinePoolWrite } from "../details-read-to-write.converters";
import { getPoolMember } from "../event-pool.helpers";
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
import { toTimezoneOffset } from "../timezone.helpers";

import { mapEventMetaToForm } from "./shared.helpers";

export const createEmptyFlySegment = (): TFlyRouteSegment => {
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

/**
 * Contract 3.1: a flight leg (`spec.legs[]`) carries no hours — the
 * event-level `plan` (Schedule) states them, landing on the first
 * departure and the last arrival.
 */
const mapFlightLegToFlySegment = (
	leg: FlightLegOutput,
	plan: Schedule | null | undefined,
	index: number,
	total: number
): TFlyRouteSegment => {
	const isFirst = index === 0;
	const isLast = index === total - 1;
	const departureTime = isFirst ? plan?.departure_time : null;
	const arrivalTime = isLast ? plan?.arrival_time : null;

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

const mapFlySegmentToHop = (segment: TFlyRouteSegment): FlightLegInput => ({
	airline_code: segment.airline_code,
	flight_number: Number(segment.flight_number) || null,
	departure_airport_code: segment.departure_airport_code,
	arrival_airport_code: segment.arrival_airport_code,
	...(segment.departure_terminal && {
		departure_terminal: segment.departure_terminal
	}),
	...(segment.departure_gate && { departure_gate: segment.departure_gate })
});

/** Event-level hours (3.1 `plan`): first departure, last arrival. */
const mapSchedulePlanToBackend = (
	route: TFlyRouteSegment[] | undefined
): Schedule => {
	const first = route?.[0];
	const last = route?.length ? route[route.length - 1] : undefined;

	return {
		...(first?.departure_time && {
			departure_time: {
				time: first.departure_time,
				timezone: toTimezoneOffset(first.departure_timezone)
			}
		}),
		...(last?.arrival_time && {
			arrival_time: {
				time: last.arrival_time,
				timezone: toTimezoneOffset(last.arrival_timezone)
			}
		})
	};
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
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TFlightEditSchema => {
	const event = assertFlyEvent(data);
	const details = event.details ?? null;
	const plan = details?.plan;
	const member = getPoolMember(details, selectedSupplyId);
	const supplyId = member?.id;
	const legs = member?.spec?.legs ?? [];
	const route: TFlyRouteSegment[] =
		legs.length > 0
			? legs.map((leg, index) =>
					mapFlightLegToFlySegment(leg, plan, index, legs.length)
				)
			: [createEmptyFlySegment()];

	if (isInheritedFlightDetails(details, supplyId)) {
		return {
			...mapEventMetaToForm(event),
			...mapInheritedProductLinkToForm(member),
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

	return {
		...mapEventMetaToForm(event),
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: supplyId,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.CUSTOM,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: false,
		general: {
			description: event.description ?? "",
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
			route
		},
		pricing: applyEventPackageIdToPricing(
			mapFlightPricingFromBackend(details, supplyId),
			event.package_id
		)
	};
};

export const mapFlyFormToUpdate = (
	frontend: Partial<TFlightEditSchema>,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];
	const g = frontend.general;
	const flyRoute = g?.route?.filter(
		(segment): segment is TFlyRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.FLY
	);
	const plan = mapSchedulePlanToBackend(flyRoute);

	if (productId) {
		// Product-linked flight: the update keeps the link exactly where
		// it is — `supply` is omitted, only the tour's own plan is stated.
		return {
			typ: ENUM_EVENT_BACKEND.FLIGHT,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(g?.description !== undefined && {
				description: g.description
			}),
			details: { plan }
		};
	}

	const legs = flyRoute?.length
		? flyRoute.map(mapFlySegmentToHop)
		: undefined;
	const { charge } = mapFlightPricingToBackend(frontend?.pricing);

	// A priced route is stated `whole`; an unpriced one keeps its legs on a
	// `per_fare` spec, which carries no event-level charge. With neither
	// legs nor charge, `supply` is omitted so the backend keeps the current
	// one (a full replace would wipe it).
	const spec: FlightInlineSupplyNew["spec"] | undefined = charge
		? { pricing: "whole", ...(legs && { legs }), charge }
		: legs
			? { pricing: "per_fare", legs }
			: undefined;

	const details: FlightDetailsWrite = {
		plan,
		...(spec && {
			pool: mapInlinePoolWrite(
				ENUM_EVENT_BACKEND.FLIGHT,
				currentDetails,
				frontend[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID],
				{ source: "inline", spec }
			) as FlightDetailsWrite["pool"]
		})
	};

	return {
		typ: ENUM_EVENT_BACKEND.FLIGHT,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined && { description: g.description }),
		details
	};
};
