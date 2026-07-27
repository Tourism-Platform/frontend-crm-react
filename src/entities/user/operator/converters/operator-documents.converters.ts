import type { TFileMetadata } from "@/shared/hooks";

import type { TOperatorDocumentBackend } from "../types";

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
