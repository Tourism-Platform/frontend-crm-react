import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { TFileMetadata } from "@/shared/hooks";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	TOperatorDocumentBackend,
	TOperatorDocumentsBackendQuery,
	TOperatorDocumentsBackendResponse
} from "../types";

export const mapOperatorDocumentToFrontend = (
	backend: TOperatorDocumentBackend
): TFileMetadata => ({
	id: backend.id,
	url: backend.url,
	name: backend.file_name,
	size: 0,
	type: "application/octet-stream"
});

export const mapOperatorDocumentsToFrontend = (
	backend: TOperatorDocumentBackend[]
): TFileMetadata[] => backend.map(mapOperatorDocumentToFrontend);

export const mapOperatorDocumentsQueryToBackend = (
	filters: IPaginationRequest
): TOperatorDocumentsBackendQuery => ({
	...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
	...(filters.limit && { limit: filters.limit })
});

export const mapOperatorDocumentsPaginatedToFrontend = (
	response: TOperatorDocumentsBackendResponse
): IPaginationResponse<TFileMetadata> => ({
	data: response.map(mapOperatorDocumentToFrontend),
	total: TEMP_LIST_TOTAL
});
