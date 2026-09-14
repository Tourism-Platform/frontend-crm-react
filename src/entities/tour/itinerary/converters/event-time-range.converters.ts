import type {
	TMultiEventDetailBackend,
	TSingleEventReadBackend,
	TTimeSchemaBackend
} from "../types";

const clock = (value?: TTimeSchemaBackend | null): string =>
	value?.time ? value.time.slice(0, 5) : "";

const range = (start: string, end: string): string | undefined => {
	if (start && end) return `${start} – ${end}`;
	return start || end || undefined;
};

/**
 * Board-card time subtitle. Reads `details.plan` — the tour's own schedule
 * statement in contract 3.1 (never the spec/supply).
 */
export const mapBackendEventToTimeSubtitle = (
	event: TSingleEventReadBackend | TMultiEventDetailBackend
): string | undefined => {
	switch (event.typ) {
		case "activity":
		case "ref": {
			const plan = event.details.plan;
			return range(clock(plan.start_time), clock(plan.end_time));
		}
		case "housing": {
			const plan = event.details.plan;
			return range(clock(plan.check_in), clock(plan.check_out));
		}
		case "transfer": {
			const plan = event.details.plan;
			return range(
				clock(plan.departure?.time),
				clock(plan.arrival?.time)
			);
		}
		case "flight":
		case "train": {
			const plan = event.details.plan;
			return range(clock(plan.departure_time), clock(plan.arrival_time));
		}
		case "bus": {
			const legs = event.details.plan.legs ?? [];
			if (legs.length === 0) return undefined;
			return range(
				clock(legs[0].departure?.time),
				clock(legs[legs.length - 1].arrival?.time)
			);
		}
		default:
			return undefined;
	}
};
