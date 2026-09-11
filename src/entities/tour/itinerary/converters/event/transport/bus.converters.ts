import { LanguageCode } from "@/shared/api";
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
import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_BUS } from "../../../types";
import { isInheritedBusDetails } from "../bus-details.helpers";
import {
	mapFlightPricingFromBackend,
	mapFlightPricingToBackend
} from "../flight-pricing.converters";
import { mapInheritedProductLinkToForm } from "../inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "../package-id.helpers";

import { mapBusHopToSegment, mapBusSegmentToHop } from "./journey.helpers";
import { mapEventMetaToForm } from "./shared.helpers";

const createEmptyBusSegment = (): TBusRouteSegment => ({
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
	data: TTourEventBackendResponce
): TFlightEditSchema => {
	const event = assertBusEvent(data);
	const details = event.details ?? null;

	if (isInheritedBusDetails(details)) {
		const hops = details.hop ?? [];
		const route: TBusRouteSegment[] =
			hops.length > 0
				? hops.map(mapBusHopToSegment)
				: [createEmptyBusSegment()];

		return {
			...mapEventMetaToForm(event),
			...mapInheritedProductLinkToForm(details),
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

	const hops = details?.hop ?? [];
	const route: TBusRouteSegment[] =
		hops.length > 0
			? hops.map(mapBusHopToSegment)
			: [createEmptyBusSegment()];

	return {
		...mapEventMetaToForm(event),
		general: {
			description: event.description ?? "",
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
			route
		},
		pricing: applyEventPackageIdToPricing(
			mapFlightPricingFromBackend(details),
			event.package_id
		)
	};
};

export const mapBusFormToUpdate = (
	frontend: Partial<TFlightEditSchema>,
	language?: ENUM_LANGUAGES_TYPE
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const g = frontend.general;
	const busRoute = g?.route?.filter(
		(segment): segment is TBusRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.BUS
	);
	const pricingDetails = mapFlightPricingToBackend(frontend?.pricing);

	return {
		typ: ENUM_EVENT_BACKEND.BUS,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		...(g?.description !== undefined && { description: g.description }),
		details: {
			...(busRoute?.length && {
				hop: busRoute.map((segment) =>
					mapBusSegmentToHop(segment, lang)
				)
			}),
			...pricingDetails.details
		}
	};
};
