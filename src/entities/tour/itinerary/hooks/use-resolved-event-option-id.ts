import { useGetTourEventQuery } from "../api";
import { ENUM_EVENT_MODE } from "../types";

import { useEventEditIds } from "./use-event-edit-ids";

/**
 * Resolves the option ROW id for the current edit route:
 * - multi: the `eventOptionId` URL param (the alternative's `details[i].id`);
 * - single: `event.id` from the event read (the URL carries only the slot id).
 *
 * In single mode the edit page already loaded the same `getTourEvent` query,
 * so this subscription is a cache hit.
 */
export const useResolvedEventOptionId = (): string => {
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();

	const { data } = useGetTourEventQuery(
		{ tourId, optionId, eventId },
		{
			skip:
				mode !== ENUM_EVENT_MODE.SINGLE ||
				!tourId ||
				!optionId ||
				!eventId
		}
	);

	if (mode === ENUM_EVENT_MODE.MULTI) {
		return eventOptionId;
	}

	return data?.eventOptionId ?? "";
};
