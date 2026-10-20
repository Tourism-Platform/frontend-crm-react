import type {
	OPERATOR_DOCUMENTS_PATHS,
	OperatorFilesModel
} from "@/shared/api";

export type TOperatorDocumentBackend = OperatorFilesModel;

export type TOperatorDocumentsBackendQuery =
	typeof OPERATOR_DOCUMENTS_PATHS.listFiles._types.query;

export type TOperatorDocumentsBackendResponse =
	typeof OPERATOR_DOCUMENTS_PATHS.listFiles._types.response;
