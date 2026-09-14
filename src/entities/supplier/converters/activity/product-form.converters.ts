import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";

import {
	ENUM_ACTIVITY_SUB_TYPE,
	ENUM_FORM_ACTIVITY_PRODUCT as ENUM_FORM,
	type IActivityProduct,
	type TActivityProductDetailsBackend,
	type TActivityProductGeneralSchema,
	type TCreateActivityProductBackend,
	type TUpdateActivityProductBackend
} from "../../types";

import { activitySubTypeConverter } from "./activity-sub-type.converters";

export const mapActivityProductToGeneralForm = (
	product?: IActivityProduct | null
): TActivityProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? "",
	[ENUM_FORM.LOCATION]: mapBackendLocationToGeoForm(
		product?.location ?? null
	),
	[ENUM_FORM.SUB_TYP]: product?.subTyp ?? ENUM_ACTIVITY_SUB_TYPE.OTHER
});

const mapGeneralFormToDetails = (
	values: TActivityProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TActivityProductDetailsBackend => ({
	sub_typ: activitySubTypeConverter.to(values[ENUM_FORM.SUB_TYP])!,
	name: values[ENUM_FORM.NAME],
	location: mapGeoFormToBackendLocation(
		values[ENUM_FORM.LOCATION],
		languageCodeMapper.to(language) ?? LanguageCode.En
	)
});

export const mapActivityProductGeneralToCreate = (
	values: TActivityProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateActivityProductBackend => ({
	typ: "activity",
	details: mapGeneralFormToDetails(values, language)
});

export const mapActivityProductGeneralToUpdate = (
	values: TActivityProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateActivityProductBackend => ({
	typ: "activity",
	details: mapGeneralFormToDetails(values, language)
});
