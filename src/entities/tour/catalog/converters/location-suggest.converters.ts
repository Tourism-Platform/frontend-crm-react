import { languageCodeMapper } from "@/shared/converters";

import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";

import { encodeLocationSuggestValue } from "../lib/location-suggest-value";
import type {
	TLocationSuggestionBackend,
	TSuggestLocationsQuery
} from "../types";
import {
	ENUM_LOCATION_SUGGEST_KIND,
	type TLocationSuggestOption,
	type TLocationSuggestParams,
	type TLocationSuggestion
} from "../types/location-suggest.types";

import { suggestKindMapper } from "./suggest-kind.converters";

export const mapLocationSuggestionToFrontend = (
	item: TLocationSuggestionBackend
): TLocationSuggestion => ({
	value: item.value,
	kind: suggestKindMapper.from(item.kind)!,
	label: item.value
});

export const mapLocationSuggestionsToOptions = (
	items: TLocationSuggestionBackend[]
): TLocationSuggestOption[] =>
	items.map((item) => {
		const suggestion = mapLocationSuggestionToFrontend(item);

		return {
			label: suggestion.label ?? suggestion.value,
			value: encodeLocationSuggestValue(
				suggestion.kind,
				suggestion.value
			),
			suggestion
		};
	});

export const mapLocationSuggestParamsToBackend = (
	params: TLocationSuggestParams
): TSuggestLocationsQuery => ({
	q: params.search.trim(),
	read_lang:
		languageCodeMapper.to(params.language) ??
		ENUM_LANGUAGES_BACKEND.ENGLISH,
	...(params.limit !== undefined && { limit: params.limit })
});

export const mapSearchQueryToLocationSuggest = (query: {
	city?: string;
	country?: string;
	place?: string;
}): TLocationSuggestion | null => {
	if (query.city) {
		return {
			value: query.city,
			kind: ENUM_LOCATION_SUGGEST_KIND.CITY,
			label: query.city
		};
	}

	if (query.country) {
		return {
			value: query.country,
			kind: ENUM_LOCATION_SUGGEST_KIND.COUNTRY,
			label: query.country
		};
	}

	if (query.place) {
		return {
			value: query.place,
			kind: ENUM_LOCATION_SUGGEST_KIND.PLACE,
			label: query.place
		};
	}

	return null;
};
