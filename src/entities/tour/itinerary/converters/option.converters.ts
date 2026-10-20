import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import { languageMapper } from "../../landing/converters/languages.converters";
import {
	ENUM_PACKAGE_MARKUP_TYP,
	type IListTourOptionsArgs,
	type IOption,
	type IOptionFormPayload,
	type IPackageFormMarkup,
	type TListAllTourOptionsBackendQuery,
	type TListAllTourOptionsBackendResponce,
	type TTourOptionBackend,
	type TTourOptionCreateBackend,
	type TTourOptionUpdateBackend
} from "../types";

const mapOptionMarkupFromBackend = (
	markup: TTourOptionBackend["markup"]
): IPackageFormMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_PACKAGE_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapOptionMarkupToBackend = (
	markup: IPackageFormMarkup | null | undefined,
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined
): TTourOptionUpdateBackend["markup"] => {
	if (!markup?.value) return null;
	if (markup.typ === ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	// Схема формы не пропускает фиксированную наценку без валюты
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: currencyConverter.to(currency!)!
		}
	};
};

export const mapOptionToFrontend = (backend: TTourOptionBackend): IOption => ({
	id: backend.id,
	tourMetaId: backend.tour_meta_id,
	name: backend.name ?? "",
	description: backend.description ?? "",
	imageUrl: backend.cover_image_path ?? "",
	languages: languageMapper.fromMany(backend.languages ?? []),
	markup: mapOptionMarkupFromBackend(backend.markup),
	markupCurrency:
		backend.markup?.typ === "fixed"
			? currencyConverter.from(backend.markup.cost.currency)
			: undefined
});

export const mapOptionCreateToBackend = (
	data: IOptionFormPayload
): TTourOptionCreateBackend => ({
	name: data.name,
	description: data.description || null
});

export const mapOptionUpdateToBackend = (
	data: IOptionFormPayload
): TTourOptionUpdateBackend => ({
	name: data.name,
	description: data.description || null,
	...(data.languages && { languages: languageMapper.toMany(data.languages) }),
	...(data.markup !== undefined && {
		markup: mapOptionMarkupToBackend(data.markup, data.markupCurrency)
	})
});

export const mapTourOptionsQueryToBackend = (
	args: IListTourOptionsArgs
): TListAllTourOptionsBackendQuery => ({
	...(args.page > 1 && { skip: (args.page - 1) * args.limit }),
	...(args.limit && { limit: args.limit })
});

export const mapTourOptionsPaginatedToFrontend = (
	response: TListAllTourOptionsBackendResponce
): IPaginationResponse<IOption> => ({
	data: response.map(mapOptionToFrontend),
	total: TEMP_LIST_TOTAL
});
