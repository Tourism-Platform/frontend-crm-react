import { formatGeoFeatureLabel } from "@/shared/utils/geo-display.utils";
import { encodeGeoOptionValue } from "@/shared/utils/geo-option.utils";

import type { TGeoFeatureBackend, TGeoOption } from "../types";

import { mapGeoFeatureToFrontend } from "./geo.converters";

export const mapGeoFeatureToOption = (
	feature: TGeoFeatureBackend
): TGeoOption => ({
	label: formatGeoFeatureLabel(feature),
	value: encodeGeoOptionValue(feature.lat, feature.long),
	feature: {
		...mapGeoFeatureToFrontend(feature),
		label: formatGeoFeatureLabel(feature)
	}
});

export const mapGeoFeaturesToOptions = (
	features: TGeoFeatureBackend[]
): TGeoOption[] => features.map(mapGeoFeatureToOption);
