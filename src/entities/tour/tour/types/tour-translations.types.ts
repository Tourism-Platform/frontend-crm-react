import type { TRANSLATIONS_PATHS, TourRegenerateResponse } from "@/shared/api";

/** Paths codegen types this response as `void` — the real body is this. */
export type TRegenerateTranslationsBackendResponse = TourRegenerateResponse;

export type TRegenerateTranslationsQueryBackend = ReturnType<
	typeof TRANSLATIONS_PATHS.regenerateTourTranslations
>["_types"]["query"];

export interface IRegenerateTranslationsArgs {
	tourId: string;
	/** Re-translate already `ready` content too, not only stale/missing. */
	force?: boolean;
}

export interface IRegenerateTranslationsResult {
	scheduled: boolean;
	landing: boolean;
	eventsScheduled: number;
	eventsSkipped: number;
	targetLanguages: number;
}
