import { ENUM_LANGUAGES } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";

import type {
	TGeoSearchParams,
	TGeoSearchQueryBackend,
	TReverseGeoParams,
	TReverseGeoQueryBackend
} from "../types";

export const mapGeoSearchParamsToBackend = (
	request: TGeoSearchParams
): TGeoSearchQueryBackend => ({
	q: request.q,
	lang: languageCodeMapper.to(request.lang ?? ENUM_LANGUAGES.EN),
	limit: request.limit
});

export const mapReverseGeoParamsToBackend = (
	request: TReverseGeoParams
): TReverseGeoQueryBackend => ({
	lat: request.lat,
	long: request.long,
	lang: languageCodeMapper.to(request.lang ?? ENUM_LANGUAGES.EN),
	limit: request.limit
});
