import { LanguageCode } from "@/shared/api";
import type {
	Schedule,
	TrainDetailsWrite,
	TrainInlineSupplyNew
} from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_EVENT_BACKEND } from "../../../types";
import type {
	TEventDetailsBackend,
	TFlightEditSchema,
	TTourEventBackendResponce,
	TTourEventUpdateBackend,
	TTrainRouteSegment,
	TTrainSingleEventBackend
} from "../../../types";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_TRAIN,
	ENUM_HOUSING_SOURCE
} from "../../../types";
import { mapInlinePoolWrite } from "../details-read-to-write.converters";
import { getPoolMember } from "../event-pool.helpers";
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
import { isInheritedTrainDetails } from "../train-details.helpers";

import { mapTrainHopToSegment, mapTrainSegmentToHop } from "./journey.helpers";
import { mapEventMetaToForm } from "./shared.helpers";

export const createEmptyTrainSegment = (): TTrainRouteSegment => ({
	[ENUM_FORM_TRAIN.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
	[ENUM_FORM_TRAIN.CARRIER]: "",
	[ENUM_FORM_TRAIN.TRAIN_NUMBER]: "",
	[ENUM_FORM_TRAIN.DEPARTURE_STATION]: null,
	[ENUM_FORM_TRAIN.ARRIVAL_STATION]: null,
	[ENUM_FORM_TRAIN.DEPARTURE_TIME]: null,
	[ENUM_FORM_TRAIN.ARRIVAL_TIME]: null,
	[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: "",
	[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: ""
});

const assertTrainEvent = (
	data: TTourEventBackendResponce
): TTrainSingleEventBackend => {
	if (!("typ" in data.event) || data.event.typ !== ENUM_EVENT_BACKEND.TRAIN) {
		throw new Error(
			'mapTrainEventToForm: expected train event with typ "train"'
		);
	}
	return data.event;
};

/**
 * Contract 3.1: rail legs carry no hours — the event-level `plan`
 * (Schedule) states them, landing on the first segment's departure and the
 * last segment's arrival.
 */
const applyPlanToTrainRoute = (
	route: TTrainRouteSegment[],
	plan: Schedule | null | undefined
): TTrainRouteSegment[] => {
	if (!route.length || !plan) {
		return route;
	}

	const first = route[0];
	first[ENUM_FORM_TRAIN.DEPARTURE_TIME] = plan.departure_time?.time ?? null;
	first[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE] = String(
		plan.departure_time?.timezone ?? getDeviceUtcOffset()
	);

	const last = route[route.length - 1];
	last[ENUM_FORM_TRAIN.ARRIVAL_TIME] = plan.arrival_time?.time ?? null;
	last[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE] = String(
		plan.arrival_time?.timezone ?? getDeviceUtcOffset()
	);

	return route;
};

const mapSchedulePlanToBackend = (
	route: TTrainRouteSegment[] | undefined
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

export const mapTrainEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TFlightEditSchema => {
	const event = assertTrainEvent(data);
	const details = event.details ?? null;
	const member = getPoolMember(details, selectedSupplyId);
	const spec = member?.spec;
	const supplyId = member?.id;
	const legs = spec?.legs ?? [];
	const route: TTrainRouteSegment[] =
		legs.length > 0
			? applyPlanToTrainRoute(
					legs.map(mapTrainHopToSegment),
					details?.plan
				)
			: [createEmptyTrainSegment()];

	if (isInheritedTrainDetails(details, supplyId)) {
		return {
			...mapEventMetaToForm(event),
			...mapInheritedProductLinkToForm(member),
			general: {
				description: event.description ?? "",
				transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
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
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
			route
		},
		pricing: applyEventPackageIdToPricing(
			mapFlightPricingFromBackend(details, supplyId),
			event.package_id
		)
	};
};

export const mapTrainFormToUpdate = (
	frontend: Partial<TFlightEditSchema>,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];
	const g = frontend.general;
	const trainRoute = g?.route?.filter(
		(segment): segment is TTrainRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN
	);
	const plan = mapSchedulePlanToBackend(trainRoute);

	if (productId) {
		// Product-linked train: the update keeps the link exactly where
		// it is — `supply` is omitted, only the tour's own plan is stated.
		return {
			typ: ENUM_EVENT_BACKEND.TRAIN,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(g?.description !== undefined && {
				description: g.description
			}),
			details: { plan }
		};
	}

	const legs = trainRoute?.length
		? trainRoute.map((segment) => mapTrainSegmentToHop(segment, lang))
		: undefined;
	const { charge } = mapFlightPricingToBackend(frontend?.pricing);

	// A priced route is stated `whole`; an unpriced one keeps its legs on a
	// `per_fare` spec, which carries no event-level charge. With neither
	// legs nor charge, `supply` is omitted so the backend keeps the current
	// one (a full replace would wipe it).
	const spec: TrainInlineSupplyNew["spec"] | undefined = charge
		? { pricing: "whole", ...(legs && { legs }), charge }
		: legs
			? { pricing: "per_fare", legs }
			: undefined;

	const details: TrainDetailsWrite = {
		plan,
		...(spec && {
			pool: mapInlinePoolWrite(
				ENUM_EVENT_BACKEND.TRAIN,
				currentDetails,
				frontend[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID],
				{ source: "inline", spec }
			) as TrainDetailsWrite["pool"]
		})
	};

	return {
		typ: ENUM_EVENT_BACKEND.TRAIN,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined && { description: g.description }),
		details
	};
};
