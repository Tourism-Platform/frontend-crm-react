import type { TLocationSuggestion } from "../types/location-suggest.types";

const SUGGEST_VALUE_SEPARATOR = "::";

export const encodeLocationSuggestValue = (
	kind: TLocationSuggestion["kind"],
	value: string
): string => `${kind}${SUGGEST_VALUE_SEPARATOR}${value}`;
