import type {
	IRegenerateTranslationsResult,
	TRegenerateTranslationsBackendResponse,
	TRegenerateTranslationsQueryBackend
} from "../types";

/** Always returns an object — no ternary in the RTK service layer. */
export const mapRegenerateTranslationsQueryToBackend = (
	force?: boolean
): TRegenerateTranslationsQueryBackend => {
	if (!force) {
		return {};
	}

	return { force: true };
};

export const mapRegenerateTranslationsToFrontend = (
	data: TRegenerateTranslationsBackendResponse
): IRegenerateTranslationsResult => ({
	scheduled: data.scheduled,
	landing: data.landing,
	eventsScheduled: data.events_scheduled,
	eventsSkipped: data.events_skipped,
	targetLanguages: data.target_languages
});
