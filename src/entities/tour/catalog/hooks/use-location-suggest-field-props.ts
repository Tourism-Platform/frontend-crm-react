import { useCallback } from "react";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "@/shared/config";

import type { TLocationSuggestOption } from "../types";

import { useLocationSuggestOptions } from "./use-location-suggest-options";

export type TLocationSuggestFieldProps = {
	options: TLocationSuggestOption[];
	onQueryChange: (query: string) => void;
	isLoading: boolean;
};

export const useLocationSuggestFieldProps = (
	language: ENUM_LANGUAGES_TYPE = ENUM_LANGUAGES.EN
): TLocationSuggestFieldProps => {
	const suggest = useLocationSuggestOptions({ language });

	const onQueryChange = useCallback(
		(value: string) => {
			suggest.setQuery(value);
		},
		[suggest]
	);

	return {
		options: suggest.options,
		onQueryChange,
		isLoading: suggest.isLoading
	};
};
