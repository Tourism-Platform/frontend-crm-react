import { useMemo, useState } from "react";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";
import { useDebounce } from "@/shared/hooks";

import { useSearchGeoQuery } from "../api";
import type { TGeoOption } from "../types";

const DEFAULT_MIN_QUERY_LENGTH = 2;
const DEFAULT_DEBOUNCE_MS = 400;
const DEFAULT_LIMIT = 10;

type TUseGeoSearchOptionsParams = {
	language?: ENUM_LANGUAGES_TYPE;
	limit?: number;
	minQueryLength?: number;
	debounceMs?: number;
};

type TUseGeoSearchOptionsResult = {
	options: TGeoOption[];
	isLoading: boolean;
	query: string;
	setQuery: (value: string) => void;
};

export const useGeoSearchOptions = (
	params: TUseGeoSearchOptionsParams = {}
): TUseGeoSearchOptionsResult => {
	const {
		language = ENUM_LANGUAGES.EN,
		limit = DEFAULT_LIMIT,
		minQueryLength = DEFAULT_MIN_QUERY_LENGTH,
		debounceMs = DEFAULT_DEBOUNCE_MS
	} = params;

	const lang = useMemo(
		() => languageCodeMapper.to(language) ?? LanguageCode.En,
		[language]
	);

	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, debounceMs);

	const trimmedQuery = debouncedQuery.trim();
	const shouldSkip = trimmedQuery.length < minQueryLength;

	const {
		data: options = [],
		isLoading,
		isFetching
	} = useSearchGeoQuery(
		{ q: trimmedQuery, lang, limit },
		{ skip: shouldSkip }
	);

	const isSearchLoading = useMemo(
		() => !shouldSkip && (isLoading || isFetching),
		[shouldSkip, isLoading, isFetching]
	);

	return {
		options: shouldSkip ? [] : options,
		isLoading: isSearchLoading,
		query,
		setQuery
	};
};
