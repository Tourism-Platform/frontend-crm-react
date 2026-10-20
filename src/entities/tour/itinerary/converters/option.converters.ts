import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import { languageMapper } from "../../landing/converters/languages.converters";
import type {
	IListTourOptionsArgs,
	IOption,
	IOptionFormPayload,
	TListAllTourOptionsBackendQuery,
	TListAllTourOptionsBackendResponce,
	TTourOptionBackend,
	TTourOptionCreateBackend,
	TTourOptionUpdateBackend
} from "../types";

export const mapOptionToFrontend = (backend: TTourOptionBackend): IOption => ({
	id: backend.id,
	tourMetaId: backend.tour_meta_id,
	name: backend.name ?? "",
	description: backend.description ?? "",
	imageUrl: backend.cover_image_path ?? "",
	languages: languageMapper.fromMany(backend.languages ?? [])
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
	...(data.languages && { languages: languageMapper.toMany(data.languages) })
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
