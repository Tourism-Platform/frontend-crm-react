import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { TFileMetadata } from "@/shared/hooks";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	TAgencyDocumentBackend,
	TAgencyDocumentsBackendQuery,
	TAgencyDocumentsBackendResponse
} from "../types";

export const mapAgencyDocumentToFrontend = (
	backend: TAgencyDocumentBackend
): TFileMetadata => ({
	id: backend.id,
	url: backend.url,
	name: backend.file_name,
	size: 0,
	type: "application/octet-stream"
});

export const mapAgencyDocumentsToFrontend = (
	backend: TAgencyDocumentBackend[]
): TFileMetadata[] => backend.map(mapAgencyDocumentToFrontend);

export const mapAgencyDocumentsQueryToBackend = (
	filters: IPaginationRequest
): TAgencyDocumentsBackendQuery => ({
	...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
	...(filters.limit && { limit: filters.limit })
});

export const mapAgencyDocumentsPaginatedToFrontend = (
	response: TAgencyDocumentsBackendResponse
): IPaginationResponse<TFileMetadata> => ({
	data: response.map(mapAgencyDocumentToFrontend),
	total: TEMP_LIST_TOTAL
});
