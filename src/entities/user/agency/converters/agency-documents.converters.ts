import type { TFileMetadata } from "@/shared/hooks";

import type { TAgencyDocumentBackend } from "../types";

const getFileNameFromUrl = (url: string): string => {
	try {
		const pathname = new URL(url).pathname;
		const segment = pathname.split("/").filter(Boolean).at(-1);
		return segment ? decodeURIComponent(segment) : "document";
	} catch {
		return "document";
	}
};

export const mapAgencyDocumentToFrontend = (
	backend: TAgencyDocumentBackend
): TFileMetadata => ({
	id: backend.id,
	url: backend.url,
	name: getFileNameFromUrl(backend.url),
	size: 0,
	type: "application/octet-stream"
});

export const mapAgencyDocumentsToFrontend = (
	backend: TAgencyDocumentBackend[]
): TFileMetadata[] => backend.map(mapAgencyDocumentToFrontend);
