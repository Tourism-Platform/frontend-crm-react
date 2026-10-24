import type { GeoFeature } from "@/shared/api";
import type { GEO_PATHS } from "@/shared/api/generated/paths/geo.paths";

export type TGeoFeatureBackend = GeoFeature;

export type TGeoSearchQueryBackend = typeof GEO_PATHS.search._types.query;

export type TReverseGeoQueryBackend = typeof GEO_PATHS.reverse._types.query;
