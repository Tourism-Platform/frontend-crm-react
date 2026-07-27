import type { TFileMetadata } from "@/shared/hooks";

import type { TAgencyDocumentBackend } from "../types";

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
