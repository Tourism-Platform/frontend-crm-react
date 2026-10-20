import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";

/** Language is part of the cache key — each `read_lang` is its own entry. */
export interface IPreviewTourQueryArgs {
	tourId: string;
	language: ENUM_LANGUAGES_TYPE;
}

export interface IPreviewOptionsListArgs extends IPaginationRequest {
	tourId: string;
}

export interface IPreviewOptionQueryArgs extends IPreviewTourQueryArgs {
	optionId: string;
}
