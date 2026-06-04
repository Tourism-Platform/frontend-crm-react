import { useCallback } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { TFormGeo } from "@/shared/types";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

import { useEnrichGeoFormLocation } from "./use-enrich-geo-form-location";
import { useGeoSearchOptions } from "./use-geo-search-options";

export type TGeoFieldProps = Pick<
	TFormGeo,
	"options" | "onQueryChange" | "isLoading"
>;

export const useGeoSearchFieldProps = (
	language: ENUM_LANGUAGES_TYPE = ENUM_LANGUAGES.EN
): TGeoFieldProps => {
	const geo = useGeoSearchOptions({ language });

	return {
		options: geo.options,
		onQueryChange: geo.setQuery,
		isLoading: geo.isLoading
	};
};

type TUseGeoFormFieldEnrichmentParams<T extends FieldValues> = {
	form?: UseFormReturn<T>;
	name: FieldPath<T>;
	language?: ENUM_LANGUAGES_TYPE;
};

export const useGeoFormFieldEnrichment = <T extends FieldValues>({
	form,
	name,
	language = ENUM_LANGUAGES.EN
}: TUseGeoFormFieldEnrichmentParams<T>): void => {
	const location = form?.watch(name) as TGeoFormValue | null | undefined;

	const handleLocationEnriched = useCallback(
		(enriched: TGeoFormValue) => {
			form?.setValue(name, enriched as never, { shouldDirty: false });
		},
		[form, name]
	);

	useEnrichGeoFormLocation({
		location,
		language,
		onEnriched: handleLocationEnriched
	});
};
