import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IGeoSelectOption } from "@/shared/types/geo-form.types";

export type TGeoSearchParams = {
	q: string;
	lang?: ENUM_LANGUAGES_TYPE;
	limit?: number;
};

export type TReverseGeoParams = {
	lat: number;
	long: number;
	lang?: ENUM_LANGUAGES_TYPE;
	limit?: number;
};

export type TGeoOption = IGeoSelectOption;

export type { TGeoFormValue } from "@/shared/types/geo-form.types";
