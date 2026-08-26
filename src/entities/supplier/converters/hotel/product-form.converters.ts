import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";

import {
	ENUM_FORM_HOTEL_PRODUCT,
	type THotelProductGeneralSchema
} from "../../schema/hotel-product.schema";
import type {
	IHotelPolicy,
	IHotelProduct,
	TCreateHotelProductBackend,
	THotelProductDetailsBackend,
	TUpdateHotelProductBackend
} from "../../types";

import { hotelAmenityConverter } from "./amenity.converters";
import { mapHotelPolicyToBackend } from "./policy.converters";

const resolveLang = (language?: ENUM_LANGUAGES_TYPE): LanguageCode =>
	languageCodeMapper.to(language) ?? LanguageCode.En;

export const mapHotelProductToGeneralForm = (
	product?: IHotelProduct | null
): THotelProductGeneralSchema => ({
	[ENUM_FORM_HOTEL_PRODUCT.NAME]: product?.name ?? "",
	[ENUM_FORM_HOTEL_PRODUCT.LOCATION]: mapBackendLocationToGeoForm(
		product?.details?.location ?? null
	),
	[ENUM_FORM_HOTEL_PRODUCT.STARS]: product?.details?.stars ?? null,
	[ENUM_FORM_HOTEL_PRODUCT.AMENITIES]: product?.details?.amenities ?? [],
	[ENUM_FORM_HOTEL_PRODUCT.CHECK_IN_FROM]:
		product?.details?.policy?.checkInFrom ?? "",
	[ENUM_FORM_HOTEL_PRODUCT.CHECK_OUT_UNTIL]:
		product?.details?.policy?.checkOutUntil ?? ""
});

const buildPolicyFromForm = (
	values: THotelProductGeneralSchema,
	existingPolicy: IHotelPolicy | null | undefined
): IHotelPolicy => ({
	checkInFrom: values[ENUM_FORM_HOTEL_PRODUCT.CHECK_IN_FROM].trim() || null,
	checkOutUntil:
		values[ENUM_FORM_HOTEL_PRODUCT.CHECK_OUT_UNTIL].trim() || null,
	earlyCheckIn: existingPolicy?.earlyCheckIn ?? [],
	lateCheckOut: existingPolicy?.lateCheckOut ?? []
});

export const mapGeneralFormToDetailsBackend = (
	values: THotelProductGeneralSchema,
	existingPolicy: IHotelPolicy | null | undefined,
	lang: LanguageCode
): THotelProductDetailsBackend => ({
	typ: "hotel",
	location: mapGeoFormToBackendLocation(
		values[ENUM_FORM_HOTEL_PRODUCT.LOCATION],
		lang
	),
	stars: values[ENUM_FORM_HOTEL_PRODUCT.STARS] ?? null,
	amenities: hotelAmenityConverter.toMany(
		values[ENUM_FORM_HOTEL_PRODUCT.AMENITIES] ?? []
	),
	policy: mapHotelPolicyToBackend(buildPolicyFromForm(values, existingPolicy))
});

export const mapHotelProductGeneralToCreate = (
	values: THotelProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateHotelProductBackend => {
	const lang = resolveLang(language);

	return {
		typ: "hotel",
		name: values[ENUM_FORM_HOTEL_PRODUCT.NAME],
		details: mapGeneralFormToDetailsBackend(values, null, lang)
	};
};

export const mapHotelProductGeneralToUpdate = (
	values: THotelProductGeneralSchema,
	existingPolicy: IHotelPolicy | null | undefined,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateHotelProductBackend => {
	const lang = resolveLang(language);

	return {
		typ: "hotel",
		name: values[ENUM_FORM_HOTEL_PRODUCT.NAME],
		details: mapGeneralFormToDetailsBackend(values, existingPolicy, lang)
	};
};
