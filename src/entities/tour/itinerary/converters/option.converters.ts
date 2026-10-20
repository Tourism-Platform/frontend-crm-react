import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

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
	imageUrl: backend.cover_image_path ?? ""
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
	description: data.description || null
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
