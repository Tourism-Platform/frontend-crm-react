import { createMockIdSequence, mockImageUrl } from "@/shared/api";

import type {
	TAgencyBusinessInfoUpdateBackend,
	TAgencyDocumentBackend
} from "../types";

import { AGENCY_BUSINESS_DOCUMENTS_MOCK } from "./agency-business-documents.mock";
import { AGENCY_BUSINESS_MOCK } from "./agency-business.mock";

let info = structuredClone(AGENCY_BUSINESS_MOCK);
let documents: TAgencyDocumentBackend[] = structuredClone(
	AGENCY_BUSINESS_DOCUMENTS_MOCK
);

const fileIds = createMockIdSequence("e300", 1);
const agencyIds = createMockIdSequence("e310", 1);

export const createAgency = (name: string) => ({ id: agencyIds.next(), name });

export const getAgencyInfo = () => info;

export const updateAgencyInfo = (update: TAgencyBusinessInfoUpdateBackend) => {
	for (const [key, value] of Object.entries(update)) {
		if (value !== undefined) Object.assign(info, { [key]: value });
	}
	return info;
};

export const setAgencyLogo = (hasLogo: boolean) => {
	info.logo_path = hasLogo
		? mockImageUrl(`agency-logo-${Date.now()}`, 200, 200)
		: null;
	return info;
};

export const listAgencyDocuments = () => documents;

export const getAgencyDocument = (fileId: string) =>
	documents.find((file) => file.id === fileId);

export const addAgencyDocuments = (files: File[]) => {
	const created = files.map((file) => ({
		id: fileIds.next(),
		agency_id: info.agency_id,
		url: `https://files.mock/agency/${encodeURIComponent(file.name)}`,
		file_name: file.name
	}));
	documents.push(...created);
	return created;
};

export const removeAgencyDocument = (fileId: string) => {
	const before = documents.length;
	documents = documents.filter((file) => file.id !== fileId);
	return documents.length !== before;
};

export const resetAgencyStore = () => {
	info = structuredClone(AGENCY_BUSINESS_MOCK);
	documents = structuredClone(AGENCY_BUSINESS_DOCUMENTS_MOCK);
	fileIds.reset(1);
	agencyIds.reset(1);
};
