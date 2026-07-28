import { parseLocalDateString } from "@/shared/lib";

import type {
	IPreviewTourSchedule,
	TPreviewTourScheduleBackend
} from "../types";

export const mapPreviewTourScheduleToFrontend = (
	backend: TPreviewTourScheduleBackend
): IPreviewTourSchedule => ({
	occurrences: (backend.occurrences ?? []).map((d) =>
		parseLocalDateString(d)
	),
	windowFrom: backend.window_from
		? parseLocalDateString(backend.window_from)
		: null,
	windowUntil: backend.window_until
		? parseLocalDateString(backend.window_until)
		: null
});
