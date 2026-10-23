import { HttpResponse } from "msw";

import {
	AGENCY_PATHS,
	createMockHandler,
	mockFileResponse,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	readFormFiles
} from "@/shared/api";

import {
	addAgencyDocuments,
	createAgency,
	getAgencyDocument,
	getAgencyInfo,
	listAgencyDocuments,
	removeAgencyDocument,
	setAgencyLogo,
	updateAgencyInfo
} from "../mock/agency.store";

export const agencyHandlers = [
	createMockHandler(AGENCY_PATHS.createAgency, ({ body }) =>
		body.name?.trim()
			? HttpResponse.json(createAgency(body.name), { status: 201 })
			: mockValidationError(["body", "name"], "Field required")
	),

	createMockHandler(AGENCY_PATHS.getAgencyInfo, () =>
		HttpResponse.json(getAgencyInfo())
	),

	createMockHandler(AGENCY_PATHS.updateAgencyInfo, ({ body }) =>
		HttpResponse.json(updateAgencyInfo(body))
	),

	createMockHandler(AGENCY_PATHS.getAgencyLogo, () =>
		getAgencyInfo().logo_path
			? mockFileResponse("logo.png", "image/png")
			: mockNotFound("Logo not found")
	),

	createMockHandler(AGENCY_PATHS.addAgencyLogo, () =>
		HttpResponse.json(setAgencyLogo(true))
	),

	createMockHandler(AGENCY_PATHS.deleteAgencyLogo, () => {
		setAgencyLogo(false);
		return mockNoContent();
	}),

	createMockHandler(AGENCY_PATHS.listAgencyDocuments, () =>
		HttpResponse.json(listAgencyDocuments())
	),

	createMockHandler(AGENCY_PATHS.addAgencyDocuments, async ({ request }) => {
		const files = await readFormFiles(request);
		return files.length
			? HttpResponse.json(addAgencyDocuments(files), { status: 201 })
			: mockValidationError(["body", "files"], "No file provided");
	}),

	createMockHandler(
		AGENCY_PATHS.getAgencyDocumentUrl(":fileId"),
		({ params }) => {
			const file = getAgencyDocument(String(params.fileId));
			return file
				? mockFileResponse(file.file_name)
				: mockNotFound("File not found");
		}
	),

	createMockHandler(
		AGENCY_PATHS.removeAgencyDocument(":fileId"),
		({ params }) =>
			removeAgencyDocument(String(params.fileId))
				? mockNoContent()
				: mockNotFound("File not found")
	)
];
