import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";

import {
	ENUM_FORM_HOTEL_PRODUCT,
	ENUM_HOTEL_PRICING,
	type IHotelPolicy,
	type IHotelProduct,
	type TCreateHotelProductBackend,
	type THotelProductDetailsBackend,
	type THotelProductGeneralSchema,
	type TUpdateHotelProductBackend
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
	existing: IHotelProduct | null | undefined,
	lang: LanguageCode
): THotelProductDetailsBackend => {
	const base = {
		name: values[ENUM_FORM_HOTEL_PRODUCT.NAME],
		location: mapGeoFormToBackendLocation(
			values[ENUM_FORM_HOTEL_PRODUCT.LOCATION],
			lang
		),
		stars: values[ENUM_FORM_HOTEL_PRODUCT.STARS] ?? null,
		amenities: hotelAmenityConverter.toMany(
			values[ENUM_FORM_HOTEL_PRODUCT.AMENITIES] ?? []
		),
		policy: mapHotelPolicyToBackend(
			buildPolicyFromForm(values, existing?.details?.policy)
		)
	};

	if (existing?.pricing === ENUM_HOTEL_PRICING.WHOLE) {
		if (!existing.stayRate) {
			throw new Error(
				"Cannot update a whole-priced hotel without its stay rate"
			);
		}
		return {
			...base,
			pricing: ENUM_HOTEL_PRICING.WHOLE,
			price: existing.stayRate
		};
	}

	return { ...base, pricing: ENUM_HOTEL_PRICING.PER_ROOM };
};

export const mapHotelProductGeneralToCreate = (
	values: THotelProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateHotelProductBackend => {
	const lang = resolveLang(language);

	return {
		typ: "hotel",
		details: mapGeneralFormToDetailsBackend(values, null, lang)
	};
};

export const mapHotelProductGeneralToUpdate = (
	values: THotelProductGeneralSchema,
	existing: IHotelProduct | null | undefined,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateHotelProductBackend => {
	const lang = resolveLang(language);

	return {
		typ: "hotel",
		details: mapGeneralFormToDetailsBackend(values, existing, lang)
	};
};
