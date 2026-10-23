import { HttpResponse } from "msw";

import {
	OPERATOR_AGENCIES_PATHS,
	OPERATOR_DOCUMENTS_PATHS,
	OPERATOR_PATHS,
	createMockHandler,
	matchesQuery,
	mockFileResponse,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	readFormFiles,
	toListResponse
} from "@/shared/api";

import { OPERATOR_AGENCY_LIST_MOCK } from "../mock/operator-agencies.mock";
import {
	addOperatorDocuments,
	createOperator,
	deleteOperator,
	getAgencyInfoForOperator,
	getOperator,
	getOperatorDocument,
	getOperatorFinancials,
	getOperatorInfo,
	getPartneredAgency,
	inviteAgency,
	listOperatorDocuments,
	listPartneredAgencies,
	removeOperatorDocument,
	renameOperator,
	setAgencyDiscount,
	setOperatorLogo,
	updateOperatorFinancials,
	updateOperatorInfo
} from "../mock/operator.store";

const AGENCY_NOT_FOUND = "Agency not found";

export const operatorHandlers = [
	createMockHandler(OPERATOR_PATHS.createOperator, ({ body }) =>
		body.name?.trim()
			? HttpResponse.json(createOperator(body.name), { status: 201 })
			: mockValidationError(["body", "name"], "Field required")
	),

	createMockHandler(OPERATOR_PATHS.getOperatorInfo, () =>
		HttpResponse.json(getOperatorInfo())
	),

	createMockHandler(OPERATOR_PATHS.updateOperatorInfo, ({ body }) =>
		HttpResponse.json(updateOperatorInfo(body))
	),

	createMockHandler(OPERATOR_PATHS.getOperatorFinancials, () =>
		HttpResponse.json(getOperatorFinancials())
	),

	createMockHandler(OPERATOR_PATHS.updateOperatorFinancials, ({ body }) =>
		HttpResponse.json(updateOperatorFinancials(body))
	),

	createMockHandler(OPERATOR_PATHS.getLogo, () =>
		getOperatorInfo().logo_path
			? mockFileResponse("logo.png", "image/png")
			: mockNotFound("Logo not found")
	),

	createMockHandler(OPERATOR_PATHS.addLogo, () =>
		HttpResponse.json(setOperatorLogo(true))
	),

	createMockHandler(OPERATOR_PATHS.deleteLogo, () => {
		setOperatorLogo(false);
		return mockNoContent();
	}),

	// --- Документы ---

	createMockHandler(OPERATOR_DOCUMENTS_PATHS.listFiles, () =>
		HttpResponse.json(listOperatorDocuments())
	),

	createMockHandler(
		OPERATOR_DOCUMENTS_PATHS.addFiles,
		async ({ request }) => {
			const files = await readFormFiles(request);
			return files.length
				? HttpResponse.json(addOperatorDocuments(files), {
						status: 201
					})
				: mockValidationError(["body", "files"], "No file provided");
		}
	),

	createMockHandler(
		OPERATOR_DOCUMENTS_PATHS.getFileUrl(":fileId"),
		({ params }) => {
			const file = getOperatorDocument(String(params.fileId));
			return file
				? mockFileResponse(file.file_name)
				: mockNotFound("File not found");
		}
	),

	createMockHandler(
		OPERATOR_DOCUMENTS_PATHS.removeFile(":fileId"),
		({ params }) =>
			removeOperatorDocument(String(params.fileId))
				? mockNoContent()
				: mockNotFound("File not found")
	),

	// --- Агентства ---

	createMockHandler(OPERATOR_AGENCIES_PATHS.listAgencies, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				OPERATOR_AGENCY_LIST_MOCK.filter((agency) =>
					matchesQuery(
						query.get("q"),
						agency.name,
						agency.business_name
					)
				),
				query,
				20
			)
		)
	),

	createMockHandler(
		OPERATOR_AGENCIES_PATHS.listPartneredAgencies,
		({ query }) =>
			HttpResponse.json(
				toListResponse(
					listPartneredAgencies().filter((agency) =>
						matchesQuery(
							query.get("q"),
							agency.name,
							agency.business_name
						)
					),
					query,
					20
				)
			)
	),

	createMockHandler(OPERATOR_AGENCIES_PATHS.inviteAgency, ({ body }) =>
		body.email?.trim()
			? HttpResponse.json(inviteAgency(body), { status: 201 })
			: mockValidationError(["body", "email"], "Field required")
	),

	createMockHandler(
		OPERATOR_AGENCIES_PATHS.getAgencyInfoById(":agencyId"),
		({ params }) => {
			const agency = getAgencyInfoForOperator(String(params.agencyId));
			return agency
				? HttpResponse.json(agency)
				: mockNotFound(AGENCY_NOT_FOUND);
		}
	),

	createMockHandler(
		OPERATOR_AGENCIES_PATHS.setAgencyDiscount(":agencyId"),
		({ params, body }) => {
			if (!body.discount) {
				return mockValidationError(
					["body", "discount"],
					"Field required"
				);
			}
			const agency = setAgencyDiscount(
				String(params.agencyId),
				body.discount as never
			);
			return agency
				? HttpResponse.json(agency)
				: mockNotFound(AGENCY_NOT_FOUND);
		}
	),

	createMockHandler(
		OPERATOR_AGENCIES_PATHS.deleteAgencyDiscount(":agencyId"),
		({ params }) => {
			const agencyId = String(params.agencyId);
			if (!getPartneredAgency(agencyId))
				return mockNotFound(AGENCY_NOT_FOUND);
			setAgencyDiscount(agencyId, null);
			return mockNoContent();
		}
	)
];

/**
 * `/operator/:id` совпадает с `/operator/fx-rate`, `/operator/staff` и т.п.,
 * поэтому регистрируется после всех остальных хендлеров
 */
export const operatorByIdHandlers = [
	createMockHandler(OPERATOR_PATHS.getOperator(":id"), ({ params }) => {
		const operator = getOperator(String(params.id));
		return operator
			? HttpResponse.json(operator)
			: mockNotFound("Operator not found");
	}),

	createMockHandler(
		OPERATOR_PATHS.udpateOperator(":id"),
		({ params, body }) =>
			renameOperator(String(params.id), body.name)
				? mockNoContent()
				: mockNotFound("Operator not found")
	),

	createMockHandler(OPERATOR_PATHS.deleteOperator(":id"), ({ params }) =>
		deleteOperator(String(params.id))
			? mockNoContent()
			: mockNotFound("Operator not found")
	)
];
