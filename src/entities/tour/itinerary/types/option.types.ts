import type { IPaginationRequest } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ENUM_LANGUAGES_TYPE } from "../../landing/types";

import type { IPackageFormMarkup } from "./package.types";

export interface IOption {
	id: string;
	tourMetaId: string | null;
	name: string;
	description: string;
	imageUrl: string;
	languages: ENUM_LANGUAGES_TYPE[];
	markup: IPackageFormMarkup | null;
	markupCurrency?: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface IListTourOptionsArgs extends IPaginationRequest {
	tourId: string;
}

export interface IOptionFormPayload {
	name: string;
	description: string;
	/** Только update: при создании бэкенд языки и наценку не принимает */
	languages?: ENUM_LANGUAGES_TYPE[];
	markup?: IPackageFormMarkup | null;
	markupCurrency?: ENUM_CURRENCY_OPTIONS_TYPE;
}
