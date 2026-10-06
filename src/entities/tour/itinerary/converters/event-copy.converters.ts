import type { TTourEventCopyBackend, TTourEventCopySource } from "../types";

/** Body for `copyEvent` — `{ source }` discriminated by `kind`. */
export const mapEventCopyToBackend = (
	source: TTourEventCopySource
): TTourEventCopyBackend => {
	if (source.kind === "library") {
		return {
			source: {
				kind: "library",
				library_id: source.libraryId,
				day: source.day,
				position: source.position,
				...(source.isOptional !== undefined && {
					is_optional: source.isOptional
				})
			}
		};
	}

	return {
		source: {
			kind: "event",
			event_id: source.eventId,
			...(source.day != null && { day: source.day }),
			...(source.position != null && { position: source.position })
		}
	};
};
