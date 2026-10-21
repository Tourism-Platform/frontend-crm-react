import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

/** Language is part of the cache key — each `read_lang` is its own entry. */
export interface IPreviewTourQueryArgs {
	tourId: string;
	language: ENUM_LANGUAGES_TYPE;
}

/** Валюта цен — тоже часть ключа кэша */
export interface IPreviewCurrencyQueryArgs {
	currency?: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface IPreviewOptionsListArgs
	extends IPaginationRequest,
		IPreviewCurrencyQueryArgs {
	tourId: string;
}

export interface IPreviewDraftOptionsQueryArgs
	extends IPreviewTourQueryArgs,
		IPreviewCurrencyQueryArgs {}

export interface IPreviewOptionQueryArgs
	extends IPreviewTourQueryArgs,
		IPreviewCurrencyQueryArgs {
	optionId: string;
}
