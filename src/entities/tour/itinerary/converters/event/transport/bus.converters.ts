import type {
	BusEventSchemaOutput,
	BusEventUpdate,
	BusHopSchemaInput
} from "@/shared/api";

import type {
	TBusRouteSegment,
	TFlightEditSchema,
	TTourEventBackendResponce,
	TTourEventUpdateBackend
} from "../../../types";
import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_BUS } from "../../../types";

import { mapBusHopToSegment, mapBusSegmentToHop } from "./journey.helpers";
import {
	buildPartialFlightEditForm,
	mapEventMetaToForm
} from "./shared.helpers";

const createEmptyBusSegment = (): TBusRouteSegment => ({
	[ENUM_FORM_BUS.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
	[ENUM_FORM_BUS.BUS_COMPANY]: "",
	[ENUM_FORM_BUS.BUS_NUMBER]: "",
	[ENUM_FORM_BUS.DEPARTURE_POINT]: "",
	[ENUM_FORM_BUS.ARRIVAL_POINT]: "",
	[ENUM_FORM_BUS.DEPARTURE_DATE]: null,
	[ENUM_FORM_BUS.ARRIVAL_DATE]: null,
	[ENUM_FORM_BUS.DEPARTURE_TIME]: null,
	[ENUM_FORM_BUS.ARRIVAL_TIME]: null,
	[ENUM_FORM_BUS.DEPARTURE_TIMEZONE]: "",
	[ENUM_FORM_BUS.ARRIVAL_TIMEZONE]: ""
});

const assertBusEvent = (
	data: TTourEventBackendResponce
): BusEventSchemaOutput => {
	if (!("typ" in data.event) || data.event.typ !== "3") {
		throw new Error('mapBusEventToForm: expected bus event with typ "3"');
	}
	return data.event;
};

export const mapBusEventToForm = (
	data: TTourEventBackendResponce
): TFlightEditSchema => {
	const event = assertBusEvent(data);
	const hops = event.details?.hop ?? [];
	const route: TBusRouteSegment[] =
		hops.length > 0
			? hops.map(mapBusHopToSegment)
			: [createEmptyBusSegment()];

	return buildPartialFlightEditForm({
		...mapEventMetaToForm(event),
		general: {
			description: event.description ?? "",
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
			route
		}
	});
};

export const mapBusFormToUpdate = (
	frontend: Partial<TFlightEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend.general;
	const busRoute = g?.route.filter(
		(segment): segment is TBusRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.BUS
	);

	const hop: BusHopSchemaInput[] | undefined =
		busRoute?.map(mapBusSegmentToHop);

	const update: BusEventUpdate = {
		typ: "3",
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		...(g?.description !== undefined && { description: g.description }),
		...(hop?.length && {
			details: { hop }
		})
	};

	return update;
};
