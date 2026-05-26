import { HttpResponse, delay, http } from "msw";

import { AGENCY_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

import { AGENCY_BUSINESS_DOCUMENTS_MOCK } from "../mock";
import type { TAgencyDocumentBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

let documentsStore = [...AGENCY_BUSINESS_DOCUMENTS_MOCK];

export const agencyBusinessDocumentsHandlers = [
	http.get(`${BASE_URL}${AGENCY_PATHS.listAgencyDocuments.url}`, async () => {
		await delay(600);
		return HttpResponse.json(documentsStore, { status: 200 });
	}),

	http.post(
		`${BASE_URL}${AGENCY_PATHS.addAgencyDocuments.url}`,
		async ({ request }) => {
			await delay(1000);
			const formData = await request.formData();
			const files = formData
				.getAll("files")
				.filter((item): item is File => item instanceof File);

			if (files.length === 0) {
				return HttpResponse.json(
					{ message: "No file provided" },
					{ status: 400 }
				);
			}

			const uploadedDocuments: TAgencyDocumentBackend[] = files.map(
				(file) => ({
					id: crypto.randomUUID(),
					agency_id: agencyInfoStoreId(),
					url: URL.createObjectURL(file)
				})
			);

			documentsStore.push(...uploadedDocuments);
			return HttpResponse.json(uploadedDocuments, { status: 201 });
		}
	),

	http.delete(
		`${BASE_URL}/agency/me/documents/:fileId`,
		async ({ params }) => {
			await delay(500);
			const { fileId } = params;
			documentsStore = documentsStore.filter((doc) => doc.id !== fileId);
			return new HttpResponse(null, { status: 204 });
		}
	)
];

const agencyInfoStoreId = () =>
	documentsStore[0]?.agency_id ?? "00000000-0000-4000-8000-000000000002";
