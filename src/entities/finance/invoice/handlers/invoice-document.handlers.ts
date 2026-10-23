import { HttpResponse } from "msw";

import {
	MOCK_DOCUMENT_BASE_URL,
	createMockId,
	createUrlMockHandler,
	mockValidationError
} from "@/shared/api";

import type { IGenerateInvoiceDocumentBackend } from "../types";

let documentIndex = 0;

/** Сервис генерации документов (VITE_DOCUMENT_API_URL) */
export const invoiceDocumentHandlers = [
	createUrlMockHandler<{ invoiceId?: string }>(
		MOCK_DOCUMENT_BASE_URL,
		{ url: "/api/documents/invoice", method: "POST" },
		({ body }) =>
			body.invoiceId
				? HttpResponse.json<IGenerateInvoiceDocumentBackend>({
						documentId: createMockId("f100", ++documentIndex)
					})
				: mockValidationError(["body", "invoiceId"], "Field required")
	)
];
