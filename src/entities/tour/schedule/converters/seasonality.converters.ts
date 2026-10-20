import { format } from "date-fns";

import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import type {
	IListSeasonalityArgs,
	ISeasonality,
	TListSeasonalityBackendQuery,
	TListSeasonalityBackendResponse,
	TSeasonalityCommissionBackend,
	TSeasonalityCommissionCreateBackend
} from "../types";

export const mapSeasonalityToBackend = (
	frontend: ISeasonality
): TSeasonalityCommissionCreateBackend => ({
	commission: Number(frontend.commission),
	valid_from: format(frontend.from, "yyyy-MM-dd"),
	valid_until: format(frontend.to, "yyyy-MM-dd")
});

export const mapSeasonalityToFrontend = (
	backend: TSeasonalityCommissionBackend
): ISeasonality => ({
	id: backend.id,
	commission: backend.commission,
	from: new Date(backend.valid_from),
	to: new Date(backend.valid_until)
});

export const mapSeasonalityQueryToBackend = (
	args: IListSeasonalityArgs
): TListSeasonalityBackendQuery => ({
	...(args.page > 1 && { skip: (args.page - 1) * args.limit }),
	...(args.limit && { limit: args.limit })
});

export const mapSeasonalityPaginatedToFrontend = (
	response: TListSeasonalityBackendResponse
): IPaginationResponse<ISeasonality> => ({
	data: response.map(mapSeasonalityToFrontend),
	total: TEMP_LIST_TOTAL
});
