import { mapGeoFormPartsToLabel } from "@/shared/converters/geo-location.converters";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

import type { TGeoFeatureBackend } from "../types";

export const mapGeoFeatureToFrontend = (
	feature: TGeoFeatureBackend
): TGeoFormValue => {
	const value = {
		lat: feature.lat,
		long: feature.long,
		name: feature.name ?? null,
		city: feature.city ?? null,
		street: feature.street ?? null,
		housenumber: feature.housenumber ?? null,
		postcode: feature.postcode ?? null,
		state: feature.state ?? null,
		country: feature.country ?? null,
		country_code: feature.country_code ?? null
	};

	return {
		...value,
		label: mapGeoFormPartsToLabel(value)
	};
};
