import { GEO_PATHS } from "@/shared/api";
import type { GeoFeature, LanguageCode } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapGeoFeatureToFrontend,
	mapGeoFeaturesToOptions
} from "../converters";
import type { TGeoFormValue, TGeoOption, TGeoSearchParams } from "../types";

export type TReverseGeoParams = {
	lat: number;
	long: number;
	lang?: LanguageCode;
	limit?: number;
};

export const geoApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		searchGeo: builder.query<TGeoOption[], TGeoSearchParams>({
			query: (params) => ({
				...GEO_PATHS.search,
				params
			}),
			transformResponse: (response: GeoFeature[]) =>
				mapGeoFeaturesToOptions(response)
		}),
		reverseGeo: builder.query<TGeoFormValue | null, TReverseGeoParams>({
			query: (params) => ({
				...GEO_PATHS.reverse,
				params
			}),
			transformResponse: (response: GeoFeature[]) =>
				response[0] ? mapGeoFeatureToFrontend(response[0]) : null
		})
	})
});

export const { useSearchGeoQuery, useLazySearchGeoQuery, useReverseGeoQuery } =
	geoApi;
