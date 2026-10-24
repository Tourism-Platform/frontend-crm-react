import { GEO_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapGeoFeatureToFrontend,
	mapGeoFeaturesToOptions,
	mapGeoSearchParamsToBackend,
	mapReverseGeoParamsToBackend
} from "../converters";
import type {
	TGeoFeatureBackend,
	TGeoFormValue,
	TGeoOption,
	TGeoSearchParams,
	TReverseGeoParams
} from "../types";

export const geoApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		searchGeo: builder.query<TGeoOption[], TGeoSearchParams>({
			query: (params) => ({
				...GEO_PATHS.search,
				params: mapGeoSearchParamsToBackend(params)
			}),
			transformResponse: (response: TGeoFeatureBackend[]) =>
				mapGeoFeaturesToOptions(response)
		}),
		reverseGeo: builder.query<TGeoFormValue | null, TReverseGeoParams>({
			query: (params) => ({
				...GEO_PATHS.reverse,
				params: mapReverseGeoParamsToBackend(params)
			}),
			transformResponse: (response: TGeoFeatureBackend[]) =>
				response[0] ? mapGeoFeatureToFrontend(response[0]) : null
		})
	})
});

export const { useSearchGeoQuery, useLazySearchGeoQuery, useReverseGeoQuery } =
	geoApi;
