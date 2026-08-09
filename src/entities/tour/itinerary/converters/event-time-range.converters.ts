import type {
	ActivityDetailsSchemaOutput,
	BusHopSchemaOutput,
	EmptyDetails,
	FlightHopDetailsSchemaOutput,
	HousingDetailsSchemaOutput,
	TimeSchema,
	TrainHopSchemaOutput,
	TransferDetailsSchemaOutput
} from "@/shared/api";

import { ENUM_EVENT_BACKEND, type ENUM_EVENT_BACKEND_TYPE } from "../types";

const clock = (value?: TimeSchema | null): string =>
	value?.time ? value.time.slice(0, 5) : "";

const range = (start: string, end: string): string | undefined => {
	if (start && end) return `${start} – ${end}`;
	return start || end || undefined;
};

export const mapBackendEventToTimeSubtitle = (
	typ: ENUM_EVENT_BACKEND_TYPE | null | undefined,
	details: unknown
): string | undefined => {
	if (!typ || details == null || typeof details !== "object") {
		return undefined;
	}

	switch (typ) {
		case ENUM_EVENT_BACKEND.ACTIVITY: {
			const d = details as ActivityDetailsSchemaOutput;
			return range(clock(d.start_time), clock(d.end_time));
		}
		case ENUM_EVENT_BACKEND.REF: {
			const d = details as EmptyDetails;
			return range(clock(d.start_time), clock(d.end_time));
		}
		case ENUM_EVENT_BACKEND.HOUSING: {
			const d = details as HousingDetailsSchemaOutput;
			return range(clock(d.check_in), clock(d.check_out));
		}
		case ENUM_EVENT_BACKEND.TRANSFER: {
			const d = details as TransferDetailsSchemaOutput;
			return range(clock(d.departure?.time), clock(d.arrival?.time));
		}
		case ENUM_EVENT_BACKEND.FLIGHT: {
			const hops =
				(details as { hop?: FlightHopDetailsSchemaOutput[] | null })
					.hop ?? [];
			if (hops.length === 0) return undefined;
			return range(
				clock(hops[0].departure_time),
				clock(hops[hops.length - 1].arrival_time)
			);
		}
		case ENUM_EVENT_BACKEND.TRAIN:
		case ENUM_EVENT_BACKEND.BUS: {
			const hops =
				(
					details as {
						hop?: Array<
							TrainHopSchemaOutput | BusHopSchemaOutput
						> | null;
					}
				).hop ?? [];
			if (hops.length === 0) return undefined;
			return range(
				clock(hops[0].departure?.time),
				clock(hops[hops.length - 1].arrival?.time)
			);
		}
		default:
			return undefined;
	}
};
