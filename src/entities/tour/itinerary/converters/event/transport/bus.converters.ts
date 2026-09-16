import { LanguageCode } from "@/shared/api";
import type { BusDetailsWrite, BusInlineSupplyNew } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";

import { ENUM_EVENT_BACKEND } from "../../../types";
import type {
	TBusRouteSegment,
	TBusSingleEventBackend,
	TFlightEditSchema,
	TTourEventBackendResponce,
	TTourEventUpdateBackend
} from "../../../types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_BUS,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_HOUSING_SOURCE
} from "../../../types";
import type { TEventDetailsBackend } from "../../../types";
import { mapInlinePoolWrite } from "../details-read-to-write.converters";
import { getPoolMember } from "../event-pool.helpers";
import { mapInheritedProductLinkToForm } from "../inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "../package-id.helpers";

import { isInheritedBusDetails } from "./bus-details.helpers";
import {
	mapFlightPricingFromBackend,
	mapFlightPricingToBackend
} from "./flight-pricing.converters";
import { mapBusHopToSegment, mapBusSegmentToHop } from "./journey.helpers";
import { mapEventMetaToForm } from "./shared.helpers";

export const createEmptyBusSegment = (): TBusRouteSegment => ({
	[ENUM_FORM_BUS.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
	[ENUM_FORM_BUS.BUS_COMPANY]: "",
	[ENUM_FORM_BUS.BUS_NUMBER]: "",
	[ENUM_FORM_BUS.DEPARTURE_POINT]: null,
	[ENUM_FORM_BUS.ARRIVAL_POINT]: null,
	// [ENUM_FORM_BUS.DEPARTURE_DATE]: null,
	// [ENUM_FORM_BUS.ARRIVAL_DATE]: null,
	[ENUM_FORM_BUS.DEPARTURE_TIME]: null,
	[ENUM_FORM_BUS.ARRIVAL_TIME]: null,
	[ENUM_FORM_BUS.DEPARTURE_TIMEZONE]: "",
	[ENUM_FORM_BUS.ARRIVAL_TIMEZONE]: ""
});

const assertBusEvent = (
	data: TTourEventBackendResponce
): TBusSingleEventBackend => {
	if (!("typ" in data.event) || data.event.typ !== ENUM_EVENT_BACKEND.BUS) {
		throw new Error('mapBusEventToForm: expected bus event with typ "bus"');
	}
	return data.event;
};

export const mapBusEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TFlightEditSchema => {
	const event = assertBusEvent(data);
	const details = event.details ?? null;
	const member = getPoolMember(details, selectedSupplyId);
	const supplyId = member?.id;

	// Contract 3.1: a coach run is the tour's own statement — the legs sit
	// on `plan` (with their hours), whoever supplies the fleet.
	const legs = details?.plan?.legs ?? [];
	const route: TBusRouteSegment[] =
		legs.length > 0
			? legs.map(mapBusHopToSegment)
			: [createEmptyBusSegment()];

	if (isInheritedBusDetails(details, supplyId)) {
		return {
			...mapEventMetaToForm(event),
			...mapInheritedProductLinkToForm(member),
			general: {
				description: event.description ?? "",
				transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
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
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
			route
		},
		pricing: applyEventPackageIdToPricing(
			mapFlightPricingFromBackend(details, supplyId),
			event.package_id
		)
	};
};

export const mapBusFormToUpdate = (
	frontend: Partial<TFlightEditSchema>,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const g = frontend.general;
	const busRoute = g?.route?.filter(
		(segment): segment is TBusRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.BUS
	);
	const { charge } = mapFlightPricingToBackend(frontend?.pricing);

	// The run itself is the plan. A charge is stated on a `whole` fleet
	// spec; without one `supply` is omitted so the backend keeps the
	// current one (a full replace would wipe it — and could replace a
	// product link with an empty inline supply).
	const spec: BusInlineSupplyNew["spec"] | undefined = charge
		? { pricing: "whole", charge }
		: undefined;

	const details: BusDetailsWrite = {
		...(busRoute?.length && {
			plan: {
				legs: busRoute.map((segment) =>
					mapBusSegmentToHop(segment, lang)
				)
			}
		}),
		...(spec && {
			pool: mapInlinePoolWrite(
				ENUM_EVENT_BACKEND.BUS,
				currentDetails,
				frontend[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID],
				{ source: "inline", spec }
			) as BusDetailsWrite["pool"]
		})
	};

	return {
		typ: ENUM_EVENT_BACKEND.BUS,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined && { description: g.description }),
		details
	};
};
