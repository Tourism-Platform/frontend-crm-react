import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

import {
	ENUM_LANGUAGES_BACKEND,
	type ENUM_LANGUAGES_BACKEND_TYPE
} from "@/entities/tour/landing/types/languages.types";

import { emptyTrainHopFormRow } from "../../lib/hop-form-row";
import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	ENUM_FORM_TRAIN_HOP as ENUM_HOP,
	ENUM_TRAIN_PRICING,
	type ITrainHop,
	type ITrainProduct,
	type TCreateTrainProductBackend,
	type TTrainHopFormSchema,
	type TTrainLegInputBackend,
	type TTrainProductDetailsBackend,
	type TTrainProductGeneralSchema,
	type TUpdateTrainProductBackend
} from "../../types";

import { mapTrainVariantChargeToBackend } from "./product.converters";

const resolveLang = (
	language?: ENUM_LANGUAGES_TYPE
): ENUM_LANGUAGES_BACKEND_TYPE =>
	languageCodeMapper.to(language) ?? ENUM_LANGUAGES_BACKEND.ENGLISH;

const mapHopDomainToForm = (hop: ITrainHop): TTrainHopFormSchema => ({
	[ENUM_HOP.DEPARTURE_STATION]: mapBackendLocationToGeoForm(
		hop.departure?.location ?? null
	),
	[ENUM_HOP.ARRIVAL_STATION]: mapBackendLocationToGeoForm(
		hop.arrival?.location ?? null
	)
});

export const mapTrainProductToGeneralForm = (
	product?: ITrainProduct | null
): TTrainProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? "",
	[ENUM_FORM.HOPS]: product?.hops?.length
		? product.hops.map(mapHopDomainToForm)
		: [emptyTrainHopFormRow()]
});

const mapHopPointToBackend = (
	location: TGeoFormValue | null | undefined,
	lang: ENUM_LANGUAGES_BACKEND_TYPE
): TTrainLegInputBackend["departure"] => ({
	location: mapGeoFormToBackendLocation(location, lang)
});

const mapHopFormToBackend = (
	hop: TTrainHopFormSchema,
	lang: ENUM_LANGUAGES_BACKEND_TYPE
): TTrainLegInputBackend => ({
	departure: mapHopPointToBackend(hop[ENUM_HOP.DEPARTURE_STATION], lang),
	arrival: mapHopPointToBackend(hop[ENUM_HOP.ARRIVAL_STATION], lang)
});

const mapGeneralFormToDetails = (
	values: TTrainProductGeneralSchema,
	existing: ITrainProduct | null | undefined,
	language?: ENUM_LANGUAGES_TYPE
): TTrainProductDetailsBackend => {
	const lang = resolveLang(language);
	const base = {
		name: values[ENUM_FORM.NAME],
		legs: values[ENUM_FORM.HOPS].map((hop) =>
			mapHopFormToBackend(hop, lang)
		)
	};

	if (existing?.pricing === ENUM_TRAIN_PRICING.WHOLE) {
		if (!existing.charge) {
			throw new Error(
				"Cannot update a whole-priced train route without its charge"
			);
		}
		return {
			...base,
			pricing: ENUM_TRAIN_PRICING.WHOLE,
			charge: mapTrainVariantChargeToBackend(existing.charge)
		};
	}

	return { ...base, pricing: ENUM_TRAIN_PRICING.PER_FARE };
};

export const mapTrainProductGeneralToCreate = (
	values: TTrainProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateTrainProductBackend => ({
	typ: "train",
	details: mapGeneralFormToDetails(values, null, language)
});

export const mapTrainProductGeneralToUpdate = (
	values: TTrainProductGeneralSchema,
	existing: ITrainProduct | null | undefined,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateTrainProductBackend => ({
	typ: "train",
	details: mapGeneralFormToDetails(values, existing, language)
});
