import { useEffect, useRef } from "react";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";
import { encodeGeoOptionValue, hasGeoFormLabel } from "@/shared/utils";

import { useReverseGeoQuery } from "../api";

type TUseEnrichGeoFormLocationParams = {
	location: TGeoFormValue | null | undefined;
	onEnriched: (value: TGeoFormValue) => void;
	language?: ENUM_LANGUAGES_TYPE;
};

export const useEnrichGeoFormLocation = ({
	location,
	onEnriched,
	language = ENUM_LANGUAGES.EN
}: TUseEnrichGeoFormLocationParams): void => {
	const needsEnrich = Boolean(location && !hasGeoFormLabel(location));
	const onEnrichedRef = useRef(onEnriched);
	const appliedKeyRef = useRef<string | null>(null);

	onEnrichedRef.current = onEnriched;

	const locationKey = location
		? encodeGeoOptionValue(location.lat, location.long)
		: null;

	const { data: enrichedLocation } = useReverseGeoQuery(
		{
			lat: location?.lat ?? 0,
			long: location?.long ?? 0,
			lang: language,
			limit: 1
		},
		{ skip: !needsEnrich }
	);

	useEffect(() => {
		if (!locationKey) {
			appliedKeyRef.current = null;
		}
	}, [locationKey]);

	useEffect(() => {
		if (
			!needsEnrich ||
			!enrichedLocation ||
			!location ||
			!hasGeoFormLabel(enrichedLocation) ||
			appliedKeyRef.current === locationKey
		) {
			return;
		}

		if (
			enrichedLocation.lat !== location.lat ||
			enrichedLocation.long !== location.long
		) {
			return;
		}

		appliedKeyRef.current = locationKey;
		onEnrichedRef.current(enrichedLocation);
	}, [needsEnrich, enrichedLocation, location, locationKey]);
};
