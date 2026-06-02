import type {
	TrainEventSchemaOutput,
	TrainEventUpdate,
	TrainHopSchemaInput
} from "@/shared/api";

import type {
	TFlightEditSchema,
	TTourEventBackendResponce,
	TTourEventUpdateBackend,
	TTrainRouteSegment
} from "../../../types";
import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_TRAIN } from "../../../types";

import { mapTrainHopToSegment, mapTrainSegmentToHop } from "./journey.helpers";
import {
	buildPartialFlightEditForm,
	mapEventMetaToForm
} from "./shared.helpers";

const createEmptyTrainSegment = (): TTrainRouteSegment => ({
	[ENUM_FORM_TRAIN.TRANSPORT_TYPE]: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
	[ENUM_FORM_TRAIN.CARRIER]: "",
	[ENUM_FORM_TRAIN.TRAIN_NUMBER]: "",
	[ENUM_FORM_TRAIN.DEPARTURE_STATION]: "",
	[ENUM_FORM_TRAIN.ARRIVAL_STATION]: "",
	[ENUM_FORM_TRAIN.DEPARTURE_DATE]: null,
	[ENUM_FORM_TRAIN.ARRIVAL_DATE]: null,
	[ENUM_FORM_TRAIN.DEPARTURE_TIME]: null,
	[ENUM_FORM_TRAIN.ARRIVAL_TIME]: null,
	[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: "",
	[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: ""
});

const assertTrainEvent = (
	data: TTourEventBackendResponce
): TrainEventSchemaOutput => {
	if (!("typ" in data.event) || data.event.typ !== "2") {
		throw new Error(
			'mapTrainEventToForm: expected train event with typ "2"'
		);
	}
	return data.event;
};

export const mapTrainEventToForm = (
	data: TTourEventBackendResponce
): TFlightEditSchema => {
	const event = assertTrainEvent(data);
	const hops = event.details?.hop ?? [];
	const route: TTrainRouteSegment[] =
		hops.length > 0
			? hops.map(mapTrainHopToSegment)
			: [createEmptyTrainSegment()];

	return buildPartialFlightEditForm({
		...mapEventMetaToForm(event),
		general: {
			description: event.description ?? "",
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
			route
		}
	});
};

export const mapTrainFormToUpdate = (
	frontend: Partial<TFlightEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend.general;
	const trainRoute = g?.route.filter(
		(segment): segment is TTrainRouteSegment =>
			segment.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN
	);

	const hop: TrainHopSchemaInput[] | undefined =
		trainRoute?.map(mapTrainSegmentToHop);

	const update: TrainEventUpdate = {
		typ: "2",
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
