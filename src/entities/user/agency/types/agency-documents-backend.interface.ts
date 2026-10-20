import type { AGENCY_PATHS, AgencyFilesModel } from "@/shared/api";

export type TAgencyDocumentBackend = AgencyFilesModel;

export type TAgencyDocumentsBackendQuery =
	typeof AGENCY_PATHS.listAgencyDocuments._types.query;

export type TAgencyDocumentsBackendResponse =
	typeof AGENCY_PATHS.listAgencyDocuments._types.response;
