import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

import {
	ENUM_FORM_TRAIN_PRODUCT as ENUM_FORM,
	ENUM_FORM_TRAIN_HOP as ENUM_HOP,
	type TTrainHopFormSchema,
	type TTrainProductGeneralSchema
} from "../../schema/train-product.schema";
import type {
	ITrainHop,
	ITrainProduct,
	TCreateTrainProductBackend,
	TTrainHopInputBackend,
	TUpdateTrainProductBackend
} from "../../types";

const resolveLang = (language?: ENUM_LANGUAGES_TYPE): LanguageCode =>
	languageCodeMapper.to(language) ?? LanguageCode.En;

export const emptyHopFormRow = (): TTrainHopFormSchema => ({
	[ENUM_HOP.DEPARTURE_TIME]: "",
	[ENUM_HOP.ARRIVAL_TIME]: "",
	[ENUM_HOP.DEPARTURE_LOCATION]: null,
	[ENUM_HOP.ARRIVAL_LOCATION]: null
});

const mapHopDomainToForm = (hop: ITrainHop): TTrainHopFormSchema => ({
	[ENUM_HOP.DEPARTURE_TIME]: hop.departure?.time ?? "",
	[ENUM_HOP.ARRIVAL_TIME]: hop.arrival?.time ?? "",
	[ENUM_HOP.DEPARTURE_LOCATION]: mapBackendLocationToGeoForm(
		hop.departure?.location ?? null
	),
	[ENUM_HOP.ARRIVAL_LOCATION]: mapBackendLocationToGeoForm(
		hop.arrival?.location ?? null
	)
});

export const mapTrainProductToGeneralForm = (
	product?: ITrainProduct | null
): TTrainProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? "",
	[ENUM_FORM.HOPS]: product?.hops?.length
		? product.hops.map(mapHopDomainToForm)
		: [emptyHopFormRow()]
});

const mapHopPointToBackend = (
	time: string,
	location: TGeoFormValue | null | undefined,
	lang: LanguageCode
): TTrainHopInputBackend["departure"] => ({
	time: time.trim() ? { time: time.trim() } : null,
	location: mapGeoFormToBackendLocation(location, lang)
});

const mapHopFormToBackend = (
	hop: TTrainHopFormSchema,
	lang: LanguageCode
): TTrainHopInputBackend => ({
	departure: mapHopPointToBackend(
		hop[ENUM_HOP.DEPARTURE_TIME],
		hop[ENUM_HOP.DEPARTURE_LOCATION],
		lang
	),
	arrival: mapHopPointToBackend(
		hop[ENUM_HOP.ARRIVAL_TIME],
		hop[ENUM_HOP.ARRIVAL_LOCATION],
		lang
	)
});

const mapGeneralFormToDetails = (
	values: TTrainProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateTrainProductBackend => {
	const lang = resolveLang(language);

	return {
		typ: "train",
		name: values[ENUM_FORM.NAME],
		details: {
			typ: "train",
			hop: values[ENUM_FORM.HOPS].map((hop) =>
				mapHopFormToBackend(hop, lang)
			)
		}
	};
};

export const mapTrainProductGeneralToCreate = (
	values: TTrainProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateTrainProductBackend => mapGeneralFormToDetails(values, language);

export const mapTrainProductGeneralToUpdate = (
	values: TTrainProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateTrainProductBackend => mapGeneralFormToDetails(values, language);
