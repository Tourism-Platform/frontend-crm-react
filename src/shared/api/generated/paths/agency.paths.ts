import type {
	AgencyFilesModel,
	AgencyInfoModel,
	AgencyInfoUpdate,
	AgencyModel,
	BodyAddAgencyDocumentsAgencyMeDocumentsPost,
	BodyAddAgencyLogoAgencyMeLogoPost,
	CreateAgencySchema
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const AGENCY_PATHS = {
	createAgency: {
		url: "/agency/create",
		method: "POST",
		_types: {} as {
			body: CreateAgencySchema;
			query: void;
			response: AgencyModel;
		}
	} as const,
	getAgencyInfo: {
		url: "/agency/me/info",
		method: "GET",
		_types: {} as { body: void; query: void; response: AgencyInfoModel }
	} as const,
	updateAgencyInfo: {
		url: "/agency/me/info",
		method: "PATCH",
		_types: {} as {
			body: AgencyInfoUpdate;
			query: void;
			response: AgencyInfoModel;
		}
	} as const,
	getAgencyLogo: {
		url: "/agency/me/logo",
		method: "GET",
		_types: {} as { body: void; query: void; response: void }
	} as const,
	addAgencyLogo: {
		url: "/agency/me/logo",
		method: "POST",
		_types: {} as {
			body: BodyAddAgencyLogoAgencyMeLogoPost;
			query: void;
			response: AgencyInfoModel;
		}
	} as const,
	deleteAgencyLogo: {
		url: "/agency/me/logo",
		method: "DELETE",
		_types: {} as { body: void; query: void; response: void }
	} as const,
	listAgencyDocuments: {
		url: "/agency/me/documents",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number };
			response: AgencyFilesModel[];
		}
	} as const,
	addAgencyDocuments: {
		url: "/agency/me/documents",
		method: "POST",
		_types: {} as {
			body: BodyAddAgencyDocumentsAgencyMeDocumentsPost;
			query: void;
			response: AgencyFilesModel[];
		}
	} as const,
	getAgencyDocumentUrl: (fileId: string) =>
		({
			url: `/agency/me/documents/${fileId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	removeAgencyDocument: (fileId: string) =>
		({
			url: `/agency/me/documents/${fileId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
