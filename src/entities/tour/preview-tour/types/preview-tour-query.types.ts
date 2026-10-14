import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

/** Language is part of the cache key — each `read_lang` is its own entry. */
export interface IPreviewTourQueryArgs {
	tourId: string;
	language: ENUM_LANGUAGES_TYPE;
}

export interface IPreviewOptionQueryArgs extends IPreviewTourQueryArgs {
	optionId: string;
}
